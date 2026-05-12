import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanelComponent {
  // data.ts içindeki isimlerle (min, max) birebir eşitledik
  urunKategorileri = [
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ];

  constructor(private dataService: DataService) {}

  kaydet() {
    // Servisteki limitGuncelle fonksiyonuna bu listeyi gönderiyoruz
    this.dataService.limitGuncelle(this.urunKategorileri);
    alert("Sistem kısıtlamaları başarıyla güncellendi!");
  }
}