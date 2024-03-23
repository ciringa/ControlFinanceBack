import { MdDelete } from "react-icons/md"
import styles from "../styles/TransactionsHome.module.css"
import { ComponentContainer } from "@firebase/component";
import { func } from "prop-types";
import { deleteDoc, doc, getDoc, getFirestore,getDocs,collection} from "@firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import {app} from "../../services/firebaseConfig"

// eslint-disable-next-line react/prop-types
function TransactionsHome({value, type, remove,id}) {
  const db = getFirestore(app)
  //change the values to BRL format
  function notify() {
    toast.success("Funçao deletada com sucesso", {
      autoClose: 3000
    })
  }
  const formatValueToBRL = (valor) => {
    //no futuo talvez valha a pena adicionar isto aqui
    /*
    const formatar = Intl.NumberFormat('en',{
      notation: "compact"
    })

    let p = formatar.format(value)
    */
    let p = valor
    return p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  };

  async function deleteUser(index){
    const setCollection = collection(db,"Transactions")
    const data = await getDocs(setCollection)
    const DeleteFieldId = data.docs[index].id
    console.log("DeleteFieldId:"+DeleteFieldId)
    let ok = confirm("deseja realmente apagar esta transaçao? Valor:"+data.docs[index]._document.data.value.mapValue.fields.value.integerValue);
    if(ok){
      const TramsactionRef = doc(db,"Transactions",DeleteFieldId) // funçao doc recebe o valor de um documento especificado por estes parametros 
      console.log(TramsactionRef)
      await deleteDoc(TramsactionRef).then(()=>{
        notify()
      })

    }
  }

  return (
    <div className={styles.hug}>
      <h2>{formatValueToBRL(value)}</h2>
      <div className={styles.section}>
        <div>{type}</div>
        <span onClick={()=>{deleteUser(id)}}><MdDelete /></span>
      </div>
    </div>
  )
}

export default TransactionsHome