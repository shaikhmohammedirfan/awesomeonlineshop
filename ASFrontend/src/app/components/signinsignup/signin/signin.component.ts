import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FiredbService } from 'src/app/services/firedb.service';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googleservice: GoogleService,
    private firedb: FiredbService
  ) {}
  error: any;
  // To display user friendly error messages from custom error Service
  // errMsgs = this.ferrorService.errorMsgs;

  ngOnInit(): void {}

  frmSubmitting(rcvdFormvalue: any): void {
    console.log('Rcvd from email form', rcvdFormvalue);
  }

  closeForm(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  googleSignIn() {
    try {
      this.googleservice.getGoogleAccount().then((loginsuccess: any) => {
        if (loginsuccess) {
          this.firedb
            .getCartKeyFromUserMaster(loginsuccess.user.email)
            .then((cartkeyfound: any) => {
              // console.log('CARTLEU', cartkeyfound);
              if (cartkeyfound) {
                this.firedb.setLocalKey(cartkeyfound).then(async (success) => {
                  if (success) {
                    await this.router.navigate(['/']);
                  } else {
                    this.error = 'Signin Unsuccessfull...Please try again!';
                  }
                });
              } else {
                //user not found in database
                this.error = 'User not found! Please create new account';
              }
            });
          // console.log(loginsuccess.user);
        } else {
          // if loginsuccess is not successfull
          this.error = 'Error login to google account! Try again..';
        }
      });
    } catch {
      this.error = 'Some error has occured';
    }
  }
}
