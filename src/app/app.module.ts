import {NgModule} from '@angular/core';
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
import {HttpClientModule} from "@angular/common/http";
import {LvaOverviewItemComponent} from './components/lva-overview-item/lva-overview-item.component';
import {LvaDetailComponent} from './components/lva-detail/lva-detail.component';
import {LoginComponent} from './components/login/login.component';
import {ToastrModule} from "ngx-toastr";
import {OfferOverviewComponent} from './components/offer-overview/offer-overview.component';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { OfferOverviewItemComponent } from './components/offer-overview-item/offer-overview-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileStudentOfferOverviewItemComponent } from './components/profile-student-offer-overview-item/profile-student-offer-overview-item.component';
import { MessageOverviewItemComponent } from './components/message-overview-item/message-overview-item.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [CourseService, OfferService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
