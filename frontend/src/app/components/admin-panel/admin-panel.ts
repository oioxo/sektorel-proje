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
  // Form verilerini tutan nesne
  yeniDepo = {
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

  // Ürün kategorileri ve limitleri
  urunKategorileri = [
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ];

  constructor(private dataService: DataService) {}

  // --- 1. FONKSİYON: Yeni Depoyu Kaydet ---
  depoyuKaydet() {
    if (!this.yeniDepo.ad || !this.yeniDepo.sehir) {
      alert("Lütfen depo adı ve şehir bilgilerini eksiksiz girin.");
      return;
    }

    // Seçilen ürün bilgilerini nesneye ekleyelim
    const secilenUrun = this.urunKategorileri.find(u => u.id == this.yeniDepo.urunId);
    if (secilenUrun) {
      this.yeniDepo.urun = secilenUrun.ad;
    }

    // Veriyi servis üzerinden backend'e gönderiyoruz
    // Çeviri işlemleri data.ts içinde otomatik yapılacak
    this.dataService.depoEkle(this.yeniDepo).subscribe({
      next: (res) => {
        alert(`✅ Tebrikler Arda! "${this.yeniDepo.ad}" kaydı başarıyla oluşturuldu.`);
        this.formuSifirla();
      },
      error: (err) => {
        console.error("Kayıt sırasında teknik bir hata oluştu:", err);
        alert("❌ Hata! Kayıt işlemi yapılamadı. Backend bağlantısını kontrol et.");
      }
    });
  }

  // --- 2. FONKSİYON: Sıcaklık Limitlerini Güncelle ---
  limitleriGuncelle() {
    this.dataService.limitGuncelle(this.urunKategorileri);
    alert("🚀 Sistem sıcaklık limitleri başarıyla güncellendi!");
  }

  // Formu temizleyerek yeni girişe hazır hale getirir
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