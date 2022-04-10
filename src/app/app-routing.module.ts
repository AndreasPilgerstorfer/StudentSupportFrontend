import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TextInformationComponent} from "./components/text-information/text-information.component";
import {LvaOverviewComponent} from "./components/lva-overview/lva-overview.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'imprint', component: TextInformationComponent},
  {path: 'cookie-information', component: TextInformationComponent},
  {path: 'privacy', component: TextInformationComponent},
  {path: 'lva-overview', component: LvaOverviewComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
