import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { ReviewListComponent } from './review-list/review-list.component';

const routes: Routes = [
  {
    path: "",
    component: ReviewListComponent
  },
  {
    path: "new",
    data: {
      title: "New",
    },
    component: ReviewComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
