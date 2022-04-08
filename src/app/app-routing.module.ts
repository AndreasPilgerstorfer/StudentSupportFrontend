import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TextInformationComponent} from "./components/text-information/text-information.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'imprint', component: TextInformationComponent },
  { path: 'cookie-information', component: TextInformationComponent },
  { path: 'privacy', component: TextInformationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
