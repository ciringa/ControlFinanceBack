
import Input from "../form/Input"
import Label from "../form/Label"
import LinkButton from "../form/LinkButton"
import PasswordToggle from "../form/PasswordToggle"

import styles from "../styles/Form.module.css"
import inputStyles from "../styles/Input.module.css"
import { BsFillEyeFill } from "react-icons/bs" //View
import { BsFillEyeSlashFill } from "react-icons/bs" //Hide
import { Navigate } from "react-router-dom"

//inporting firebase dependencies 
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth"
import { app  as client } from "../../services/firebaseConfig"
import { useState } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SingUp() {
  //acces to api
  const auth = getAuth(client);
  const [theresuser, settheresuser] = useState(false)

  //demodularization
  const [showPassword, setShowPassword] = useState(false)

  //values
  const [email, setemail] = useState('')
  const [key, setkey] = useState('')
  const [name, setname] = useState('')
  
  //functions toasts
  
  function notify() {
    toast.success("Login efetuado com sucesso!", {
      autoClose: 3000
    })
  }

  function erro() {
    toast.error("Algo deu errado!", {
      autoClose: 3000
    })
  }

  function warning(){
    toast.warn("O que vc quiser...", {
      autoClose: 3000
    })
  }
  
  
  function login(e){
      e.preventDefault()
      const data = {
        Dname :name,
        Demail:email,
        Dkey:key
      }
      console.log(data.Demail+" "+data.Dkey)
      createUserWithEmailAndPassword(auth, data.Demail, data.Dkey).then((userCredential)=>
      {
        console.log("welcome home")
        console.log(userCredential)

      }).catch(err =>{
        console.warn(err)
        erro()
      })

  }

  onAuthStateChanged(auth, (p)=>{
    if(p){
      settheresuser(true)
    }else{
      settheresuser(false)
    }
  })


  return (
    <>
      {theresuser 
    
    ? 
      <>
        <Navigate to="/" />
      </>
    
    :
      <div className={styles.container} >
        <div className={styles.topSingUp}>
          <h1><span className={styles.spanLogo}>Control</span> Finance</h1>
          <LinkButton to="/login" text="Voltar"/>
        </div>
        <form className={styles.form} onSubmit={login}>
        <ToastContainer />
            <div className={styles.top}>
              <h1>Criar Conta</h1>
            </div>
            <div className={styles.inputArea}>
              <Label input="nameInput" text="Nome"/>
              <input type="text" id="nameInput" placeholder="digite seu nome"
                value={name} onChange={(e) =>setname(e.target.value)}
              />
            </div>
            <div className={styles.inputArea}>
              <Label input="emailInput" text="Email" />
              <input id="emailInput" placeholder="digite seu email"
              value={email}
              type="email"
              onChange={(e) => {setemail(e.target.value)}}
              ></input>
            </div>
            <div className={styles.inputArea}>
              <Label input="passwordInput" text="Senha"/>
              <div className={inputStyles.inputContainer}>
                <input 
                id="passwordInput"
                placeholder="insira sua senha"
                type={showPassword ? "text" : "password" } 
                value={key}
                onChange={(e)=>{setkey(e.target.value)}}
                />
                <span onClick={(e)=>{setShowPassword(!showPassword)}}>{showPassword ?  <BsFillEyeFill />  : <BsFillEyeSlashFill  /> }</span>
              </div>
            </div>
            <div className={styles.inputArea}>
              <Label input="submitInputConfirm" text="Confirmar senha"/>
              <div className={inputStyles.inputContainer}>
                <input 
                id="submitInputConfirm"
                placeholder="insira sua senha"
                type={showPassword ? "text" : "password" } 
                />
                <span onClick={(e)=>{setShowPassword(!showPassword)}}>{showPassword ?  <BsFillEyeFill />  : <BsFillEyeSlashFill  /> }</span>
              </div>
            </div>
            <input type="submit" placeholder="Entrar" />
            

        </form>



      </div>
    }
    </>
  )
}

export default SingUp