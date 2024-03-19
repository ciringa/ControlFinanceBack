import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function LinkButton({to, text, onclick}) {
  return (
    <Link to={to} onClick={onclick}>
      {text}
    </Link>
  )
}

export default LinkButton