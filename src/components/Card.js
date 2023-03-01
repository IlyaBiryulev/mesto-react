import React from 'react';


function Card({card, onCardClick}) {
    function handleClick() {
      onCardClick(card)
    }

    return (
    <div>
        <div class="photo-grid__item">
            <img src={card.link} alt="изображение" class="photo-grid__image photo-grid__image_popup" onClick = {handleClick}/>
            <button class="photo-grid__delete-btn" type="button"></button>
            <div class="photo-grid__caption">
                <h2 class="photo-grid__title photo-grid__title_popup">{card.name}</h2>
                <div class="photo-grid__like-wrapper">
                    <button class="photo-grid__like" type="button"></button>
                    <p class="photo-grid__like-counter">{card.length}</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Card;