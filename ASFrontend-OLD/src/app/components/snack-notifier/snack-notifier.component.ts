import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-notifier',
  templateUrl: './snack-notifier.component.html',
  styleUrls: ['./snack-notifier.component.scss'],
})
export class SnackNotifierComponent implements OnInit {
  showNotification(arg0: any, arg1: string, arg2: string): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackNotifierComponent>
  ) {}

  ngOnInit(): void {}
}
