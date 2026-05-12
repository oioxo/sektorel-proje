import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-depolarim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depolarim.html',
  styleUrl: './depolarim.css'
})
export class DepolarimComponent implements OnInit, OnDestroy {
  interval: any;
  depoListesi: any[] = [];
  limitler: any[] = [];
  bildirimLimitSuresi = 10;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Servisten canlı verileri al
    this.dataService.currentLimitler.subscribe(res => this.limitler = res);
    this.dataService.currentDepolar.subscribe(res => this.depoListesi = res);

    this.interval = setInterval(() => {
      this.depoListesi.forEach(depo => {
        // Sıcaklık değişimi simülasyonu
        const degisim = (Math.random() - 0.5);
        depo.sicaklik = parseFloat((depo.sicaklik + degisim).toFixed(1));

        // Admin'den gelen güncel limiti bul (max değerine bakıyoruz)
        const ilgiliLimit = this.limitler.find(l => l.id === depo.urunId);
        
        if (ilgiliLimit) {
          // HTML'de yazdığın maxEshik değişkenini servisteki 'max' ile besle
          depo.maxEshik = ilgiliLimit.max;

          if (depo.sicaklik > ilgiliLimit.max) {
            depo.durum = 'KRİTİK';
            depo.kritikSureSayaci += 3;

            if (depo.kritikSureSayaci >= this.bildirimLimitSuresi && !depo.bildirimGonderildi) {
              this.mailGonderSimulasyonu(depo);
              depo.bildirimGonderildi = true;
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

  mailGonderSimulasyonu(depo: any) {
    console.log(`%c 📧 BİLDİRİM: ${depo.ad} sıcaklığı kritik! Kullanıcıya mail iletildi.`, 'background: #0f172a; color: #38bdf8; padding: 5px;');
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}