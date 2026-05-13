import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; 
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
  
  constructor(public router: Router) {} 
}