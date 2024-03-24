
// eslint-disable-next-line react/prop-types
function Input({type, value, id, placeholder, onSubmit, classname}) {
  return (
    <>
      <input type={type} id={id} value={value}  placeholder={placeholder} onSubmit={onSubmit} className={classname}/>
    </>
  )
}

export default Input