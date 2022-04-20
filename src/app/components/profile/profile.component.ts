import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user";
import {UserFactory} from "../../shared/user-factory";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Offer} from "../../shared/offer";
import {OfferService} from "../../shared/offer.service";

@Component({
  selector: 'studSup-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    "profile.component.scss"
  ]
})
export class ProfileComponent implements OnInit {

  public user: User = UserFactory.empty();
  public offers: Offer[] = [];
  public emailIcon = faEnvelope;
  public telephoneIcon = faPhone;

  constructor(
    private us: UserService,
    private os: OfferService
  ) {
  }

  ngOnInit() {
    this.getUser();

    //TODO: create logiv to decide between teacher and student
    this.getStudentOffers()
  }

  getUser() {
    //TODO Remove Hardcoded user id
    this.us.getSingleUser(1).subscribe(user => {
      this.user = user;
    });
  }

  getStudentOffers() {
    //TODO Remove Hardcoded user id
    this.os.findByAssociatedStudent(1).subscribe(res => {
      this.offers = res;
    });
  }

  logout() {
    //TODO Logout User
  }
}
