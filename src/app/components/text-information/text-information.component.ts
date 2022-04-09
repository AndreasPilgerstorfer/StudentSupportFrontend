import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ss-text-information',
  templateUrl: './text-information.component.html',
  styleUrls: [
    "./text-information.component.scss"
  ]
})
export class TextInformationComponent implements OnInit {

  public isImprint: boolean = false;
  public isPrivacy: boolean = false;
  public isCookieInfo: boolean = false;
  public title: string | undefined;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === "/imprint") {
      this.isImprint = true;
      this.title = "Impressum";
    }
    if (this.router.url === "/privacy") {
      this.isPrivacy = true;
      this.title = "Datenschutz";
    }
    if (this.router.url === "/cookie-information") {
      this.isCookieInfo = true;
      this.title = "Cookie Information";
    }
  }
}
