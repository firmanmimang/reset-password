import React, { useCallback } from 'react'
import Eye from '../assets/icons/Eye'
import EyeSlash from '../assets/icons/EyeSlash'

export default function TextInput({name, placeholder, value, onChange, onBlur, type='text', showPassword=null, setShowPassword=null, error=null, helperText=null} : {name: string, placeholder: string, onChange?: any, onBlur?: any, value: string, type?: string, showPassword?: any, setShowPassword?: any, error?: any, helperText?: any} ) {
  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState: boolean) => !prevState)
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
      {
        showPassword !== null &&
          <div className="icon-input">
            {!showPassword ?
              <Eye action={handleShowPassword} />
              :
              <EyeSlash action={handleShowPassword} />
            }
          </div>
      }
      {error ? 
        <span className="error-input">{helperText}</span>
        :
        <span className="text-sm pl-1">{helperText}</span>
      }
    </div>
  )
}
