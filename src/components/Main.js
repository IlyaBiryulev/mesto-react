import React from 'react';
import {api} from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    Promise.all([api.getInitialCards()])
    .then(([cardData]) => {
      setCards(cardData);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <div>
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-update-button" type="button" onClick = {onEditAvatar}>
            <img 
            src={currentUser.avatar} 
            alt="Фотография профиля" 
            className="profile__image"/>
            </button>
          <div className="profile__info">
            <div className="profile__edit-info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick = {onEditProfile}></button>
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick = {onAddPlace}></button>
        </section>
        <section className="photo-grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick}/>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;