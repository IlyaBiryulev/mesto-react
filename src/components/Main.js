import React from 'react';
import {api} from '../utils/Api.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setuserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [userAvatar, setuserAvatar] = React.useState('');
  const [cards, setcards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setuserName(data.name)
      setuserDescription(data.about)
      setuserAvatar(data.avatar)
    })
  })

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      return setcards(data.map((item) => ({
        id:item._id,
        name:item.name,
        link: item.link,
        length: item.likes.length,
      })))
    })
  }) 


  return (
    <div>
      <main class="content">
        <section class="profile">
          <button class="profile__avatar-update-button" type="button" onClick = {onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}><img src = "#" alt="Фотография профиля" class="profile__image"/></button>
          <div class="profile__info">
            <div class="profile__edit-info">
              <h1 class="profile__name">{userName}</h1>
              <button class="profile__edit-button" type="button" onClick = {onEditProfile}></button>
            </div>
            <p class="profile__about-me">{userDescription}</p>
          </div>
          <button class="profile__add-button" type="button" onClick = {onAddPlace}></button>
        </section>
        <section class="photo-grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick}/>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;