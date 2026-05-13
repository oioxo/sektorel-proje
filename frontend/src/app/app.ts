import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Router ekledik
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // 'public' olması şart, yoksa HTML'deki *ngIf router'ı bulamaz!
  constructor(public router: Router) {} 
}