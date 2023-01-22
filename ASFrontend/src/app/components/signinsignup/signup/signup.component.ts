import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiredbService } from 'src/app/services/firedb.service';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  error: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googleservice: GoogleService,
    private firedb: FiredbService
  ) {}

  ngOnInit(): void {}

  closeForm(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
  frmSubmitting(rcvdFormvalue: any): void {
    console.log('Rcvd from email form', rcvdFormvalue);
  }

  googleSignUp() {
    try {
      this.googleservice.getGoogleAccount().then((loginsuccess: any) => {
        if (loginsuccess) {
          this.firedb
            .getCartKeyFromUserMaster(loginsuccess.user.email)
            .then((cartkeyfound: any) => {
              // if user exist in usermaster table
              if (cartkeyfound) {
                // copy userkey to local storage (browser/capacitor)
                this.copyKeyToLocalStorage(cartkeyfound);
              } else {
                // If user does not exist in usermaster table create a new user
                // Insert user input details rcvd from form to table
                this.addNewUser(loginsuccess);
                // Goto usermaster form with google user login info (loginsuccess variable) to get other user details
                this.router.navigate(
                  ['/manage-userprofile'],
                  loginsuccess.user
                );
              }
            });
        } else {
          // if loginsuccess is not successfull
          this.error = 'Error login to google account! Try again..';
        }
      });
    } catch {
      this.error = 'Some error has occured';
    }
  }
  copyKeyToLocalStorage(cartkey: string): void {
    // copy userkey to local storage (browser/capacitor)
    this.firedb.setLocalKey(cartkey).then(async (success: any) => {
      // after copying successfull, navigate to user detail info
      await this.router.navigate(['/myaccount']);
    });
  }

  addNewUser(loginuserdata: any) {
    // Insert new record to usermaster table
    this.firedb.addToUserMaster(loginuserdata).then((newuserinfo) => {
      console.log(newuserinfo);
    });
    // Insert new record to userdeliver table
    this.firedb.addToUserDelivery(loginuserdata).then((newuserinfo) => {
      console.log(newuserinfo);
    });
    // Insert new record to useremail table
    this.firedb.addToUserEmail(loginuserdata).then((newuserinfo) => {
      console.log(newuserinfo);
    });
    // Insert new record to usermobile table
    this.firedb.addToUserMobile(loginuserdata).then((newuserinfo) => {
      console.log(newuserinfo);
    });
  }
}
