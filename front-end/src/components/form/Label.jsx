// eslint-disable-next-line react/prop-types

import Styles from "../styles/Form.module.css"

function Label({input, text}) {
  return (
    <>
      <label htmlFor={input}>{text}</label>
    </>
  )
}
//teste

export default Label