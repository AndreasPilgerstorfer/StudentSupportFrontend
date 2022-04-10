import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lva-overview',
  templateUrl: './lva-overview.component.html',
  styleUrls: [
    "lva-overview.component.scss"
  ]
})
export class LvaOverviewComponent implements OnInit {

  public title = "LVA Übersicht";

  constructor() {
  }

  ngOnInit(): void {
  }

}
