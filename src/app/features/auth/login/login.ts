import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth} from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'], 
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  constructor(private auth: Auth, private router: Router) {}

  async onSubmit() {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.login(this.username(), this.password());
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error.set(e.message || 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}