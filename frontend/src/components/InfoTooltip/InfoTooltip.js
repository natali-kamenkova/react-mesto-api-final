function InfoTooltip(props) {
  return (
    <div className={props.active ? `popup popup_opened` : `popup`}>
      <div className="popup__container popup__container_form ">
        <button className="popup__close" type="button"  aria-label="close" onClick={props.onClose}/>
        {props.isRegistr ? <button  className='popup__okregistr'type="button"  aria-label="close" onClick={props.onClose}></button> : <button className="popup__notregistr" type="button"  aria-label="close" onClick={props.onClose}></button>}
        {props.isRegistr ?
          
            <h2 className="popup__text">Вы успешно зарегистрировались!</h2>
          
          :
          
            <h2 className="popup__text">Что-то пошло не так!
            Попробуйте ещё раз.</h2>
        }
        



      </div>

    </div>

  )
}

export default InfoTooltip;
