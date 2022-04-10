import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../shared/course";

@Component({
  selector: 'div.studSup-lva-overview-item',
  templateUrl: './lva-overview-item.component.html',
  styleUrls: [
    "lva-overview-item.component.scss"
  ]
})
export class LvaOverviewItemComponent implements OnInit {

  @Input() course: Course | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public cropText(text: string):string {
    return text.substring(0, 60) + " ...";
  }

}
