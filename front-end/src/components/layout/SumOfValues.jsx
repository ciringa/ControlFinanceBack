import { useEffect, useState } from "react"
import styles from "../styles/SumOfValues.module.css"
// eslint-disable-next-line react/prop-types
function SumOfValues({totalAmount}) {
  const [value,setValue] = useState(10)
  useEffect(()=>{
    function returnIncurrency(value){
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
    setValue(returnIncurrency(totalAmount))
    console.log("préload: "+totalAmount+" postload: "+value)
  },[])
  return (
    <div className={styles.cardMainValues}> 
      <h2>Soma dos valores</h2>
      <h2>{value}</h2>
    </div>
  )

}

export default SumOfValues