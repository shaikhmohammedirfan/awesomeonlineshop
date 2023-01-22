import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  @Input() error: any;
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  OnCloseClick() {
    this.close.emit();
  }
}
