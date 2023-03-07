import React from 'react';
import '../index.css'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import {api} from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getUserInfo()])
    .then((values) => {
      setCurrentUser(values[0])
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        />
        <Footer />
        <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        />
        <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        />
        <AddPlacePopup 
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        />
        <ImagePopup 
        card = {selectedCard}
        onClose = {closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
