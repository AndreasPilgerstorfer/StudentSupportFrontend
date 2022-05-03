import {Component, OnInit} from '@angular/core';
import {OfferService} from "../../shared/offer.service";
import {Offer} from "../../shared/offer";
import {AuthenticationService} from "../../shared/authentication.service";

@Component({
  selector: 'studSup-teacher-offer-section',
  templateUrl: './teacher-offer-section.component.html',
  styleUrls: [
    "teacher-offer-section.component.scss"
  ]
})
export class TeacherOfferSectionComponent implements OnInit {

  public offers: Offer[] | undefined = undefined;

  constructor(
    private os: OfferService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.getOffersByTeacherID();
  }

  public getOffersByTeacherID() {
    this.os.findByTeacherId(this.authService.getCurrentUserId()).subscribe(res => {
      this.offers = res;
    });
  }

}
