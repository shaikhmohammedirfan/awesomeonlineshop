import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  categories: any = [];
  constructor(private fireService: FirebaseService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.fireService.loadAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
