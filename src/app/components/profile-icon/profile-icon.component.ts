import {Component, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from "../../shared/authentication.service";
import {NgxGlobalEventsService} from "ngx-global-events";
import {Router} from "@angular/router";

@Component({
  selector: 'profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: [
    "./profile-icon.component.scss"
  ]
})
export class ProfileIconComponent implements OnInit {

  public isLoggedIn: boolean;
  public userIcon = faUser;
  public checked = false;

  constructor(
    private authService: AuthenticationService,
    private globalEventsService: NgxGlobalEventsService,
    private router: Router,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.globalEventsService.get("reloadProfileIcon").subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout() {
    this.authService.logout();
    this.globalEventsService.emit("reloadProfileIcon");
    this.globalEventsService.emit("reloadNavigation");
    this.router.navigateByUrl("/");
  }
}
