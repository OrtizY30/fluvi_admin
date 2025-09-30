'use client'

import { useState } from 'react'
import ValidateTokenForm from './ValidateTokenForm'
import ResetPasswordForm from './ResetPasswordForm'

export default function PasswordRestHandler() {
  const [token, setToken] = useState("");
    const [isValidToken, setIsValidToken] = useState(false)
  return (
   
    <>
    {!isValidToken ? 
    <ValidateTokenForm
    token={token}
    setToken={setToken}
    setIsValidToken={setIsValidToken}
    /> 
    :
     <ResetPasswordForm
     token={token}
     />}
    </>
  )
}