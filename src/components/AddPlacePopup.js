import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose}) {
    return (
      <div>
        <PopupWithForm
        title = "Новое место"
        name = "add-cards"
        isOpen = {isOpen}
        onClose = {onClose}>
            <input
                type="text"
                class="popup__form-edit popup__form-edit_substitution_name popup__form-edit_name"
                name="caption-input"
                id='caption-input'
                form="popup-add"
                required
                placeholder="Название"
                minlength="2"
                maxlength="30"/>
            <span class="caption-input-error popup__form-error"></span>
            <input
                type="url"
                class="popup__form-edit popup__form-edit_substitution_about-me popup__form-edit_link"
                name="link-input"
                id='link-input'
                form="popup-add"
                required
                placeholder="Ссылка на картинку"/>
            <span class="link-input-error popup__form-error"></span>
        </PopupWithForm>
      </div>
    );
}

export default AddPlacePopup;