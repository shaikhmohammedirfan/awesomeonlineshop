import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
} from '@angular/fire/auth';

@Injectable({
  // use 'any' in place of 'root' to activate only when specific component loaded
  providedIn: 'any',
})
export class GoogleService {
  constructor(private auth: Auth) {}
  async getGoogleAccount(): Promise<any> {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, googleAuthProvider).catch((err) => {
      // return this.errMsgsService.handleError(err);
      return err;
    });
  }
}
