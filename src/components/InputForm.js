import React from 'react';

function InputForm(props) {

  const [error, setError] = React.useState('');



  function handleChange(e) {
    props.onChange(e);
    // if (e.target.value.trim().length < 2 && e.target.validationMessage === '') {
    //   setError('Слово должно содержать как минимум 2 символа помимо пробелов.');

    // } else {
    //   setError(e.target.validationMessage);
    // }
  }

  React.useEffect(() => {
    if (!props.isOpen) { setError('') }
  }, [props.isOpen])
  return (
    <>
      <input ref={props.ref} value={props.value} onChange={handleChange} className={props.className} id={props.id} type={props.type} minLength={props.minLength} maxLength={props.maxLength} placeholder={props.placeholder} name={props.name} required/>
      <span className="popup__error">{error}</span>
    </>
  );
}

export default InputForm;