import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // KRİTİK: ngModel için şart
import { DataService } from '../../services/data';

@Component({
  selector: 'app-olcum-panel',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule'ü buraya ekledik
  templateUrl: './olcum-panel.html',
  styleUrl: './olcum-panel.css'
})
export class OlcumPanelComponent {
  mesaj: string = "";
  
  // Form verilerini tek bir nesne içinde topluyoruz (HTML ile tam uyumlu)
  yeniDepo: any = {
    ad: '',
    sehir: '',
    urunId: '',
    adres: ''
  };

  sehirler: string[] = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];
  
  urunler = [
    { id: 1, ad: 'Kırmızı Et' },
    { id: 2, ad: 'Tavuk' },
    { id: 3, ad: 'Süt ve Süt Ürünleri' },
    { id: 4, ad: 'Tahıl' }
  ];

  constructor(private dataService: DataService) {}

  kurulumTalebiOlustur() {
    // Nesne üzerinden kontrol yapıyoruz
    if (!this.yeniDepo.ad || !this.yeniDepo.sehir || !this.yeniDepo.urunId || !this.yeniDepo.adres) {
      this.mesaj = "DİKKAT: Lütfen tüm alanları eksiksiz doldurunuz!";
      return;
    }

    const secilenUrun = this.urunler.find(u => u.id === Number(this.yeniDepo.urunId));

    const kaydedilecekVeri = {
      id: Math.floor(Math.random() * 1000),
      ad: this.yeniDepo.ad,
      sehir: this.yeniDepo.sehir,
      urun: secilenUrun?.ad,
      urunId: Number(this.yeniDepo.urunId),
      sicaklik: 0,
      durum: 'KURULUM BEKLİYOR',
      adres: this.yeniDepo.adres,
      kritikSureSayaci: 0,
      bildirimGonderildi: false
    };

    // Servis üzerinden gönder
    this.dataService.depoEkle(kaydedilecekVeri);

    this.mesaj = `Tebrikler! "${this.yeniDepo.ad}" kaydı alındı. Teknik ekibimiz sensör kurulumu için en kısa sürede ${this.yeniDepo.sehir} şubemiz üzerinden sizinle iletişime geçecektir.`;
    
    // Formu temizle (Opsiyonel)
    this.yeniDepo = { ad: '', sehir: '', urunId: '', adres: '' };
  }
}