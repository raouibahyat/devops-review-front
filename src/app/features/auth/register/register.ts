import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  loading = signal(false);
  error = signal('');
  success = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(private router: Router) {}

  async onSubmit() {
    // Validation des champs
    if (!this.username() || !this.email() || !this.password() || !this.confirmPassword()) {
      this.error.set('Tous les champs sont requis.');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email())) {
      this.error.set('Veuillez entrer une adresse email valide.');
      return;
    }

    // Validation mot de passe (min 6 caractères)
    if (this.password().length < 6) {
      this.error.set('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    // Validation confirmation mot de passe
    if (this.password() !== this.confirmPassword()) {
      this.error.set('Les mots de passe ne correspondent pas.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    // Simuler un appel API (à remplacer par ton backend Spring Boot)
    setTimeout(() => {
      // Vérifier si l'utilisateur existe déjà
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find((u: any) => u.username === this.username())) {
        this.error.set('Ce nom d\'utilisateur est déjà pris.');
        this.loading.set(false);
        return;
      }
      
      if (users.find((u: any) => u.email === this.email())) {
        this.error.set('Cet email est déjà utilisé.');
        this.loading.set(false);
        return;
      }

      // Sauvegarder le nouvel utilisateur
      users.push({
        username: this.username(),
        email: this.email(),
        password: this.password(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('users', JSON.stringify(users));

      // Afficher le succès
      this.success.set(true);
      this.loading.set(false);

      // Rediriger vers login après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    }, 1000);
  }

  clearError() {
    this.error.set('');
  }
}