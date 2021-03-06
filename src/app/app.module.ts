import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {TextInformationComponent} from './components/text-information/text-information.component';
import {HeadingComponent} from './components/heading/heading.component';
import {HeaderComponent} from './components/header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProfileIconComponent} from './components/profile-icon/profile-icon.component';
import {BannerComponent} from './components/banner/banner.component';
import {ArticleComponent} from './components/article/article.component';
import {LvaOverviewComponent} from './components/lva-overview/lva-overview.component';
import {CourseService} from "./shared/course.service";
import {OfferService} from "./shared/offer.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LvaOverviewItemComponent} from './components/lva-overview-item/lva-overview-item.component';
import {LvaDetailComponent} from './components/lva-detail/lva-detail.component';
import {LoginComponent} from './components/login/login.component';
import {ToastrModule} from "ngx-toastr";
import {OfferOverviewComponent} from './components/offer-overview/offer-overview.component';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { OfferOverviewItemComponent } from './components/offer-overview-item/offer-overview-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileStudentOfferOverviewItemComponent } from './components/profile-student-offer-overview-item/profile-student-offer-overview-item.component';
import { MessageOverviewItemComponent } from './components/message-overview-item/message-overview-item.component';
import { RequestOverviewItemComponent } from './components/request-overview-item/request-overview-item.component';
import { TeacherOfferSectionComponent } from './components/teacher-offer-section/teacher-offer-section.component';
import { TeacherOfferSectionItemComponent } from './components/teacher-offer-section-item/teacher-offer-section-item.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import {RequestService} from "./shared/request.service";
import {MessageService} from "./shared/message.service";
import {UserService} from "./shared/user.service";
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import {registerLocaleData} from "@angular/common";
import localDe from "@angular/common/locales/de";

registerLocaleData(localDe)

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    TextInformationComponent,
    HeadingComponent,
    HeaderComponent,
    ProfileIconComponent,
    BannerComponent,
    ArticleComponent,
    LvaOverviewComponent,
    LvaOverviewItemComponent,
    LvaDetailComponent,
    LoginComponent,
    OfferOverviewComponent,
    OfferDetailComponent,
    OfferOverviewItemComponent,
    ProfileComponent,
    ProfileStudentOfferOverviewItemComponent,
    MessageOverviewItemComponent,
    RequestOverviewItemComponent,
    TeacherOfferSectionComponent,
    TeacherOfferSectionItemComponent,
    OfferFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    CourseService,
    OfferService,
    RequestService,
    MessageService,
    UserService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'de'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
