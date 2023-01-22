import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { MywishlistComponent } from './components/mywishlist/mywishlist.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { HomeComponent } from './home/home.component';
import { SignUpOptionsComponent } from './components/sign-up-options/sign-up-options.component';
import { UsermasterFormComponent } from './components/usermaster-form/usermaster-form.component';
import { ManageUserprofileComponent } from './components/manage-userprofile/manage-userprofile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'myaccount', component: MyaccountComponent },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'sign-up-options', component: SignUpOptionsComponent },
  { path: 'manage-userprofile', component: ManageUserprofileComponent },
  { path: 'usermaster-form', component: UsermasterFormComponent },
  { path: 'mycart', component: MycartComponent },
  { path: 'mywishlist', component: MywishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
