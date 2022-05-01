import {ErrorMessage} from "../offer-detail/message-form-error-message";

export const OfferFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
  new ErrorMessage('course', 'required', 'Es muss eine LVA ausgewählt werden'),
  new ErrorMessage('state', 'required', 'Es muss ein Status ausgewählt werden'),
  new ErrorMessage('from', 'required', 'Es muss eine Startzeit angegeben werden'),
  new ErrorMessage('to', 'required', 'Es muss eine Endzeit angegeben werden'),
  new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage('date', 'futureDate', 'Es muss ein Datum in der Zukunft angegeben werden'),
  new ErrorMessage('description', 'required', 'Es muss eine Beschreibung angegeben werden'),
];
