import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  rol: string = 'operator';
  kullaniciAdi: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.currentRol.subscribe(yeniRol => {
      this.rol = yeniRol;
    });
    this.dataService.currentKullanici.subscribe(ad => {
      this.kullaniciAdi = ad;
    });
  }

  cikisYap() {
    this.dataService.cikisYap();
    this.router.navigate(['/login']);
  }
}