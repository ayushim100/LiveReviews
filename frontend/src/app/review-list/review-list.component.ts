import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  tableHeaders = ["Id","Title","Content","Date-time","Edit","Delete"];
  reviews: any[] = [];

  constructor(
    private apiService: ApiService
  ){

  }

  ngOnInit() {
    this.apiService.getReviews().subscribe((res)=>{
      this.reviews = res;
    })
    this.apiService.loadReviews();

  }

  deleteReview(id: any) {

  }
}
