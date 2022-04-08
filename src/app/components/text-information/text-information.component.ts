import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ss-text-information',
  templateUrl: './text-information.component.html',
  styleUrls: [
    "./text-information.component.scss"
  ]
})
export class TextInformationComponent implements OnInit {

  public isImprint:boolean = false;
  public isPrivacy:boolean = false;
  public isCookieInfo:boolean = false;

  constructor(
    private router:Router
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === "/imprint") this.isImprint = true;
    if (this.router.url === "/privacy") this.isPrivacy = true;
    if (this.router.url === "/cookie-information") this.isCookieInfo = true;
  }
}
