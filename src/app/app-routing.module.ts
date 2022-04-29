import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TextInformationComponent} from "./components/text-information/text-information.component";
import {LvaOverviewComponent} from "./components/lva-overview/lva-overview.component";
import {LvaDetailComponent} from "./components/lva-detail/lva-detail.component";
import {LoginComponent} from "./components/login/login.component";
import {OfferDetailComponent} from "./components/offer-detail/offer-detail.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {TeacherOfferSectionComponent} from "./components/teacher-offer-section/teacher-offer-section.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'imprint', component: TextInformationComponent},
  {path: 'cookie-information', component: TextInformationComponent},
  {path: 'privacy', component: TextInformationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lva-overview', component: LvaOverviewComponent},
  {path: 'lva-overview/:lva-id', component: LvaDetailComponent},
  {path: 'offer/:offer-id', component: OfferDetailComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'offer-section', component: TeacherOfferSectionComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
