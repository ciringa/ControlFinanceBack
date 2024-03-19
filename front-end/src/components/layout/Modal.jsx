import { TfiClose } from "react-icons/tfi"
import styles from "../styles/Modal.module.css"
import { useState, useRef, useEffect } from "react"

import Label from "../form/Label"


import { app } from "../../services/firebaseConfig"
import { getAuth } from "firebase/auth"
import { collection, addDoc, getFirestore } from "firebase/firestore"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line react/prop-types
function Modal({open, closeModal}) {
  const auth = getAuth(app)
  const db = getFirestore(app)

  function notify() {
    toast.success("Transação efetuada com sucesso!", {
      autoClose: 3000,
      position: "bottom-center"
    })
  }

  function erroOption() {
    toast.warn("Selecione uma opção.", {
      autoClose: 3000,
      position: "bottom-center"
    })
  }
  
  function erroInput() {
    toast.warn("Digite o valor da entrada/saída.", {
      autoClose: 5000,
      position: "bottom-center"
    })
  }

  function warning(){
    toast.error("Preencha o campo e selecione uma opção.", {
      autoClose: 3000,
      position: "bottom-center"
    })
  }

  const [listDeposit, setListDeposit] = useState([])
  const [listOutFlow, setListOutFlow] = useState([])
  const [selectedOption, setSelectedOption] = useState('')
  // const [valueInput, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    console.log("listDeposit atualizada:", listDeposit)
  }, [listDeposit])

  useEffect(() => {
    console.log("listOutflow atualizada:", listOutFlow)
  }, [listOutFlow])

  useEffect(() => {
    // Salva as listas no localStorage sempre que forem atualizadas
    localStorage.setItem('listDeposit', JSON.stringify(listDeposit))
    localStorage.setItem('listOutFlow', JSON.stringify(listOutFlow))
    console.log(listOutFlow)
    console.log(listDeposit)
  }, [listDeposit, listOutFlow])

  function handleOptionClick(option) {
    // Atualiza o estado com a opção selecionada
    setSelectedOption(option)
  }

    function handleValue() {

      if (inputRef.current.value === "" && selectedOption === "") {
        warning()
        return
      }

      if (inputRef.current.value === "") {
        // alert("Digite o valor da entrada/saída.")
        erroInput()
        return
      } 
  
      if (selectedOption === "") {
        // alert("Selecione uma opção.")
        erroOption()
        return
      }
  
      const object = {
        value: inputRef.current.value,
        type: selectedOption,
      }

      notify()

      console.log(object)//object recebe o objeto que carrega os valores
      const data ={
        type:object.type,
        value:parseFloat(object.value),
        user:{
          uid: auth.currentUser.uid,
          name:"createdByCode"
        }

      

      }
      const myCollection = collection(db,"Transactions")
      const transactionAdd = addDoc(myCollection,data)
      console.warn(data)
      console.warn(transactionAdd)

      if (object.type === "Entrada") {
        console.log("entrada")
        setListDeposit(prevList => [...prevList, object])
      } else {
        console.log("Saída")
        setListOutFlow(prevList => [...prevList, object])
      }
  }
  

 if (open) {
  return (
    <div className={styles.backgroundStyle}>
      <ToastContainer />
      <div className={styles.modal}>
        
        <div className={styles.topModal}>
          <h2>Registro de valor</h2>
          <span onClick={closeModal}><TfiClose /></span>
        </div>
        <div>
          <p>Digite o valor e em seguida aperte no botão referente ao tipo do valor </p>
        </div>
        <div className={styles.inputArea}>
          <Label input="valor" text="Valor"/>
          <input id="valor" type="number" ref={inputRef} placeholder="R$ 00,00"/>
        </div>
        <div className={styles.optionsArea}>
          <h2>Tipo de valor</h2>
          <div>
            <option className={`${selectedOption === "Entrada" ? styles.selected : ""}`} onClick={() => handleOptionClick("Entrada")}>Entrada</option>
            <option className={`${selectedOption === "Saida" ? styles.selected : ""}`} onClick={() => handleOptionClick("Saida")}>Saída</option>
          </div>
        </div>
        <div className={styles.bottonModal}>
          <button className={styles.cancel} onClick={closeModal}>Cancelar</button>
          <button className={styles.acept} onClick={() => {
              handleValue()
              // console.log(listDeposit)
              // console.log(listOutFlow)
              console.log('listOutFlow armazenada no localStorage:', listOutFlow)
            }}>Inserir valor</button>
        </div>
      </div>

    </div>
  )
 }
 return null
  
}

export default Modal