import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Router eklendi
import { SidebarComponent } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common'; // NgIf için gerekli

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(public router: Router) {} // Router'ı dışarı açtık
}