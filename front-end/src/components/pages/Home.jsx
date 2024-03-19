import { useState } from "react"

// import LinkButton from "../form/LinkButton"
import styles from "../styles/Home.module.css"
import Header from "../layout/Header"

import AllTransactions from "../../containers/AllTransactions"
import DepositMoney from "../../containers/DepositMoney"
import OutflowMoney from "../../containers/OutflowMoney"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../../services/firebaseConfig"
import { Navigate } from "react-router-dom"



function Home() {
  const auth = getAuth(app)

  const [container, setContainer] = useState(<AllTransactions />)
  const [selectedOption, setSelectedOption] = useState("Todos")

  function handleOptionClick(option) {
    // Atualiza o estado com a opção selecionada
    setSelectedOption(option)
  }

  function handleContainer(container) {
    setContainer(container)
  }

  
 
  const user = auth.currentUser
  console.log(user)

  return (
    <>
          <Header />
          <section>
            <nav className={styles.navbar}> 
              <h2>Resumo finaceiro</h2>
              <div>
                <option className={`${selectedOption === "Todos" ? styles.selected : ""}`} onClick={() => handleOptionClick("Todos") || handleContainer(<AllTransactions/>)}>Todos</option>
                <option className={`${selectedOption === "Entrada" ? styles.selected : ""}`} onClick={() => handleOptionClick("Entrada") || handleContainer(<DepositMoney/>)}>Entrada</option>
                <option className={`${selectedOption === "Saida" ? styles.selected : ""}`} onClick={() => handleOptionClick("Saida")  || handleContainer(<OutflowMoney/>)}>Saída</option>
              </div>
            </nav>
            <div>
              {container}
            </div>
          </section>
    </>
  )
}

export default Home