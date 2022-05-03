import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Offer} from "../../shared/offer";
import {OfferService} from "../../shared/offer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'div.studSup-teacher-offer-section-item',
  templateUrl: './teacher-offer-section-item.component.html',
  styleUrls: [
    "teacher-offer-section-item.component.scss"
  ]
})
export class TeacherOfferSectionItemComponent implements OnInit {

  @Input() public offer: Offer | undefined;
  @ViewChild('close') close: ElementRef<HTMLElement> | undefined;
  @Output() reloadOffers = new EventEmitter<any>();

  public possibleStates: Array<String> = []
  public selectedValue = "";
  public currentValue: string | undefined;
  public showErrorMessage: boolean = false;


  constructor(
    private os:OfferService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.currentValue = this.offer?.state;
    this.initPossibleStates();
  }

  public initPossibleStates() {
    // Gebucht ist nur über einen Request setzbar
    if(this.currentValue != "Offen") this.possibleStates.push("Offen");
    if(this.currentValue != "Abgeschlossen") this.possibleStates.push("Abgeschlossen");
    if(this.currentValue != "Nicht erschienen") this.possibleStates.push("Nicht erschienen");
  }

  public changeState(id: number | undefined) {
    if (this.selectedValue) {
      this.showErrorMessage = false;
      let el: HTMLElement = this.close!.nativeElement;
      el.click();

      let requestBody;

      if (this.selectedValue == "Offen") {
        requestBody = {
          associatedStudent: "none",
          state: this.selectedValue
        }
      } else {
        requestBody = {
          state: this.selectedValue
        }
      }

      this.os.updateOffer(id, requestBody).subscribe(res=> {
        this.toastr.success(this.selectedValue, "Status erfolgreich geändert");
        this.reloadOffers.emit()
      });

    } else {
      this.showErrorMessage = true;
    }
  }

}
