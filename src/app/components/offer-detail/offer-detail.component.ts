import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OfferFactory} from "../../shared/offer-factory";
import {Offer} from "../../shared/offer";
import {OfferService} from "../../shared/offer.service";
import {User} from "../../shared/user";
import {UserFactory} from "../../shared/user-factory";
import {UserService} from "../../shared/user.service";
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageFactory} from "../../shared/message-factory";
import {Message} from "../../shared/message";
import {MessageFormErrorMessages} from "./message-form-error-message";
import {MessageService} from "../../shared/message.service";
import {ToastrService} from "ngx-toastr";
import {RequestService} from "../../shared/request.service";
import {AuthenticationService} from "../../shared/authentication.service";

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
  public associatedStudent: User = UserFactory.empty();
  public emailIcon = faEnvelope;
  public telephoneIcon = faPhone;
  public messageForm: FormGroup;
  public errors: { [key: string]: string } = {};
  public message: Message = MessageFactory.empty();
  public isStudent: boolean;
  private params: Params;

  constructor(
    private os: OfferService,
    private us: UserService,
    private ms: MessageService,
    private rs: RequestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthenticationService
  ) {
    this.params = this.route.snapshot.params;
    this.messageForm = this.fb.group({});
    this.isStudent = this.authService.getCurrentUserRole() == 1;
  }

  ngOnInit() {
    this.getOfferAndUsers();
    this.initMessage();
  }

  public getOfferAndUsers() {
    this.os.getSingleOffer(this.params['offer-id']).subscribe(offer => {
      this.offer = offer;
      this.us.getSingleUser(this.offer.user.id).subscribe(teacher => this.teacher = teacher);

      if (this.offer.associatedStudent != "none" && this.offer.state != "Offen") {
        this.us.getSingleUser(Number(this.offer.associatedStudent))
          .subscribe(associatedStudent => {
            this.associatedStudent = associatedStudent;
          });
      }
    });
  }

  initMessage() {
    this.messageForm = this.fb.group({
      title: [this.message.title, Validators.required],
      text: [this.message.text, Validators.required],
    });

    this.messageForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  public submitMessageForm() {
    const requestBody = {
      title: this.messageForm.value.title,
      text: this.messageForm.value.text,
      offer_id: this.offer.id,
      user_id: this.authService.getCurrentUserId()
    }

    this.ms.create(requestBody).subscribe(res => {
      // Formular zurücksetzen
      this.message = MessageFactory.empty();
      this.messageForm.reset(this.message);
      this.toastr.success("Nachricht erfolgreich gesendet.", "Gesendet");
    });
  }

  sendRequest() {
    let request = {
      user_id: this.authService.getCurrentUserId(),
      offer_id: this.offer.id,
      state: "pending"
    };

    this.rs.create(request).subscribe(res => {
      this.toastr.success("Anfrage erfolgreich gesendet.", "Gesendet");
    });
  }

  deleteOffer() {
    this.os.remove(this.offer.id).subscribe(res => {
      this.toastr.success("Angebot erfolgreich gelöscht.", "Gelöscht");
      this.router.navigate(["../../offer-section"], {relativeTo: this.route});
    });
  }

  private updateErrorMessages() {
    this.errors = {};

    for (const message of MessageFormErrorMessages) {
      const control = this.messageForm.get(message.forControl);

      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text
      }
    }
  }
}
