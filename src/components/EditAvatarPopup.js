import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose}) {
  
    return (
      <div>
        <PopupWithForm
        title = "Обновить аватар"
        name = "update-avatar"
        isOpen = {isOpen}
        onClose = {onClose}>
            <input
                type="url"
                className="popup__form-edit popup__form-edit_substitution_name popup__form-edit_udate-link"
                name="avatar"
                id='avatar-input'
                form="popup-update-avatar"
                required
                placeholder="Ссылка"/>
            <span className="avatar-input-error popup__form-error"></span>
        </PopupWithForm>
      </div>
    );
}

export default EditAvatarPopup;