// Signup.tsx
import { useState } from "react"
import { Formik } from "formik"
import * as Yup from 'yup';
import Loading from "./assets/icons/Loading"
import TextInput from "./components/TextInput"

const strengthLabels = ["poor", "good", "strong"]
const lengthPassword = 6

// schema validation
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password is required')
    .min(lengthPassword, `Password must be at least ${lengthPassword} characters long`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Not match')
    .required('Password confirmation is required'),
})
// initial value formik
interface FormValues {
  newPassword: string;
  confirmPassword: string;
}
const initialValues: FormValues = {
  newPassword: "",
  confirmPassword: "",
}

const ResetPassword = () => {
  // for password's strength value
  const [strength, setStrength] = useState("")
  // for hide and show password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // for loading state button submit
  const [loading, setLoading] = useState(false)
  
  const getStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password),
        hasLowerCase = /[a-z]/.test(password),
        hasNumber = /[0-9]/.test(password),
        hasSymbol = /[^A-Za-z0-9]/.test(password),
        isLongEnough = password.length >= lengthPassword;

    const strengthIndicator = [hasUpperCase, hasLowerCase, hasNumber, hasSymbol, isLongEnough].filter(Boolean).length

    if (strengthIndicator < 3) {
        return setStrength(strengthLabels[0])
    } else if (strengthIndicator < 5) {
        return setStrength(strengthLabels[1])
    } else {
        return setStrength(strengthLabels[2])
    }
  }

  const handleFormSubmit = (values: FormValues, onSubmitProps: any) => {
    setLoading(true)
    alert(`send put/patch request to server with payload => ${JSON.stringify(values)}`)
    onSubmitProps.resetForm()
    setStrength("")
    setLoading(false)
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="w-96 p-4 rounded-lg bg-white shadow-md">
        <h1 className="text-center font-bold mb-3">Reset Password</h1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* new password */}
              <TextInput
                name="newPassword"
                placeholder="New Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange(e); getStrength(e.target.value);}}  
                onBlur={handleBlur}
                value={values.newPassword}
                type={showPassword ? 'text' : 'password'}
                showPassword={showPassword}
                setShowPassword={() => setShowPassword(!showPassword)}
                error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              {/* password confirmation */}
              <TextInput
                name="confirmPassword"
                placeholder="Password Confirmation" 
                onChange={handleChange} 
                onBlur={handleBlur}
                value={values.confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'} 
                showPassword={showConfirmPassword}
                setShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              {/* bar strength password */}
              <div className={`bars ${strength}`}>
                <div></div>
              </div>
              {/* hint */}
              <div className="mb-3">
                {strength && <p className="text-sm capitalize font-semibold">{strength} password</p>}
                <p className="text-sm">
                  Hint: The password should be at least {lengthPassword} characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! i" ? $ % &
                </p>
              </div>
              <button type="submit" disabled={isSubmitting} className={`py-2 px-3 w-full bg-gray-700 hover:bg-gray-800 rounded-md text-white transition duration-300`}>
                {!loading ? 'Submit' : <Loading className="h-6" />}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword