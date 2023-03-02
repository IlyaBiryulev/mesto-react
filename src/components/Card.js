import React from 'react';


function Card({card, onCardClick}) {
    function handleClick() {
      onCardClick(card)
    }

    return (
    <div>
        <div className="photo-grid__item">
            <img src={card.link} alt="изображение" className="photo-grid__image photo-grid__image_popup" onClick = {handleClick}/>
            <button className="photo-grid__delete-btn" type="button"></button>
            <div className="photo-grid__caption">
                <h2 className="photo-grid__title photo-grid__title_popup">{card.name}</h2>
                <div className="photo-grid__like-wrapper">
                    <button className="photo-grid__like" type="button"></button>
                    <p className="photo-grid__like-counter">{card.length}</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Card;