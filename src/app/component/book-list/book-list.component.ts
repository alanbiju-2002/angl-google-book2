import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Fixed: Import from @angular/router, not express
import { Book } from '../../models/book.model';
import { GoogleBooksService } from '../../services/google-books.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added necessary imports for Angular functionality
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  searchQuery = 'programming';
  currentPage = 0;
  maxResults = 40;

  constructor(
    private googleBooksService: GoogleBooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchBooks();
  }

  searchBooks() {
    this.loading = true;
    this.currentPage = 0;
    const startIndex = this.currentPage * this.maxResults;

    this.googleBooksService.searchBooks(this.searchQuery, startIndex, this.maxResults)
      .subscribe({
        next: (response: { items: Book[] }) => { // Better typing
          this.books = response.items || [];
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching books:', error);
          this.books = [];
          this.loading = false;
        }
      });
  }

  nextPage() {
    this.currentPage++;
    this.loadPage();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage();
    }
  }

  private loadPage() {
    this.loading = true;
    const startIndex = this.currentPage * this.maxResults;

    this.googleBooksService.searchBooks(this.searchQuery, startIndex, this.maxResults)
      .subscribe({
        next: (response: { items: Book[] }) => { // Better typing
          this.books = response.items || [];
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching books:', error);
          this.loading = false;
        }
      });
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book', bookId]);
  }

  getBookImage(book: Book): string {
    return book.volumeInfo.imageLinks?.thumbnail || 
           book.volumeInfo.imageLinks?.smallThumbnail || 
           'assets/no-image.png';
  }

  onImageError(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDEyOCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik00MCA5NkwzMiA4OEw0MCA4MEw0OCA4OEw0MCA5NloiIGZpbGw9IiNEREQiLz4KPHN2ZyBpZD0iYm9vayIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNEREQiIHN0cm9rZS13aWR0aD0iMiIgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij4KICA8cGF0aCBkPSJNNCAzaDEzdjEuN2MwIC4zLjIuNi41LjZoNnYxNUg0VjNaIi8+CiAgPHBhdGggZD0iTTE3IDNoM2EyIDIgMCAwIDEgMiAydjE0SDExdjFIMVYzYTIgMiAwIDAgMSAyLTJoM1oiLz4KPC9zdmc+Cjwvc3ZnPgo=';
  }

  trackByFn(index: number, item: Book): string {
    return item.id;
  }
}