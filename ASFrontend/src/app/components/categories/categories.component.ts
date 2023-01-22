import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiredbService } from 'src/app/services/firedb.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  constructor(private fireService: FiredbService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
  async getAllCategories(): Promise<any> {
    this.fireService.loadAllCategories().subscribe(async (data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
}
