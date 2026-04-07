// src/app/core/services/auth.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  async login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        resolve();
      } else {
        reject(new Error('Nom d’utilisateur ou mot de passe incorrect'));
      }
    });
  }
}