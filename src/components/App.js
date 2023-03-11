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
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = React.useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = React.useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = React.useState([]);
  const [submitButtonState, setSubmitButtonState] = React.useState('')

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((values) => {
      setCurrentUser(values[0])
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
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((newCard) => {
      console.log(newCard)
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  const handleUpdateUser = (userData) => {
    setIsEditProfilePopupLoading(true);
    api.setUserInfo(userData)
    .then((value) => {
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsEditProfilePopupLoading(false);
    });
  }

  const handleUpdateAvatar = (link) => {
    setIsEditAvatarPopupLoading(true)
    api.setUserAvatar(link)
    .then((value) => {
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsEditAvatarPopupLoading(false)
    }); 
  }

  const handleAddPlaceSubmit = (cardData) => {
    setIsAddPlacePopupLoading(true)
    api.addCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsAddPlacePopupLoading(false)
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
        isLoading = {isEditProfilePopupLoading}
        />
        <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
        isLoading = {isEditAvatarPopupLoading}
        />
        <AddPlacePopup 
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace = {handleAddPlaceSubmit}
        isLoading = {isAddPlacePopupLoading}
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
