import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data'; // Veri servisimizi bağladık

@Component({
  selector: 'app-olcum-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './olcum-panel.html',
  styleUrl: './olcum-panel.css'
})
export class OlcumPanelComponent {
  mesaj: string = "";
  sehirler = ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Erzurum'];
  
  urunler = [
    { id: 1, ad: 'Kırmızı Et' },
    { id: 2, ad: 'Tavuk' },
    { id: 3, ad: 'Süt ve Süt Ürünleri' },
    { id: 4, ad: 'Tahıl' }
  ];

  constructor(private dataService: DataService) {}

  kurulumTalebiOlustur(depoAd: string, sehir: string, urunId: string, adres: string) {
    if (!depoAd || !sehir || !urunId || !adres) {
      this.mesaj = "DİKKAT: Lütfen adres dahil tüm alanları eksiksiz doldurunuz!";
      return;
    }

    // Seçilen ürünün adını bulalım
    const secilenUrun = this.urunler.find(u => u.id === Number(urunId));

    // Yeni depo nesnesini hazırlayalım
    const yeniDepo = {
      id: Math.floor(Math.random() * 1000), // Geçici ID
      ad: depoAd,
      sehir: sehir,
      urun: secilenUrun?.ad,
      urunId: Number(urunId),
      sicaklik: 0, // Kurulum beklediği için 0 veya 'N/A'
      durum: 'KURULUM BEKLİYOR',
      adres: adres,
      kritikSureSayaci: 0,
      bildirimGonderildi: false
    };

    // Servis üzerinden merkezi listeye ekle
    this.dataService.depoEkle(yeniDepo);

    // Başarı mesajı (Senin istediğin gerçekçi ton)
    this.mesaj = `Tebrikler! "${depoAd}" kaydı alındı. Teknik ekibimiz sensör kurulumu için en kısa sürede ${sehir} şubemiz üzerinden sizinle iletişime geçecektir.`;
    
    console.log("Sistem Kurulum Talebi:", yeniDepo);
  }
}