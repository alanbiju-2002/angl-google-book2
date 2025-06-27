import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleBooksResponse, Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string = 'javascript', startIndex: number = 0, maxResults: number = 40): Observable<GoogleBooksResponse> {
    const params = {
      q: query,
      startIndex: startIndex.toString(),
      maxResults: maxResults.toString()
    };
    
    return this.http.get<GoogleBooksResponse>(this.API_URL, { params });
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }
}
