import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { BrandCardComponent } from './brand-card/brand-card.component';


@NgModule({
  declarations: [
    BrandsComponent,
    BrandCardComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule
  ]
})
export class BrandsModule { }
