import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { LayoutModule } from './modules/layout.module';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandsComponent } from './components/brands/brands.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { MywishlistComponent } from './components/mywishlist/mywishlist.component';
import { AlloffersComponent } from './components/alloffers/alloffers.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrandCardComponent } from './components/brand-card/brand-card.component';

import { environment } from '../environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { EmailPasswordFormComponent } from './components/email-password-form/email-password-form.component';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { SnackNotifierComponent } from './components/snack-notifier/snack-notifier.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { NextDirective } from './directives/next.directive';
import { PrevDirective } from './directives/prev.directive';
import { SignUpOptionsComponent } from './components/sign-up-options/sign-up-options.component';
import { UsermasterFormComponent } from './components/usermaster-form/usermaster-form.component';
import { ManageUserprofileComponent } from './components/manage-userprofile/manage-userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    BrandsComponent,
    MyaccountComponent,
    MycartComponent,
    MywishlistComponent,
    AlloffersComponent,
    CategoryCardComponent,
    BrandCardComponent,
    UserloginComponent,
    EmailPasswordFormComponent,
    SnackNotifierComponent,
    AlertModalComponent,
    NextDirective,
    PrevDirective,
    SignUpOptionsComponent,
    UsermasterFormComponent,
    ManageUserprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
