import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);
  loginSuccess = signal(false);
  rememberMe = false;

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit() {
    if (!this.username() || !this.password()) {
      this.error.set('Veuillez remplir tous les champs.');
      return;
    }
    
    this.loading.set(true);
    this.error.set('');
    
    try {
      await this.auth.login(this.username(), this.password());
      this.loginSuccess.set(true);
      
      // Redirection après 1.5 secondes
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    } catch (e: any) {
      this.error.set(e.message || 'Identifiants incorrects.');
    } finally {
      this.loading.set(false);
    }
  }

  clearError() {
    this.error.set('');
  }
}