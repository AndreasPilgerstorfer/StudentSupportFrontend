import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TextInformationComponent } from './components/text-information/text-information.component';
import { HeadingComponent } from './components/heading/heading.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileIconComponent } from './components/profile-icon/profile-icon.component';
import { BannerComponent } from './components/banner/banner.component';
import { ArticleComponent } from './components/article/article.component';
import { LvaOverviewComponent } from './components/lva-overview/lva-overview.component';
import {CourseService} from "./shared/course.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

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
    LvaOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
