import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss'],
})
export class BrandCardComponent implements OnInit {
  brands: any = [];
  constructor(private fireService: FirebaseService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.fireService.loadAllBrands().subscribe((data) => {
      this.brands = data;
    });
  }
}
