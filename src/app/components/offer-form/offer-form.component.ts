import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../shared/offer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferService} from "../../shared/offer.service";
import {CourseService} from "../../shared/course.service";
import {Course} from "../../shared/course";
import {OfferFactory} from "../../shared/offer-factory";
import {OfferFormErrorMessages} from "./offer-form-error-messages";
import {OfferValidators} from "./offer-validators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'studSup-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: [
    "offer-form.component.scss"
  ]
})
export class OfferFormComponent implements OnInit {

  @Input() offerId: number | undefined;
  public offer: Offer = OfferFactory.empty();
  public updateOffer: boolean = false;
  public errors: { [key: string]: string } = {};
  public offerForm: FormGroup;
  public courses: Array<Course> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private os: OfferService,
    private cs: CourseService,
    private toastr: ToastrService,
  ) {
    this.offerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getAvailableCourses();

    if(this.offerId) {
      this.updateOffer = true;

      this.os.getSingleOffer(String(this.offerId)).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      })
    }

    this.initOffer();
  }

  private getAvailableCourses() {
    this.cs.getAll().subscribe(res => {
      this.courses = res;
    });
  }

  private initOffer() {

    this.offerForm = this.fb.group({
      title: [this.offer.title, Validators.required],
      course: ['', [Validators.required, OfferValidators.hasSelectedCourse]],
      from: [this.offer.start_time, Validators.required],
      to: [this.offer.end_time, Validators.required],
      date: ['', [Validators.required, OfferValidators.futureDate]],
      description: [this.offer.description, Validators.required],
      imageUrl: [this.offer.image.url],
      imageTitle: [this.offer.image.title],
    })

    // Immer wenn sich die Fehler verändern
    this.offerForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  // Fehler meldungen updaten
  private updateErrorMessages() {
    this.errors = {};

    for (const message of OfferFormErrorMessages) {
      const control = this.offerForm.get(message.forControl);

      // Checken ob Fehler
      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text
      }
    }
  }

  public submitForm() {

    this.setImagePlaceholder();

    //TODO: change harcoded userID //////////////////////
    const jsonRequest = {
      "course_id": this.offerForm.value.course,
      "user_id": 1,
      "start_time": this.offerForm.value.from,
      "end_time": this.offerForm.value.to,
      "date": this.offerForm.value.date,
      "title": this.offerForm.value.title,
      "description": this.offerForm.value.description,
      "state": "Offen",
      "associatedStudent": "none",
      "image_id": 1,
      "image": {
        "title": this.offerForm.value.imageTitle,
        "url": this.offerForm.value.imageUrl
      }
    }

    console.log(jsonRequest);

    if (this.updateOffer) {
      //updateForm
      //TODO: update Offer ///////////////////////////////////////
    } else {
      //new Form
      this.os.create(jsonRequest).subscribe(res => {
        // Formular zurücksetzen
        this.offer = OfferFactory.empty();
        this.offerForm.reset(this.offer);
        this.toastr.success("Angebot erfolgreich erstellt.", "Erstellt");
      });

    }
  }

  private setImagePlaceholder(){
    if (this.offerForm.value.imageUrl == ""){
      this.offerForm.value.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
    }

    if (this.offerForm.value.imageTitle == ""){
      this.offerForm.value.imageTitle = "Platzhalter Bild";
    }
  }
}
