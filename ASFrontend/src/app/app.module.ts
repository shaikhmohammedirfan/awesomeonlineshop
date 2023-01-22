import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HomeComponent } from './components/home/homepage/homepage.component';
import { CategoryBannerComponent } from './components/home/category-banner/category-banner.component';
import { NextDirective } from './directives/next.directive';
import { PreviousDirective } from './directives/previous.directive';

@NgModule({
  declarations: [AppComponent, HomeComponent, CategoryBannerComponent, NextDirective, PreviousDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
