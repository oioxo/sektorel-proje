import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8044/api';

  private urunLimitleri = new BehaviorSubject<any[]>([
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ]);

  private depolar = new BehaviorSubject<any[]>([]);
  private kullaniciRolu = new BehaviorSubject<string>('admin');
  private girisYapanKullanici = new BehaviorSubject<string>('');

  currentRol = this.kullaniciRolu.asObservable();
  currentLimitler = this.urunLimitleri.asObservable();
  currentDepolar = this.depolar.asObservable();
  currentKullanici = this.girisYapanKullanici.asObservable();

  constructor(private http: HttpClient) {
    this.depolariYukle();
  }

  private temizSehirIsmi(kod: string): string {
    if (!kod) return 'Bilinmiyor';
    const k = kod.toUpperCase();
    if (k.includes('ANK') || k.includes('ANKARA')) return 'Ankara';
    if (k.includes('ADA') || k.includes('ADANA')) return 'Adana';
    if (k.includes('IST') || k.includes('ISTANBUL')) return 'İstanbul';
    if (k.includes('IZM') || k.includes('IZMIR')) return 'İzmir';
    if (k.includes('KON') || k.includes('KONYA')) return 'Konya';
    return kod.charAt(0).toUpperCase() + kod.slice(1).toLowerCase();
  }

  depolariYukle() {
    this.http.get<any[]>(`${this.apiUrl}/depo/all`).subscribe({
      next: (data) => {
        const formatliDepolar = data.map(backendDepo => {
          return {
            id: backendDepo.id,
            ad: backendDepo.depoAdi || 'İsimsiz Depo',
            sehir: this.temizSehirIsmi(backendDepo.depoKodu || ''),
            urun: backendDepo.urunTipi || 'Belirtilmemiş',
            sicaklik: backendDepo.sicaklik || 18.5,
            minSicaklik: backendDepo.minSicaklik,
            maxSicaklik: backendDepo.maxSicaklik,
            kullaniciAdi: backendDepo.kullaniciAdi || '',
            kullaniciEmail: backendDepo.kullaniciEmail || '',
            kullaniciTelefon: backendDepo.kullaniciTelefon || '',
            durum: 'NORMAL',
            kritikSureSayaci: 0,
            bildirimGonderildi: false
          };
        });

        this.depolar.next(formatliDepolar);
      },
      error: (err) => console.error("Depolar yüklenirken veritabanı hatası:", err)
    });
  }

  sehirVerileriniGetir(): Observable<any> {
    return this.currentDepolar.pipe(
      map(depoListesi => {
        const sehirSayilari: any = {};
        depoListesi.forEach(depo => {
          if (depo.sehir && depo.sehir !== 'Bilinmiyor') {
            sehirSayilari[depo.sehir] = (sehirSayilari[depo.sehir] || 0) + 1;
          }
        });
        return sehirSayilari;
      })
    );
  }

  getColor(d: number) {
    return d > 0 ? '#94a3b8' : '#f1f5f9';
  }

  limitGuncelle(yeniLimitler: any[]) {
    this.urunLimitleri.next(yeniLimitler);
  }

  depoEkle(yeniDepo: any) {
    const secilenUrunAd = yeniDepo.urun;

    const backendFormati = {
      depoAdi: yeniDepo.ad,
      urunTipi: secilenUrunAd,
      sicaklik: yeniDepo.sicaklik || 18.0,
      minSicaklik: yeniDepo.minSicaklik || null,
      maxSicaklik: yeniDepo.maxSicaklik || null,
      depoAciklama: '',
      kullaniciAdi: yeniDepo.kullaniciAdi || '',
      kullaniciEmail: yeniDepo.kullaniciEmail || '',
      kullaniciTelefon: yeniDepo.kullaniciTelefon || '',
      depoKodu: yeniDepo.sehir,
      isyeriId: 1
    };

    return this.http.post(`${this.apiUrl}/depo/save`, backendFormati).pipe(
      tap(() => this.depolariYukle())
    );
  }

  depoGuncelle(id: number, guncelVeri: any) {
    return this.http.put(`${this.apiUrl}/depo/update/${id}`, guncelVeri).pipe(
      tap(() => this.depolariYukle())
    );
  }

  depoSil(id: number) {
    return this.http.delete(`${this.apiUrl}/depo/delete/${id}`).pipe(
      tap(() => this.depolariYukle())
    );
  }

  rolGuncelle(yeniRol: string) {
    this.kullaniciRolu.next(yeniRol);
  }

  kullaniciGuncelle(kullaniciAdi: string) {
    this.girisYapanKullanici.next(kullaniciAdi);
  }

  cikisYap() {
    this.kullaniciRolu.next('admin');
    this.girisYapanKullanici.next('');
  }

  getGirisYapanKullanici(): string {
    return this.girisYapanKullanici.getValue();
  }

  getRol(): string {
    return this.kullaniciRolu.getValue();
  }
}