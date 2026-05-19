import { useState } from "react";
import getPasswordStrength from "./getPasswordStrength.js"

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState(``)
  const label = getPasswordStrength(password)

  return (
    <>
    <label htmlFor="password">contraseña</label>
    <input 
    id = "password"
    type = "password" 
    value = {password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Type your password :)"
    />
    <p>{label}</p>
    </>
  )
}