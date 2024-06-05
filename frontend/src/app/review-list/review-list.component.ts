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
      this.mergeReviews(res);
    })
    this.apiService.loadReviews();

  }

  mergeReviews(newReviews: any[]): void {
    console.log(newReviews)
    const reviewMap = new Map(this.reviews.map(review => [review._id, review]));
    newReviews.forEach(review => reviewMap.set(review._id, review));
    this.reviews = Array.from(reviewMap.values());
    this.reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  deleteReview(id: any) {

  }
}
