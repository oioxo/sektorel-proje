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
  
  currentRol = this.kullaniciRolu.asObservable();
  currentLimitler = this.urunLimitleri.asObservable();
  currentDepolar = this.depolar.asObservable();

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

  // --- GETİRME VE TRUVA ATINI AÇMA ---
  depolariYukle() {
    this.http.get<any[]>(`${this.apiUrl}/depo/all`).subscribe({
      next: (data) => {
        const formatliDepolar = data.map(backendDepo => {
          
          // ŞİFREYİ ÇÖZÜYORUZ: "Depo Adı||Ürün Tipi"
          const hamAciklama = backendDepo.depoAciklama || '';
          const parcalar = hamAciklama.split('||'); // || işaretinden ikiye böl
          
          const gercekAd = parcalar[0] || 'İsimsiz Depo';
          // Eğer önceden eklenmiş eski kayıtsa (şifresizse) varsayılan Tahıl yap, yenisiyse 2. parçayı al
          const gercekUrun = parcalar[1] || 'Tahıl'; 

          return {
            id: backendDepo.id,
            ad: gercekAd,
            sehir: this.temizSehirIsmi(backendDepo.depoKodu || ''),
            urun: gercekUrun,
            sicaklik: 18.5,
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

  // --- KAYDETME VE TRUVA ATINI PAKETLEME ---
  depoEkle(yeniDepo: any) {
    const secilenUrunAd = yeniDepo.urun || 'Tahıl';

    const backendFormati = {
      // ŞİFREYİ OLUŞTURUYORUZ: İsim ve Ürünü araya || koyarak birleştirip gönderiyoruz!
      depoAciklama: `${yeniDepo.ad}||${secilenUrunAd}`,       
      depoKodu: yeniDepo.sehir,        
      isyeriId: 1                      
    };

    return this.http.post(`${this.apiUrl}/depo/save`, backendFormati).pipe(
      tap(() => this.depolariYukle())
    );
  }

  rolGuncelle(yeniRol: string) {
    this.kullaniciRolu.next(yeniRol);
  }
}