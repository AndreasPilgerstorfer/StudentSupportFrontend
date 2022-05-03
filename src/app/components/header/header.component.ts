import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/authentication.service";
import {NgxGlobalEventsService} from "ngx-global-events";

@Component({
  selector: 'studSup-header',
  templateUrl: './header.component.html',
  styleUrls: [
    "./header.component.scss"
  ]
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public isTeacher: boolean;
  public isLoggedIn: boolean;

  constructor(
    private authService: AuthenticationService,
    private globalEventsService: NgxGlobalEventsService,
  ) {
    this.isTeacher = this.authService.getCurrentUserRole() == 0
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.globalEventsService.get("reloadNavigation").subscribe(() => {
      this.isTeacher = this.authService.getCurrentUserRole() == 0
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}
