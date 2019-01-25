import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CoreModule } from './core/core.module';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';


import {NgxQRCodeModule} from 'ngx-qrcode2';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import { OwlModule } from 'ngx-owl-carousel';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent, BottomSheetMenu} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {SignupComponent} from './signup/signup.component';
import {CoponsComponent} from './copons/copons.component';
import {ProfileComponent} from './profile/profile.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { MagazineComponent } from './magazine/magazine.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SignupComponent,
    CoponsComponent,
    ProfileComponent,
    BottomSheetMenu,
    LoginComponent,
    MagazineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatBottomSheetModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
    FormsModule,
    OwlModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule,
    WavesModule,
    ButtonsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTreeModule,
    NgxQRCodeModule,
    MatTableModule,
    MatSelectModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NavbarComponent, BottomSheetMenu]
})
export class AppModule { }
