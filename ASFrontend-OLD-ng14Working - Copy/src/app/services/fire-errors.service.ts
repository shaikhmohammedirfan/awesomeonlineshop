import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackNotifyService } from './snack-notify.service';

@Injectable({
  providedIn: 'root',
})
export class FireErrorsService {
  // Defined a Custom error object with meaningfull error messages

  errorMsgs = {
    UNKNOWN: 'An unknown error has occured',
    TOKEN_EXPIRED: 'Token Expired. User must sign in again',
    USER_DISABLED: 'User account disabled',
    USER_NOT_FOUND: 'User has been deleted',
    INVALID_REFRESH_TOKEN: 'An Invalid Refresh Token is provided',
    INVALID_GRANT_TYPE: 'Grant type specified is invalid',
    MISSING_REFRESH_TOKEN: 'No Refresh Token Provided',
    EMAIL_EXISTS: 'This email address is already in use by another account',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later',
    EMAIL_NOT_FOUND: 'Email/User not found',
    INVALID_PASSWORD: 'Wrong Password',
    WEAK_PASSWORD: 'Password should be at least 6 characters',
    INVALID_ID_TOKEN:
      'The users credential is no longer valid. The user must sign in again',
    ERR_CONNECTION_REFUSED: 'Internet connection issue!',
  };
  constructor(private snackNotify: SnackNotifyService) {}
  handleError(err: HttpErrorResponse): any {
    if (!err.error || !err.error.error) {
      // return 'UNKNOWN';
      // show material snackbar in place of above error message
      return this.snackNotify.showNotification(this.errorMsgs, 'OK', 'error');
    } else {
      return err.error.error.message;
    }
  }
}
