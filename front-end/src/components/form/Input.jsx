
// eslint-disable-next-line react/prop-types
function Input({type, value, id, placeholder}) {
  return (
    <>
      <input type={type} id={id} value={value}  placeholder={placeholder} />
    </>
  )
}

export default Input