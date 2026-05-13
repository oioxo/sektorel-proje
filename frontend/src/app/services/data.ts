import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators'; // map operatörünü ekledik

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

  // Depolar listesi - Başlangıçta boş, backend'den dolacak
  private depolar = new BehaviorSubject<any[]>([]);

  private kullaniciRolu = new BehaviorSubject<string>('admin');
  currentRol = this.kullaniciRolu.asObservable();

  currentLimitler = this.urunLimitleri.asObservable();
  currentDepolar = this.depolar.asObservable();

  constructor(private http: HttpClient) {
    this.depolariYukle();
  }

  // Veritabanından verileri çeker ve BehaviorSubject'i günceller
  depolariYukle() {
    this.http.get<any[]>(`${this.apiUrl}/depo/all`).subscribe({
      next: (data) => {
        console.log("Backend'den gelen depolar:", data);
        this.depolar.next(data);
      },
      error: (err) => console.error("Depolar yüklenirken veritabanı hatası:", err)
    });
  }

  /**
   * KRİTİK DÜZELTME: Harita verilerini el ile yazmak yerine 
   * mevcut depolardan dinamik olarak hesaplıyoruz.
   */
  sehirVerileriniGetir(): Observable<any> {
    return this.currentDepolar.pipe(
      map(depoListesi => {
        const sehirSayilari: any = {};
        
        depoListesi.forEach(depo => {
          // Örn: depo.sehir "Adana" ise sehirSayilari["Adana"] artacak
          if (depo.sehir) {
            sehirSayilari[depo.sehir] = (sehirSayilari[depo.sehir] || 0) + 1;
          }
        });

        console.log("Harita için hesaplanan şehir yoğunlukları:", sehirSayilari);
        return sehirSayilari;
      })
    );
  }

  getColor(d: number) {
    // Yoğunluk 1 bile olsa haritada görünmesi için alt sınırı 0 yaptık
    return d > 50  ? '#ef4444' : 
           d > 20  ? '#f97316' : 
           d > 10  ? '#facc15' : 
           d > 0   ? '#94a3b8' : // En az 1 depo varsa gri/mavi boya
                     '#f1f5f9';  // Depo yoksa boş renk
  }

  limitGuncelle(yeniLimitler: any[]) {
    this.urunLimitleri.next(yeniLimitler);
  }

  depoEkle(yeniDepo: any) {
    return this.http.post(`${this.apiUrl}/depo/save`, yeniDepo).pipe(
      tap(() => {
        console.log("Yeni depo kaydedildi, liste tazeleniyor...");
        this.depolariYukle(); // Kayıttan sonra listeyi DB'den tekrar çek
      })
    );
  }

  rolGuncelle(yeniRol: string) {
    this.kullaniciRolu.next(yeniRol);
  }
}