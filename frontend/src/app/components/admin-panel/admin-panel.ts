import { Component, OnInit } from '@angular/core';
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
export class AdminPanelComponent implements OnInit {

  tumDepolar: any[] = [];
  kullanicilar: any[] = [];
  seciliKullanici: any = null;
  kullaniciDepolar: any[] = [];
  seciliDepo: any = null;

  urunKategorileri = [
    { id: 1, ad: 'Kırmızı Et' },
    { id: 2, ad: 'Tavuk' },
    { id: 3, ad: 'Süt ve Süt Ürünleri' },
    { id: 4, ad: 'Tahıl' }
  ];

  duzenleForm = {
    urunTipi: '',
    minSicaklik: 0,
    maxSicaklik: 0
  };

  kullaniciBilgiForm = {
    kullaniciAdi: '',
    kullaniciEmail: '',
    kullaniciTelefon: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentDepolar.subscribe(depolar => {
      this.tumDepolar = depolar;
      this.kullanicilariGrupla();

      if (this.seciliKullanici) {
        this.kullaniciDepolar = this.tumDepolar.filter(
          d => d.kullaniciEmail === this.seciliKullanici.email
        );
      }
    });
  }

  kullanicilariGrupla() {
    const emailMap = new Map<string, any>();
    this.tumDepolar.forEach(depo => {
      const email = depo.kullaniciEmail;
      if (email && !emailMap.has(email)) {
        emailMap.set(email, {
          ad: depo.kullaniciAdi || 'İsimsiz',
          email: email,
          telefon: depo.kullaniciTelefon || '',
          depoSayisi: 0
        });
      }
      if (email && emailMap.has(email)) {
        emailMap.get(email).depoSayisi++;
      }
    });
    this.kullanicilar = Array.from(emailMap.values());
  }

  kullaniciSec(kullanici: any) {
    this.seciliKullanici = kullanici;
    this.kullaniciDepolar = this.tumDepolar.filter(
      d => d.kullaniciEmail === kullanici.email
    );
    this.kullaniciBilgiForm = {
      kullaniciAdi: kullanici.ad,
      kullaniciEmail: kullanici.email,
      kullaniciTelefon: kullanici.telefon
    };
    this.seciliDepo = null;
  }

  kullaniciBilgiGuncelle() {
    if (!this.seciliKullanici) return;

    let tamamlanan = 0;
    const toplam = this.kullaniciDepolar.length;

    this.kullaniciDepolar.forEach(depo => {
      const guncelVeri = {
        kullaniciAdi: this.kullaniciBilgiForm.kullaniciAdi,
        kullaniciEmail: this.kullaniciBilgiForm.kullaniciEmail,
        kullaniciTelefon: this.kullaniciBilgiForm.kullaniciTelefon
      };

      this.dataService.depoGuncelle(depo.id, guncelVeri).subscribe({
        next: () => {
          tamamlanan++;
          if (tamamlanan === toplam) {
            alert('✅ Kullanıcı bilgileri güncellendi!');
            this.seciliKullanici.ad = this.kullaniciBilgiForm.kullaniciAdi;
            this.seciliKullanici.email = this.kullaniciBilgiForm.kullaniciEmail;
            this.seciliKullanici.telefon = this.kullaniciBilgiForm.kullaniciTelefon;
          }
        },
        error: (err: any) => console.error('Güncelleme hatası:', err)
      });
    });
  }

  depoSecVeDuzenle(depo: any) {
    this.seciliDepo = depo;
    this.duzenleForm = {
      urunTipi: depo.urun,
      minSicaklik: depo.minSicaklik || 0,
      maxSicaklik: depo.maxSicaklik || 0
    };
  }

  depoAyarKaydet() {
    if (!this.seciliDepo) return;

    const guncelVeri = {
      urunTipi: this.duzenleForm.urunTipi,
      minSicaklik: this.duzenleForm.minSicaklik,
      maxSicaklik: this.duzenleForm.maxSicaklik
    };

    this.dataService.depoGuncelle(this.seciliDepo.id, guncelVeri).subscribe({
      next: () => {
        alert(`✅ "${this.seciliDepo.ad}" depo ayarları güncellendi!`);
        this.seciliDepo = null;
      },
      error: (err: any) => {
        console.error('Depo güncelleme hatası:', err);
        alert('❌ Güncelleme başarısız!');
      }
    });
  }

  depoDuzenleKapat() {
    this.seciliDepo = null;
  }
}