import {Component, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginFormErrorMessages} from "./login-error-messages";
import {AuthenticationService} from "../../shared/authentication.service";
import {NgxGlobalEventsService} from "ngx-global-events";

interface Response {
  access_token: string;
}

@Component({
  selector: 'studSup-login',
  templateUrl: './login.component.html',
  styleUrls: [
    "login.component.scss"
  ]
})
export class LoginComponent implements OnInit {

  public userIcon = faUser;
  public errors: { [key: string]: string } = {};
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private globalEventsService: NgxGlobalEventsService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Immer wenn sich die Fehler verändern
    this.loginForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  public login() {
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe((res:any) => {
        this.toastr.success("Eingeloggt", "Login erfolgreich");
        this.authService.setSessionStorage((res as Response).access_token); // cast auf Interface Response
        this.globalEventsService.emit("reloadProfileIcon");
        this.router.navigateByUrl("/");
      });
    }
  }

  // Fehlermeldungen updaten
  private updateErrorMessages() {
    this.errors = {};

    for (const message of LoginFormErrorMessages) {
      const control = this.loginForm.get(message.forControl);

      // Checken ob Fehler
      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text
      }
    }
  }
}
