import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // HttpClient ekledik
import { DataService } from '../../services/data';

@Component({
  selector: 'app-depolarim',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // HttpClientModule ekledik
  templateUrl: './depolarim.html',
  styleUrl: './depolarim.css'
})
export class DepolarimComponent implements OnInit, OnDestroy {
  interval: any;
  depoListesi: any[] = [];
  limitler: any[] = [];
  bildirimLimitSuresi = 10;

  constructor(
    private dataService: DataService,
    private http: HttpClient // Http enjekte edildi
  ) {}

  ngOnInit() {
    this.dataService.currentLimitler.subscribe(res => this.limitler = res);
    this.dataService.currentDepolar.subscribe(res => this.depoListesi = res);

    this.interval = setInterval(() => {
      this.depoListesi.forEach(depo => {
        const degisim = (Math.random() - 0.5);
        depo.sicaklik = parseFloat((depo.sicaklik + degisim).toFixed(1));

        const ilgiliLimit = this.limitler.find(l => l.id === depo.urunId);
        
        if (ilgiliLimit) {
          depo.maxEshik = ilgiliLimit.max;

          if (depo.sicaklik > ilgiliLimit.max) {
            depo.durum = 'KRİTİK';
            depo.kritikSureSayaci += 3;

            if (depo.kritikSureSayaci >= this.bildirimLimitSuresi && !depo.bildirimGonderildi) {
              // ARTIK GERÇEK MAİLİ TETİKLİYORUZ
              this.gercekMailGonder(depo); 
            }
          } else {
            depo.durum = 'NORMAL';
            depo.kritikSureSayaci = 0;
            depo.bildirimGonderildi = false;
          }
        }
      });
    }, 3000);
  }

  gercekMailGonder(depo: any) {
    const mailVerisi = {
      to: "arda.ozkan@example.com", // Burayı kendi mailinle değiştir
      subject: `⚠️ KRİTİK UYARI: ${depo.ad}`,
      body: `${depo.ad} deposunda sıcaklık ${depo.sicaklik}°C seviyesine ulaştı! Limit: ${depo.maxEshik}°C.`
    };

    // Backend'de yazdığımız mail endpoint'ine post atıyoruz
    this.http.post('http://localhost:8080/api/notifications/send-email', mailVerisi)
      .subscribe({
        next: (res) => {
          console.log("✅ Mail başarıyla gönderildi!");
          depo.bildirimGonderildi = true; // Sadece başarılıysa yeşil yazı çıksın
        },
        error: (err) => {
          console.error("❌ Mail backend'e ulaştı ama SMTP hata verdi:", err);
        }
      });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}