import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksService } from '../../services/google-books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleBooksService: GoogleBooksService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.loadBookDetails(bookId);
    }
  }

  loadBookDetails(bookId: string) {
    this.googleBooksService.getBookById(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading book details:', error);
        this.loading = false;
      }
    });
  }

  getBookImage(): string {
    if (!this.book) return '';
    return this.book.volumeInfo.imageLinks?.thumbnail || 
           this.book.volumeInfo.imageLinks?.smallThumbnail || 
           'assets/no-image.png';
  }

  onImageError(event: any) {
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxzdmcgaWQ9ImJvb2siIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjREREIiBzdHJva2Utd2lkdGg9IjIiIHg9IjEyNSIgeT0iMTc1IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPgogIDxwYXRoIGQ9Ik00IDNoMTN2MS43YzAgLjMuMi42LjUuNmg2djE1SDRWM1oiLz4KICA8cGF0aCBkPSJNMTcgM2gzYTIgMiAwIDAgMSAyIDJ2MTRIMTF2MUgxVjNhMiAyIDAgMCAxIDItMmgzWiIvPgo8L3N2Zz4KPC9zdmc+Cg==';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
