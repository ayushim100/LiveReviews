import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviewForm: FormGroup = new FormGroup("");
  isEditMode: boolean = false;
  reviewId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      title: [''],
      content: [''],
      date: ['']
    });
  }
  
  ngOnInit(): void {
    this.reviewId = this.route.snapshot.paramMap.get('id');
    if (this.reviewId) {
      this.isEditMode = true;
      
      this.apiService.getReviewById(this.reviewId).subscribe(review => {
        console.log(review);
        this.reviewForm.patchValue(review);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.reviewId) {
      this.apiService.updateReview(this.reviewId, this.reviewForm.value);
    } else {
      this.apiService.addReview(this.reviewForm.value);
    }
    this.router.navigate(['/']);
  }

  onReset(): void {
    this.reviewForm.reset();
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onDelete(): void {
    if (this.reviewId) {
      this.apiService.deleteReview(this.reviewId);
      this.router.navigate(['/']);
    }
  }
}
