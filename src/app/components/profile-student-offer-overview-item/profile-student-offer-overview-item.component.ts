import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../shared/offer";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'div.studSup-profile-offer-overview-item-student',
  templateUrl: './profile-student-offer-overview-item.component.html',
  styleUrls: [
    "profile-student-offer-overview-item.component.scss"
  ]
})
export class ProfileStudentOfferOverviewItemComponent implements OnInit {

  @Input() public offer: Offer | undefined;
  public calendarIcon = faCalendar;

  constructor() { }

  ngOnInit(): void {
  }

}
