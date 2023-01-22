import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      title: 'Shop By Category',
      icon: 'list',
      path: '/categories',
    },
    {
      title: 'Shop By Brand',
      icon: 'list',
      path: '/brands',
    },
    {
      title: 'My Account',
      icon: 'person',
      path: '/myaccount',
    },
    {
      title: 'My Cart',
      icon: 'cart',
      path: '/mycart',
    },
    {
      title: 'Sign-in',
      icon: 'person',
      path: '/userlogin',
    },
    {
      title: 'New Account',
      icon: 'person-add',
      path: '/sign-up-options',
    },
  ];

  title;
  constructor() {}

  ngOnInit() {}
  setTitle(pagetitle) {
    this.title = pagetitle;
  }
}
