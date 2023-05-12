import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ASFrontend';
  search: any;

  constructor() {
    // To user javascript DOM element commands in typescript
    const imgElement = document.getElementsByClassName('.brandlogo');
    console.log(imgElement);
  }
  Login() {
    document.getElementById('Login')?.scrollIntoView({ behavior: 'smooth' });
  }

  // For smooth apperance of page
  // MyCart() {
  //   document.getElementById('MYCart')?.scrollIntoView({ behavior: 'smooth' });
  // }
  MyWishList() {}
}
