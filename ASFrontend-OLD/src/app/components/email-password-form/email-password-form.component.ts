import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailPassword } from 'src/app/interfaces/email-password';

@Component({
  selector: 'app-email-password-form',
  templateUrl: './email-password-form.component.html',
  styleUrls: ['./email-password-form.component.scss'],
})
export class EmailPasswordFormComponent implements OnInit {
  @Output() submitEvent: EventEmitter<EmailPassword> =
    new EventEmitter<EmailPassword>();

  frmEmailPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.frmEmailPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
    });
  }

  ngOnInit(): void {}

  // Define and Initialize form

  onSubmit(formValue: any): void {
    console.log(formValue);
    // send formValue to calling component using Output
    this.submitEvent.emit(formValue);
  }
}
