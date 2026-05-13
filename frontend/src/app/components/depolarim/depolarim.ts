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
  tumDepolar: any[] = [];
  limitler: any[] = [];
  bildirimLimitSuresi = 10;
  seciliDepo: any = null;
  silmeOnay: any = null;
  rol: string = 'admin';
  kullaniciAdi: string = '';

  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.rol = this.dataService.getRol();
    this.kullaniciAdi = this.dataService.getGirisYapanKullanici();

    this.dataService.currentLimitler.subscribe(res => this.limitler = res);
    this.dataService.currentDepolar.subscribe(res => {
      this.tumDepolar = res;
      this.filtreUygula();
      this.esikleriDoldur();
    });

    this.interval = setInterval(() => {
      this.depoListesi.forEach(depo => {
        const degisim = (Math.random() - 0.5);
        depo.sicaklik = parseFloat((depo.sicaklik + degisim).toFixed(1));

        const maxLimit = depo.maxSicaklik ?? this.limitler.find(l => l.ad === depo.urun)?.max;

        if (maxLimit != null) {
          depo.maxEshik = maxLimit;

          if (depo.sicaklik > maxLimit) {
            depo.durum = 'KRİTİK';

            if (depo.kritikSureSayaci < this.bildirimLimitSuresi) {
              depo.kritikSureSayaci += 3;
            }

            if (depo.kritikSureSayaci >= this.bildirimLimitSuresi && !depo.bildirimGonderildi) {
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

  filtreUygula() {
    if (this.rol === 'admin') {
      this.depoListesi = this.tumDepolar;
    } else {
      this.depoListesi = this.tumDepolar.filter(
        d => d.kullaniciAdi.toLowerCase() === this.kullaniciAdi.toLowerCase()
      );
    }
  }

  esikleriDoldur() {
    this.depoListesi.forEach(depo => {
      const maxLimit = depo.maxSicaklik ?? this.limitler.find(l => l.ad === depo.urun)?.max;
      if (maxLimit != null) {
        depo.maxEshik = maxLimit;
      }
    });
  }

  gercekMailGonder(depo: any) {
    const kullaniciMail = depo.kullaniciEmail;
    if (!kullaniciMail) {
      depo.bildirimGonderildi = true;
      return;
    }

    const mailVerisi = {
      to: kullaniciMail,
      subject: `⚠️ KRİTİK SICAKLIK UYARISI: ${depo.ad}`,
      body: `Dikkat! ${depo.ad} deposunda sıcaklık ${depo.sicaklik}°C seviyesine ulaştı. Belirlenen üst limit: ${depo.maxEshik}°C.`
    };

    this.http.post('http://localhost:8044/api/notifications/send-email', mailVerisi)
      .subscribe({
        next: () => {
          console.log(`✅ Mail gönderildi: ${kullaniciMail}`);
          depo.bildirimGonderildi = true;
        },
        error: (err) => {
          console.error("❌ Mail hatası:", err);
        }
      });
  }

  depoDetayAc(depo: any) {
    this.seciliDepo = depo;
  }

  depoDetayKapat() {
    this.seciliDepo = null;
  }

  depoSilOnay(depo: any, event: Event) {
    event.stopPropagation();
    this.silmeOnay = depo;
  }

  depoSilIptal() {
    this.silmeOnay = null;
  }

  depoSilOnayla() {
    if (!this.silmeOnay) return;
    const silinecekId = this.silmeOnay.id;
    const silinecekAd = this.silmeOnay.ad;

    this.dataService.depoSil(silinecekId).subscribe({
      next: () => {
        alert(`🗑️ "${silinecekAd}" deposu silindi!`);
        this.silmeOnay = null;
        this.seciliDepo = null;
      },
      error: () => {
        alert('❌ Depo silinemedi!');
        this.silmeOnay = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}