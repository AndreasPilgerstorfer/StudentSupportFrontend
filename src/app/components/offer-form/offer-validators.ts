import {FormControl} from "@angular/forms";
import {map, Observable} from "rxjs";

export class OfferValidators {

  public static hasSelectedCourse(control: FormControl):any {
    if (!control.value) {
      return null;
    }

    return control.value != 0 ? null : {selectedCourse: {valid: false}};
  }

  public static futureDate(control: FormControl):any {
    if (!control.value) {
      return null;
    } else {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      return selectedDate > currentDate ? null : {futureDate: {valid: false}};}
    }
}
