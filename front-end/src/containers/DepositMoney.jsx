import { useState, useEffect } from "react"
import TransactionsHome from "../components/layout/TransactionsHome"
import SumOfValues from "../components/layout/SumOfValues"
import { app } from "../services/firebaseConfig"
import {collection, getDocs, getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

import styles from "../components/styles/SumOfValues.module.css"


function DepositMoney() {

  const [totalAmount,setTotalAmount] = useState(0)
  const [update,setUpdate] = useState(false)
  const [listAllTransactions,setListAllTransactions] = useState([])
  const db = getFirestore(app)
  var transactions = []
  const auth = getAuth(app)
  const currentUser = auth.currentUser
  const [value,setValue] = useState(0)
  useEffect(()=>{
    function returnIncurrency(value){
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
    setValue(returnIncurrency(totalAmount))
    console.log("préload: "+totalAmount+" postload: "+value)
  },[totalAmount])

  
  useEffect(()=>{

    const getUsers = async ()=>{
      if(auth){

        const setCollection = collection(db,"Transactions")
        const data = await getDocs(setCollection)
        const filter = data.docs.map(doc => (doc.data()))
        //console.log(filter)
        transactions = []
        filter.forEach(element =>{
        if(currentUser){
        
          if(element.user.uid == currentUser.uid){
            //console.log("tabela pertence ao usuario logado")
            if(element.type === "Entrada"){
              transactions.push(element)
            }
          }
        }
        setTotalAmount(calculateTotalValue(transactions))
        console.log(totalAmount)
        setListAllTransactions(transactions)
        })
        listAllTransactions.forEach(element =>{
          console.table(element)
          //setTotalAmount(previusValue =>{previusValue+element.value})
          //console.log(totalAmount)
        })
        }
    }
    getUsers()
  },[update])
  
  const calculateTotalValue = (element)=>{
    let total = 0
    console.log(element)
    element.forEach(ps =>{
      //console.warn(ps)
      //total+=parseFloat(ps.value)
      if(ps.type === "Entrada"){
        total += parseFloat(ps.value)
      }else{
        total -= parseFloat(ps.value)
      }
    })
    return total
  }

  useEffect(()=>{
    const totalupdate = totalAmount
    setTotalAmount(totalupdate)
    console.log("totalUpdate:"+totalAmount)
  },[totalAmount])


  useEffect(() => {
    // Função que será chamada a cada 2 segundos
    const callUpdate = () => {
      //const totalupdate = totalAmount
      setUpdate(Math.random())
      console.log("callToupdateCalled:"+update)
    }
    // Chama a função a cada 2 segundos
    const intervalId = setInterval(callUpdate, 5000);
    // Limpa o intervalo quando o componente é desmontado para evitar vazamento de memória
    return () => clearInterval(intervalId);
  }, []); // Dependência vazia para garantir que a função seja executada apenas uma vez após a montagem do componente


  return (
    <>
      <div onClick={()=>{
        callUpdate()
      }}>
      <div className={styles.cardMainValues}> 
            <h2>Soma dos valores</h2>
            <h2>{value}</h2>
          </div>
        <ul>
            {listAllTransactions.map((value) =>{
            return(
              <li key={value.id}><TransactionsHome value={value.value} type={value.type}></TransactionsHome></li>
            )
          })}
        </ul>
      </div>
    </>
  )
}


export default DepositMoney