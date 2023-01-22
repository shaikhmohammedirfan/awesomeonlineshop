import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninsignupRoutingModule } from './signinsignup-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EmailPasswordFormComponent } from './email-password-form/email-password-form.component';

import { environment } from '../../../environments/environment';

// Firebase, Firestore, Angular/Fire/Auth imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';

@NgModule({
  declarations: [SigninComponent, SignupComponent, EmailPasswordFormComponent],
  imports: [
    CommonModule,
    SigninsignupRoutingModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
})
export class SigninsignupModule {}
