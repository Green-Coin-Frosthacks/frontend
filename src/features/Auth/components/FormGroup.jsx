function FormGroup({ label, id, name, type, placeholder, value, onChange, autoComplete }) {
  return (
    <>
        <label htmlFor={id}>{label}</label>
          <input
            className="input"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
          />
    </>
  )
}

export default FormGroup