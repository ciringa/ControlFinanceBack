
// eslint-disable-next-line react/prop-types
function Input({type, value, id, placeholder, onSubmit}) {
  return (
    <>
      <input type={type} id={id} value={value}  placeholder={placeholder} onSubmit={onSubmit} />
    </>
  )
}

export default Input