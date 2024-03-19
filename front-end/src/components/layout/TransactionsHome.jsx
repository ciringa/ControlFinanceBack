import { MdDelete } from "react-icons/md"
import styles from "../styles/TransactionsHome.module.css"

// eslint-disable-next-line react/prop-types
function TransactionsHome({value, type, remove}) {

  const formatValueToBRL = (valor) => {

    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  };
  
  return (
    <div className={styles.hug}>
      <h2>{formatValueToBRL(value)}</h2>
      <div className={styles.section}>
        <div>{type}</div>
        <span onClick={remove}><MdDelete /></span>
      </div>
    </div>
  )
}

export default TransactionsHome