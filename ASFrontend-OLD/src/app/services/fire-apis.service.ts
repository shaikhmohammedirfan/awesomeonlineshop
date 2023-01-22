import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
} from '@angular/fire/auth';
import { FireErrorsService } from './fire-errors.service';

@Injectable({
  providedIn: 'root',
})
export class FireAPIsService {
  constructor(private auth: Auth, private errMsgsService: FireErrorsService) {}

  async googleSignUp(): Promise<any> {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, googleAuthProvider).catch((err) => {
      return this.errMsgsService.handleError(err);
    });
  }
}
