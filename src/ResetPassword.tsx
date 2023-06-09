// Signup.tsx
import { useState } from "react"
import { Formik } from "formik"
import Loading from "./assets/icons/Loading"
import TextInput from "./components/TextInput"
import { PasswordType, usePassword } from "./hooks/usePassword"

const lengthPassword = 8

const ResetPassword = () => {
  //  custom hook for password strength and its validation and initialvalues for formik
  const{validationSchema, initialValues, determineStrength, strength, resetStrength } = usePassword(lengthPassword, 'newPassword', 'confirmPassword')
  // for hide and show password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleFormSubmit = (values: PasswordType, onSubmitProps: any) => {
    alert(`send put/patch request to server with payload => ${JSON.stringify(values)}`)
    onSubmitProps.resetForm()
    resetStrength()
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleChange(e); determineStrength(e.target.value);}}  
                onBlur={handleBlur}
                value={values.newPassword}
                type={!!showPassword ? 'text' : 'password'}
                showPassword={!!showPassword}
                setShowPassword={() => setShowPassword(!showPassword)}
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
              />
              {/* password confirmation */}
              <TextInput
                name="confirmPassword"
                placeholder="Password Confirmation" 
                onChange={handleChange} 
                onBlur={handleBlur}
                value={values.confirmPassword}
                type={!!showConfirmPassword ? 'text' : 'password'} 
                showPassword={!!showConfirmPassword}
                setShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                error={!!touched.confirmPassword && !!errors.confirmPassword}
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
              {/* button submit */}
              <button type="submit" disabled={isSubmitting} className={`py-2 px-3 w-full bg-gray-700 hover:bg-gray-800 rounded-md text-white transition duration-300`}>
                {!isSubmitting ? 'Submit' : <Loading className="h-6" />}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword