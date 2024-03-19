import { useState } from "react"

import styles from "../styles/Header.module.css"
import Modal from "./Modal"
import { app  } from "../../services/firebaseConfig"
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import { Navigate } from "react-router-dom"


function Header() {
  const auth = getAuth(app)
  const user = auth.currentUser;
  const [openModal, setOpenModal] = useState(false)
  const [navigate, setnavigate] = useState(false)

  function theresUser(){
        if(user){
          return true
        }else{
          return false
        }
    }

    
  console.log("a funçao header detecta ususarios?:"+theresUser())


  function Deslogar(){
    let p = confirm("deseja realmente deslogar?")
    if(p){
        signOut(auth).then(()=>{
            console.warn("usuario deslogado")
            setnavigate(true)
        }).catch(err =>{
            console.warn(err)
        })
    }else{
      console.warn("refused to logout")
    }

  }


  return (
    <>

      <header className={styles.header}>
        <a href="/"><h1><span className={styles.spanLogo}>Control</span>Finance</h1></a>
        
        <div className={styles.headerBBOX}>     {theresUser() ? <button onClick={()=>{Deslogar()}}>Deslogar</button> : <></>}

                  {theresUser() ? <button onClick={() => {setOpenModal(true)}}>Registrar novo valor</button> 
                                : <button onClick={() => {alert("por favor faça login primeiro");setnavigate(true)}}>Registrar novo valor</button> 
                  }
        </div>


      </header>

      <Modal open={openModal} closeModal={() => {setOpenModal(!openModal)}} />


      {navigate ? <Navigate to="/login"/> : <></>}

    </>
  )

}

export default Header