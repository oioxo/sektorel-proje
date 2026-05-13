import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-olcum-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './olcum-panel.html',
  styleUrl: './olcum-panel.css'
})
export class OlcumPanelComponent {
  mesaj: string = "";
  
  // Form verileri
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
    // 1. Validasyon Kontrolü
    if (!this.yeniDepo.ad || !this.yeniDepo.sehir || !this.yeniDepo.urunId || !this.yeniDepo.adres) {
      this.mesaj = "⚠️ DİKKAT: Lütfen tüm alanları eksiksiz doldurunuz!";
      return;
    }

    const secilenUrun = this.urunler.find(u => u.id === Number(this.yeniDepo.urunId));

    // Backend'in beklediği ham veri (çeviri data.ts içinde yapılacak)
    const kaydedilecekVeri = {
      ad: this.yeniDepo.ad,
      sehir: this.yeniDepo.sehir,
      urun: secilenUrun?.ad,
      urunId: Number(this.yeniDepo.urunId),
      sicaklik: 18.5, // Varsayılan başlangıç sıcaklığı
      durum: 'NORMAL',
      adres: this.yeniDepo.adres
    };

    // 2. KRİTİK NOKTA: .subscribe() ekleyerek isteği gerçekten gönderiyoruz
    this.dataService.depoEkle(kaydedilecekVeri).subscribe({
      next: (res) => {
        // Kayıt başarılıysa mesajı göster ve formu temizle
        this.mesaj = `🚀 Tebrikler Arda! "${this.yeniDepo.ad}" kaydı başarıyla alındı. Haritayı kontrol edebilirsin.`;
        console.log("Veritabanına kayıt başarıyla işlendi:", res);
        
        // Formu temizle
        this.yeniDepo = { ad: '', sehir: '', urunId: '', adres: '' };
      },
      error: (err) => {
        // Hata durumunda logla
        console.error("Depo eklenirken hata oluştu:", err);
        this.mesaj = "❌ Hata: Kayıt PostgreSQL'e iletilemedi. Backend bağlantısını kontrol et!";
      }
    });
  }
}