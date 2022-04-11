import {Component, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: [
    "./profile-icon.component.scss"
  ]
})
export class ProfileIconComponent implements OnInit {

  public isLoggedIn = false;
  public userIcon = faUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
