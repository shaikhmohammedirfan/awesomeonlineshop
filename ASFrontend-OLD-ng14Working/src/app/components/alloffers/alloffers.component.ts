import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SnackNotifyService } from 'src/app/services/snack-notify.service';

@Component({
  selector: 'app-alloffers',
  templateUrl: './alloffers.component.html',
  styleUrls: ['./alloffers.component.scss'],
})
export class AlloffersComponent implements OnInit {
  products: any = [];
  product: any;
  constructor(
    private fireService: FirebaseService,
    private router: Router,
    private snackNotify: SnackNotifyService
  ) {}

  ngOnInit(): void {
    this.getAllOfferedProds();
  }
  async getAllOfferedProds() {
    const querySnapshot = await this.fireService.loadProductsOnOffer();
    querySnapshot.forEach((doc: any) => {
      this.products.push(doc.data());
    });
    // console.log(this.products);
  }

  addToCart(ev: any, product: any) {
    ev.stopPropagation();

    // check local cart id present
    const checkLocakKey = this.fireService.getLocalKey().then((keyfound) => {
      if (!keyfound) {
        this.snackNotify.showNotification(
          'Required information not found! Please login to your account',
          'Ok',
          'error'
        );

        this.router.navigate(['/userlogin']);
      } else {
        this.fireService.addToCart(product).then(async (success: any) => {
          if (success) await this.router.navigate(['/categories']);
        });
      }
    });

    // get cartId from local storage
    // const mylocalkey = this.fireService.loadLocalKey().then((result) => {
    //   if (!result) {

    //     this.router.navigate(['/userlogin']);
    //   } else {
    //     this.fireService.addToCart(product, result);
    //   }
    // });
  }
}
