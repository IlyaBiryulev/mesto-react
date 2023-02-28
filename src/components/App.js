import React from 'react';
import '../index.css'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
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
    </div>
  );
}

export default App;
