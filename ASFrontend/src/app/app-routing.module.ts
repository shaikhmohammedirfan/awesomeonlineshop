import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AwesomeOnlineShopHome' },
  {
    path: 'categories',
    loadChildren: () =>
      import('./components/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },

  {
    path: 'brands',
    loadChildren: () =>
      import('./components/brands/brands.module').then((m) => m.BrandsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'signinsignup',
    loadChildren: () =>
      import('./components/signinsignup/signinsignup.module').then(
        (m) => m.SigninsignupModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
