import {FormControl} from "@angular/forms";

export class OfferValidators {

  public static futureDate(control: FormControl): any {
    if (!control.value) {
      return null;
    } else {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      return selectedDate > currentDate ? null : {futureDate: {valid: false}};
    }
  }
}
