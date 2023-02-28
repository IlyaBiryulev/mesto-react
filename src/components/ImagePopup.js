import React from 'react';

function ImagePopup() {
  
    return (
      <div>
        <section class="popup popup_open-img">
          <div class="popup__img-container">
            <button class="popup__close-button" type="button"></button>
            <img class="popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="Архыз"/>
            <p class="popup__img-description">Архыз</p>
          </div>
        </section>
      </div>
    );
}

export default ImagePopup;