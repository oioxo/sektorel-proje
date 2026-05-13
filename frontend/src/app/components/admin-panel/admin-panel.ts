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
  // Form verilerini tutacak nesne
  yeniDepo = {
    ad: '',
    sehir: '',
    urunId: null,
    urun: '', // ID'ye göre otomatik dolacak
    adres: '',
    sicaklik: 18.0, // Başlangıç simülasyon değeri
    durum: 'NORMAL',
    kritikSureSayaci: 0,
    bildirimGonderildi: false
  };

  // Ürün kategorileri (data.ts ile uyumlu)
  urunKategorileri = [
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ];

  constructor(private dataService: DataService) {}

  // --- 1. FONKSİYON: Yeni Depoyu Veritabanına Kaydet ---
  depoyuKaydet() {
    // Seçilen ürün ID'sine göre ürün adını bulalım
    const secilenUrun = this.urunKategorileri.find(u => u.id == this.yeniDepo.urunId);
    if (secilenUrun) {
      this.yeniDepo.urun = secilenUrun.ad;
    }

    // DataService üzerindeki POST isteğini tetikle
    this.dataService.depoEkle(this.yeniDepo).subscribe({
      next: (res) => {
        alert(`Tebrikler! "${this.yeniDepo.ad}" kaydı alındı ve PostgreSQL'e işlendi.`);
        this.formuSifirla();
      },
      error: (err) => {
        console.error("Depo kaydedilirken hata oluştu:", err);
        alert("Hata! Backend (8044) çalışıyor mu ve Postgres bağlantısı tamam mı?");
      }
    });
  }

  // --- 2. FONKSİYON: Mevcut Limitleri Güncelle ---
  limitleriGuncelle() {
    this.dataService.limitGuncelle(this.urunKategorileri);
    alert("Sistem kısıtlamaları (Frontend seviyesinde) güncellendi!");
  }

  formuSifirla() {
    this.yeniDepo = {
      ad: '',
      sehir: '',
      urunId: null,
      urun: '',
      adres: '',
      sicaklik: 18.0,
      durum: 'NORMAL',
      kritikSureSayaci: 0,
      bildirimGonderildi: false
    };
  }
}