import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // *ngIf için şart
import { DataService } from '../../services/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule], // CommonModule ekledik
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {
  rol: string = 'operator';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Servisteki rolü dinle
    this.dataService.currentRol.subscribe(res => {
      this.rol = res;
    });
  }
}