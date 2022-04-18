import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {OfferFactory} from "../../shared/offer-factory";
import {Offer} from "../../shared/offer";
import {OfferService} from "../../shared/offer.service";
import {User} from "../../shared/user";
import {UserFactory} from "../../shared/user-factory";
import {UserService} from "../../shared/user.service";
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'studSup-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: [
    "./offer-detail.component.scss"
  ]
})
export class OfferDetailComponent implements OnInit {

  public offer: Offer = OfferFactory.empty();
  public teacher: User = UserFactory.empty();
  public emailIcon = faEnvelope;
  public telephoneIcon = faPhone;
  private params: Params;

  constructor(
    private os: OfferService,
    private us: UserService,
    private route: ActivatedRoute
  ) {
    this.params = this.route.snapshot.params;
  }

  ngOnInit() {
    this.getOfferAndUser();
  }

  getOfferAndUser() {
    this.os.getSingleOffer(this.params['offer-id']).subscribe(offer => {
      this.offer = offer;
      this.us.getSingleUser(this.offer.user.id).subscribe(teacher => this.teacher = teacher);
    });
  }
}
