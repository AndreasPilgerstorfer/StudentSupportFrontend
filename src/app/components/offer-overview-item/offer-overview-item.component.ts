import {Component, Input} from '@angular/core';
import {Offer} from "../../shared/offer";

@Component({
  selector: 'div.studSup-offer-overview-item',
  templateUrl: './offer-overview-item.component.html',
  styleUrls: [
    "offer-overview-item.scss"
  ]
})
export class OfferOverviewItemComponent {

  @Input() offer: Offer | undefined;

  constructor() {
  }

  public cropText(text: string): string {
    return text.substring(0, 60) + " ...";
  }
}
