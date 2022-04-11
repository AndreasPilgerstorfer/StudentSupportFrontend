import {Component, OnInit} from '@angular/core';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'studSup-login',
  templateUrl: './login.component.html',
  styleUrls: [
    "login.component.scss"
  ]
})
export class LoginComponent implements OnInit {

  public userIcon = faUser;
  public passwordIcon = faKey;

  constructor() {
  }

  ngOnInit(): void {
  }

}
