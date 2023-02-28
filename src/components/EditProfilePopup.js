import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose}) {
  
    return (
      <div>
        <PopupWithForm
        title = "Редактировать профиль"
        name = "profile-edit"
        isOpen = {isOpen}
        onClose = {onClose}>
            <input
                type="text"
                className = "popup__form-edit popup__form-edit_substitution_name"
                name="name"
                id='name-input'
                form="profile-edit"
                required
                placeholder="Введите имя"
                minlength="2"
                maxlength="40"/>
            <span className="name-input-error popup__form-error"></span>
            <input
                type="text"
                className = "popup__form-edit popup__form-edit_substitution_about-me"
                name="job"
                id='job-input'
                form="profile-edit"
                required
                placeholder="Введите о себе"
                minlength="2"
                maxlength="200"/>
            <span className = "job-input-error popup__form-error"></span>
        </PopupWithForm>
      </div>
    );
}

export default EditProfilePopup;