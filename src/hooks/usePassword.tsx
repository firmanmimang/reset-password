import { useState } from 'react'
import * as Yup from 'yup';

export interface PasswordType {
  [key: string]: string
}

export function usePassword(length: number, refPassword: string, refConfirmPassword? : any ) {
  const strengthLabels = ["poor", "good", "strong"]
  const lengthPassword = length

  // for password's strength value
  const [strength, setStrength] = useState("")

  // schema validation
  const validationSchema = Yup.object().shape({
    [refPassword]: Yup.string()
      .required('Password is required')
      .min(lengthPassword, `Password must be at least ${lengthPassword} characters long`),
    hasConfirm: Yup.boolean().default(!!refConfirmPassword),
    [refConfirmPassword]: Yup.string().when('hasConfirm', (hasConfirm) => {
      if (hasConfirm[0]) {
        return Yup.string().oneOf([Yup.ref(refPassword)], 'Not match').required('Password confirmation is required');
      }
      else {
        return Yup.string().nullable()
      }
    })
  })
  
  const initialValues: PasswordType = {
    [refPassword]: "",
    ...(!!refConfirmPassword && {[refConfirmPassword]: ""}),
  }

  const determineStrength = (password: string) => {
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

  const resetStrength = () => setStrength("")

  return {
    validationSchema,
    initialValues,
    strength,
    resetStrength,
    determineStrength,
  }
}
