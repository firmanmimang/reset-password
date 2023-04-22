import React, { useCallback } from 'react'
import Eye from '../assets/icons/Eye'
import EyeSlash from '../assets/icons/EyeSlash'

export default function TextInput({name, placeholder, onChange, onBlur, value, type, showPassword, setShowPassword, error, helperText} : {name: string, placeholder: string, onChange: any, onBlur: any, value: string, type: any, showPassword: boolean, setShowPassword: any, error: boolean, helperText: any} ) {
  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState: any) => !prevState)
  }, [setShowPassword])

  return (
    <div className="relative mb-2">
      <input 
        name={name}
        spellCheck="false"
        placeholder={placeholder}
        onChange={onChange} 
        onBlur={onBlur}
        value={value}
        type={type} 
        className="input"
      />
      <div className="icon-input">
        {!showPassword ?
          <Eye action={handleShowPassword} />
          :
          <EyeSlash action={handleShowPassword} />
        }
      </div>
      {error && <span className="error-input">{helperText}</span>}
    </div>
  )
}
