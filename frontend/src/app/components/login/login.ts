import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  operatorAdi: string = '';
  hata: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  yoneticiGiris() {
    this.dataService.rolGuncelle('admin');
    this.dataService.kullaniciGuncelle('');
    this.router.navigate(['/depolarim']);
  }

  operatorGiris() {
    if (!this.operatorAdi.trim()) {
      this.hata = 'Lütfen adınızı girin.';
      return;
    }
    this.hata = '';
    this.dataService.rolGuncelle('user');
    this.dataService.kullaniciGuncelle(this.operatorAdi.trim());
    this.router.navigate(['/depolarim']);
  }
}