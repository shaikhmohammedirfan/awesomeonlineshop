import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireAPIsService } from '../../services/fire-apis.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sign-up-options',
  templateUrl: './sign-up-options.component.html',
  styleUrls: ['./sign-up-options.component.scss'],
})
export class SignUpOptionsComponent implements OnInit {
  popupmessage: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fAuthservice: FireAPIsService,
    private fireservice: FirebaseService
  ) {}

  ngOnInit(): void {}

  closeForm(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
  googleSignUp() {
    try {
      // try login to user's google account
      this.fAuthservice.googleSignUp().then((loginsuccess) => {
        // if login to google account succeess
        if (loginsuccess) {
          console.log('success user infor', loginsuccess);
          // Get user key from usermaster table (created manually to store user details)
          this.fireservice
            .getCartKeyFromUserMaster(loginsuccess.user.email)
            .then((cartkeyfound) => {
              // if user exist in usermaster table
              if (cartkeyfound) {
                // copy userkey to local storage (browser/capacitor)
                this.fireservice
                  .setLocalKey(cartkeyfound)
                  .then(async (success) => {
                    // after copying successfull, navigate to user detail info
                    if (success) {
                      // this.popupmessage =
                      //   'Please review and complete your user profile!';
                      await this.router.navigate(['/myaccount']);
                    }
                  });
                // If user does not exist in usermaster table create a new user
              } else {
                // Insert user input details rcvd from form to table
                this.fireservice
                  .addToUserMaster(loginsuccess)
                  .then((newuserinfo) => {
                    console.log(newuserinfo);
                  });
                this.fireservice
                  .addToUserDelivery(loginsuccess)
                  .then((newuserinfo) => {
                    console.log(newuserinfo);
                  });

                this.fireservice
                  .addToUserCurrEmail(loginsuccess)
                  .then((newuserinfo) => {
                    console.log(newuserinfo);
                  });
                this.fireservice
                  .addToUserCurrMobile(loginsuccess)
                  .then((newuserinfo) => {
                    console.log(newuserinfo);
                  });

                this.popupmessage = 'Please review and complete user profile!';
                // Goto usermaster form with google user login info (loginsuccess variable) to get other user details
                this.router.navigate(
                  ['/manage-userprofile'],
                  loginsuccess.user
                );
              }
            });
        } else {
          this.popupmessage =
            'Login to google account unsuccessful! Try again...';
        }
      });
    } catch {
      console.log('Some error occured');
    }
  }
  frmSubmitting(rcvdFormvalue: any): void {
    console.log('Rcvd from email form', rcvdFormvalue);
  }
}
