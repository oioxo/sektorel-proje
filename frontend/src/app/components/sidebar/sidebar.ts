import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  rol: string = 'operator'; // Başlangıç değeri

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // DataService'teki rolü canlı izle (Abone ol)
    this.dataService.currentRol.subscribe(yeniRol => {
      this.rol = yeniRol;
      console.log("Güncel Kullanıcı Rolü:", this.rol);
    });
  }
}