import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user";
import {UserFactory} from "../../shared/user-factory";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Offer} from "../../shared/offer";
import {RequestClass as Request} from "../../shared/request";
import {OfferService} from "../../shared/offer.service";
import {Message} from "../../shared/message";
import {MessageService} from "../../shared/message.service";
import {RequestService} from "../../shared/request.service";
import {AuthenticationService} from "../../shared/authentication.service";
import {NgxGlobalEventsService} from "ngx-global-events";
import {Router} from "@angular/router";

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
  public messages: Message[] = [];
  public requests: Request[] = [];
  public emailIcon = faEnvelope;
  public telephoneIcon = faPhone;
  public isStudent: number;

  constructor(
    private us: UserService,
    private os: OfferService,
    private rs: RequestService,
    private ms: MessageService,
    private authService: AuthenticationService,
    private globalEventsService: NgxGlobalEventsService,
    private router: Router
  ) {
    this.isStudent = this.authService.getCurrentUserRole();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.getUser();

      if (!!this.authService.getCurrentUserRole()) {
        this.getStudentOffers();
      } else {
        this.getTeacherMessages();
        this.getPendingTeacherRequests();
      }
    }
  }

  getUser() {
    this.us.getSingleUser(this.authService.getCurrentUserId()).subscribe(user => {
      this.user = user;
    });
  }

  getStudentOffers() {
    this.os.findByAssociatedStudent(this.authService.getCurrentUserId()).subscribe(res => {
      this.offers = res;
    });
  }

  getTeacherMessages() {
    this.ms.getByTeacherId(this.authService.getCurrentUserId()).subscribe(res => {
      this.messages = res;
    });
  }

  getPendingTeacherRequests() {
    this.rs.getPendingByTeacherId(this.authService.getCurrentUserId()).subscribe(res => {
      this.requests = res;
    });
  }

  logout() {
    this.authService.logout();
    this.globalEventsService.emit("reloadProfileIcon");
    this.router.navigateByUrl("/");
  }
}
