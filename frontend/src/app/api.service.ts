import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
  
@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    
    private reviewsSubject = new BehaviorSubject<any[]>([]);
    private socket: Socket;

    constructor(private http: HttpClient) {
        this.socket = io('http://localhost:3001');
        this.socket.on('reviewAdded', (data: any) => {
            this.reviewsSubject.next(data);
        });
        this.socket.on('review', (data: any) => {
            this.reviewsSubject.next(data);
        })
    } 

    getReviews(): Observable<any[]> {
        return this.reviewsSubject.asObservable();
    }
    
    loadReviews(): void {
        this.http.get<any[]>('http://localhost:3001/').subscribe(reviews => {
          this.reviewsSubject.next(reviews);
        });
    }

    getReviewById(id: any): Observable<any> {
        return this.http.get<any>('http://localhost:3001/'+id);
    }

    addReview(data: any) {

    }

    updateReview(id: any, data: any) {
        this.http.put<any[]>('http://localhost:3001/'+id, data).subscribe(res => {
            console.log(res);
        })
    }

    deleteReview(id: any): void {
        this.http.delete<any[]>('http://localhost:3001/'+id).subscribe(res => {
            console.log(res);
        });
    }
}