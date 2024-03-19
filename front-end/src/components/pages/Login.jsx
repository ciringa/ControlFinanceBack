// import ButtonToggle from "../form/ButtonToggle"
import Input from "../form/Input"
import Label from "../form/Label"
import LinkButton from "../form/LinkButton"
import PasswordToggle from "../form/PasswordToggle"


import { BsFillEyeFill } from "react-icons/bs" 
import { BsFillEyeSlashFill } from "react-icons/bs"
import inputStyles from "../styles/Input.module.css"
import styles from "../styles/Form.module.css"


import { useState } from "react"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../../services/firebaseConfig"
import { Navigate } from "react-router-dom"

const auth = getAuth(app)

function Login() {

      //demodularization
      const [showPassword, setShowPassword] = useState(false)

      const [password, setPassword] = useState("")
      const [email,setEmail] = useState("")

      const [logged,setLogged] = useState(false)
      function login(e){
        e.preventDefault()
        const data = {
          Demail:email,
          Dkey:password
        }
        
        console.log(data)  
        signInWithEmailAndPassword(auth,data.Demail,data.Dkey).then((g)=>{
          if(g){
            const currentUser = g
            console.log("loged in as "+ currentUser.uid)
            setLogged(true)
          }else{
            console.log("failed to load")
          }
        }).catch(err=>{
          console.warn(err)
        })
      }


  return (
    <>{logged ? 
    <>
      <Navigate to="/"/>
    </>:
      <div className={styles.container}>
        <div>
            <h1><span className={styles.spanLogo}>Control</span> Finance</h1>
          </div>
        <form className={styles.form} onSubmit={login}>
        
          
            <h1>Login</h1>
            <div className={styles.inputArea}>
              <Label input="emailInput" text="Email" />
              <input type="text"  id="emailInput" placeholder="Insira seu Email"

              value={email}
              onChange={(e) =>{setEmail(e.target.value)}}

              />
            </div>
            <div className={styles.inputArea}>
              <Label input="emailInput" text="Senha" />
              <div className={inputStyles.inputContainer}>
                  <input 
                  id="submitInputConfirm"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  type={showPassword ? "text" : "password" } 
                  />
                  <span onClick={(e)=>{setShowPassword(!showPassword)}}>{showPassword ?  <BsFillEyeFill />  : <BsFillEyeSlashFill  /> }</span>
                </div>
            </div>
            <div className={styles.inputArea}>
              <Input type="submit" value="Entrar"/>
            </div>
            <div className={styles.redirectArea}>
              <p>Ainda não possui uma conta?</p>
              <LinkButton to="/singUp" text="Cadraste-se"/>
            </div>
        </form>
      </div>
    }
    </>
  )
}

export default Login