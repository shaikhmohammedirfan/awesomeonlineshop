import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teststandalone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teststandalone.component.html',
  styleUrls: ['./teststandalone.component.scss']
})
export class TeststandaloneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
