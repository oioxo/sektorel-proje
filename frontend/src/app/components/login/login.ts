import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data'; // Servisi bağladık

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  constructor(private router: Router, private dataService: DataService) {}

  girisYap(rol: string) {
    // Rolü serviste güncelle
    this.dataService.rolGuncelle(rol);
    
    console.log(rol + " yetkisiyle sisteme giriş yapıldı.");
    this.router.navigate(['/depolarim']);
  }
}