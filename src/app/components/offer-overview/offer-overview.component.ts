import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../shared/offer.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Offer} from "../../shared/offer";

@Component({
  selector: 'studSup-offer-overview',
  templateUrl: './offer-overview.component.html',
  styleUrls: [
    'offer-overview.component.scss'
  ]
})
export class OfferOverviewComponent implements OnInit {

  public offers: Offer[] = [];
  private params: Params;


  constructor(
    private os: OfferService,
    private route: ActivatedRoute
  ) {
    this.params = this.route.snapshot.params;
  }

  ngOnInit(): void {
    this.os.getAllOpenOffers(this.params['lva-id']).subscribe(res => {
      this.offers = res;
    });
  }

}
