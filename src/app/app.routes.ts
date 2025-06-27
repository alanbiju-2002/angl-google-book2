import { Routes } from '@angular/router';
import { BookListComponent } from './component/book-list/book-list.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './component/dummy/dummy.component';

export const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'book', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
 
  {path:'login',component:LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component:DashboardComponent },
  {path:'dummy',component:DummyComponent},
   { path: '**', redirectTo: '/login' },
  
];
