import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
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

  async phoneSignIn(): Promise<any> {
    // const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
    const provider = new PhoneAuthProvider(this.auth);
    // const verificationId = await provider.verifyPhoneNumber(
    //   '+16505550101',
    //   applicationVerifier
    // );
    // Obtain the verificationCode from the user.
    // const phoneCredential = PhoneAuthProvider.credential(
    //   verificationId,
    //   verificationId
    // );
    // const userCredential = await signInWithCredential(
    //   this.auth,
    //   phoneCredential
    // );
  }
}
