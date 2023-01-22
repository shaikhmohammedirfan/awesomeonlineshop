import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MycartComponent } from './components/mycart/mycart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'brands',
    component: BrandsComponent,
  },
  {
    path: 'myaccount',
    component: MyaccountComponent,
  },
  {
    path: 'mycart',
    component: MycartComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
