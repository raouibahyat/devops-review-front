import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent }, // route login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // redirection par défaut
  { path: '**', redirectTo: 'auth/login' } // toutes les autres URL redirigées vers login
];