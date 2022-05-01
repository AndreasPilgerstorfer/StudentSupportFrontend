import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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

  @Input() offerId: any | undefined;
  @Output() reloadTeacherOffers = new EventEmitter<any>();
  @Output() reloadDetailOffer = new EventEmitter<any>();
  @ViewChild('close') close: ElementRef<HTMLElement> | undefined;

  public offer: Offer = OfferFactory.empty();
  public updateOffer: boolean = false;
  public errors: { [key: string]: string } = {};
  public offerForm: FormGroup;
  public courses: Array<Course> = [];
  public buttonText: string = "Erstellen";
  public possibleStates: Array<String> = []

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

    if (this.offerId) {
      this.updateOffer = true;
      this.buttonText = "Update";
      this.initPossibleStates();

      this.os.getSingleOffer(String(this.offerId)).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
      })
    }

    this.initOffer();
  }

  public initPossibleStates() {
    if (this.offer.state != "Offen") this.possibleStates.push("Offen");
    if (this.offer.state != "Abgeschlossen") this.possibleStates.push("Abgeschlossen");
    if (this.offer.state != "Nicht erschienen") this.possibleStates.push("Nicht erschienen");
  }

  public submitForm() {

    this.setImagePlaceholder();

    let state = "Offen";
    if (this.updateOffer) {
      state = this.offerForm.value.state;
      if (state == "Offen") this.offer.associatedStudent = "none";
    }

    //TODO: change harcoded userID //////////////////////
    const jsonRequest = {
      "course_id": this.offerForm.value.course,
      "user_id": 1,
      "start_time": this.offerForm.value.from,
      "end_time": this.offerForm.value.to,
      "date": this.offerForm.value.date,
      "title": this.offerForm.value.title,
      "description": this.offerForm.value.description,
      "state": state,
      "associatedStudent": this.offer.associatedStudent,
      "image_id": 1,
      "image": {
        "title": this.offerForm.value.imageTitle,
        "url": this.offerForm.value.imageUrl
      }
    }

    if (this.updateOffer) {
      //updateForm
      this.os.updateOffer(this.offer.id, jsonRequest).subscribe(res => {
        this.toastr.success("Angebot erfolgreich aktualisiert", "Aktualisiert");
        this.reloadDetailOffer.emit();
      });

    } else {
      //new Form
      this.os.create(jsonRequest).subscribe(res => {
        // Formular zurücksetzen
        this.offer = OfferFactory.empty();
        this.offerForm.reset(this.offer);
        this.toastr.success("Angebot erfolgreich erstellt.", "Erstellt");
        this.reloadTeacherOffers.emit();
      });
    }

    let el: HTMLElement = this.close!.nativeElement;
    el.click();
  }

  private getAvailableCourses() {
    this.cs.getAll().subscribe(res => {
      this.courses = res;
    });
  }

  private initOffer() {

    this.offerForm = this.fb.group({
      title: [this.offer.title, Validators.required],
      from: [this.offer.start_time, Validators.required],
      to: [this.offer.end_time, Validators.required],
      date: [this.offer.date, [Validators.required, OfferValidators.futureDate]],
      description: [this.offer.description, Validators.required],
      imageUrl: [this.offer.image.url],
      imageTitle: [this.offer.image.title],
    })

    if (this.updateOffer) {
      this.offerForm.addControl('course', this.fb.control(this.offer.course.id, [Validators.required]));
      this.offerForm.addControl('state', this.fb.control(this.offer.state, [Validators.required]));
    } else {
      this.offerForm.addControl('course', this.fb.control('', [Validators.required]));
    }

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

  private setImagePlaceholder() {
    if (this.offerForm.value.imageUrl == "") {
      this.offerForm.value.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
    }

    if (this.offerForm.value.imageTitle == "") {
      this.offerForm.value.imageTitle = "Platzhalter Bild";
    }
  }
}
