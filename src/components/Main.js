import React from 'react';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  return (
    <div>
      <main class="content">
        <section class="profile">
          <button class="profile__avatar-update-button" type="button" onClick = {onEditAvatar}><img src="#" alt="Фотография профиля" class="profile__image"/></button>
          <div class="profile__info">
            <div class="profile__edit-info">
              <h1 class="profile__name">Жак-Ив Кусто</h1>
              <button class="profile__edit-button" type="button" onClick = {onEditProfile}></button>
            </div>
            <p class="profile__about-me">Исследователь океана</p>
          </div>
          <button class="profile__add-button" type="button" onClick = {onAddPlace}></button>
        </section>
        <section class="photo-grid">
        </section>
      </main>
    </div>
  );
}

export default Main;