import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-depolarim',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './depolarim.html',
  styleUrl: './depolarim.css'
})
export class DepolarimComponent implements OnInit, OnDestroy {
  interval: any;
  depoListesi: any[] = [];
  limitler: any[] = [];
  bildirimLimitSuresi = 10; // Saniye

  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.dataService.currentLimitler.subscribe(res => this.limitler = res);
    this.dataService.currentDepolar.subscribe(res => {
      this.depoListesi = res;
      // Ekrana gelir gelmez eşik değerlerini dolduruyoruz (Boş görünmesini engeller)
      this.esikleriDoldur();
    });

    this.interval = setInterval(() => {
      this.depoListesi.forEach(depo => {
        // Sıcaklık Simülasyonu
        const degisim = (Math.random() - 0.5);
        depo.sicaklik = parseFloat((depo.sicaklik + degisim).toFixed(1));

        // KRİTİK DEĞİŞİKLİK: Artık urunId yerine direkt Ürün ADINA (depo.urun) göre arıyoruz!
        const ilgiliLimit = this.limitler.find(l => l.ad === depo.urun);
        
        if (ilgiliLimit) {
          depo.maxEshik = ilgiliLimit.max;

          if (depo.sicaklik > ilgiliLimit.max) {
            depo.durum = 'KRİTİK';
            
            // Sayacın eksiye düşmemesi için limit dolunca artışı durdur
            if (depo.kritikSureSayaci < this.bildirimLimitSuresi) {
              depo.kritikSureSayaci += 3;
            }

            // Limit dolduysa ve henüz mail gitmediyse gönder
            if (depo.kritikSureSayaci >= this.bildirimLimitSuresi && !depo.bildirimGonderildi) {
              this.gercekMailGonder(depo);
            }
          } else {
            // Sıcaklık normale dönerse her şeyi sıfırla
            depo.durum = 'NORMAL';
            depo.kritikSureSayaci = 0;
            depo.bildirimGonderildi = false;
          }
        }
      });
    }, 3000);
  }

  // İlk açılışta kartların boş kalmaması için yardımcı fonksiyon
  esikleriDoldur() {
    this.depoListesi.forEach(depo => {
      const ilgiliLimit = this.limitler.find(l => l.ad === depo.urun);
      if (ilgiliLimit) {
        depo.maxEshik = ilgiliLimit.max;
      }
    });
  }

  gercekMailGonder(depo: any) {
    const mailVerisi = {
      to: "ozkanarda1536290@gmail.com", 
      subject: `⚠️ KRİTİK SICAKLIK UYARISI: ${depo.ad}`,
      body: `Dikkat! ${depo.ad} deposunda sıcaklık ${depo.sicaklik}°C seviyesine ulaştı. Belirlenen üst limit: ${depo.maxEshik}°C.`
    };

    this.http.post('http://localhost:8044/api/notifications/send-email', mailVerisi)
      .subscribe({
        next: (res) => {
          console.log("✅ Mail backend tetiklendi!");
          depo.bildirimGonderildi = true; 
        },
        error: (err) => {
          console.error("❌ Mail hatası! Backend'e ulaşılamadı veya SMTP ayarı yanlış:", err);
        }
      });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}