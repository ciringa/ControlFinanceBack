import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import SingUp from "./components/pages/SingUp"

function App() { //Main Page
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singUp" element={<SingUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
