import { useState } from 'react'

import { BsFillEyeFill } from "react-icons/bs" //View
import { BsFillEyeSlashFill } from "react-icons/bs" //Hide

import styles from "../styles/Input.module.css"

// eslint-disable-next-line react/prop-types
function PasswordToggle({id}) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(<BsFillEyeFill />)

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.inputContainer}>
      <input
        type={showPassword ? 'password' : 'text'}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Digite sua senha"
        id={id}
      />
      <span onClick={togglePasswordVisibility}>{showPassword ?  <BsFillEyeFill />  : <BsFillEyeSlashFill  /> }</span>
    </div>
  )
}

export default PasswordToggle