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
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((values) => {
      setCurrentUser(values[0])
      console.log(values[1])
      setCards(values[1])
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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  } 

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((newCard) => {
      console.log(newCard)
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  } 

  const handleUpdateUser = (popupInputsValue) => {
    api.setUserInfo(popupInputsValue)
    .then((value) => {
      console.log(value)
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleUpdateAvatar = (link) => {
    api.setUserAvatar(link)
    .then((value) => {
      console.log(value)
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleAddPlaceSubmit = (popupInputsValue) => {
    api.addCard(popupInputsValue)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
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
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        cards = {cards}
        />
        <Footer />
        <EditProfilePopup 
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onUpdateUser = {handleUpdateUser}
        />
        <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
        />
        <AddPlacePopup 
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace = {handleAddPlaceSubmit}
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
