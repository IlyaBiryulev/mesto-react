import React from 'react';
import {api} from '../utils/Api.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
    })
  })

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      return setCards(data.map((item) => ({
        id: item._id,
        name: item.name,
        link: item.link,
        length: item.likes.length,
      })))
    })
  }) 


  return (
    <div>
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-update-button" type="button" onClick = {onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}><img src = "#" alt="Фотография профиля" className="profile__image"/></button>
          <div className="profile__info">
            <div className="profile__edit-info">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick = {onEditProfile}></button>
            </div>
            <p className="profile__about-me">{userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" onClick = {onAddPlace}></button>
        </section>
        <section className="photo-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onCardClick={onCardClick}/>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;