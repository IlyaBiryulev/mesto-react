import React from 'react';

function ImagePopup({card, onClose}) {
    return (
      <div> 
        <section className={`popup popup_open-img ${card ? `popup_opened` : ''}`}>
          <div class="popup__img-container">
            <button class="popup__close-button" type="button" onClick = {onClose}></button>
            <img class="popup__image" src={card?.link} alt={card?.name}/>
            <p class="popup__img-description">{card?.name}</p>
          </div>
        </section>
      </div>
    );
}

export default ImagePopup;