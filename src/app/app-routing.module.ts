import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { CoponsComponent } from './copons/copons.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MagazineComponent } from './magazine/magazine.component';
import { PecaoseuComponent } from './pecaoseu/pecaoseu.component';
import { NewHomeComponent } from './new-home/new-home.component';

const routes: Routes = [
  {
    path: '',
    component: NewHomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'cupons',
    component: CoponsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'magazine',
    component: MagazineComponent
  },
  {
    path: 'pedircartao',
    component: PecaoseuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
