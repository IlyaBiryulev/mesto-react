import { nameInput,
  jobInput,
  cards,
  avatarLinkInput
} from "./constants.js";

import { createCard } from "../pages/index.js";

export const handleProfileFormSubstitution = (userData) => {
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

export const handleUpdateAvatarForm = (userData) => {
  avatarLinkInput.value = userData.avatar;
}

export const handleAddCardForm = (popupInputsValue) => {
  cards.prepend(createCard(popupInputsValue))
}
