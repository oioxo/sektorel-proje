import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mevcut Ürün Limitleri
  private urunLimitleri = new BehaviorSubject<any[]>([
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ]);

  // Mevcut Depolar
  private depolar = new BehaviorSubject<any[]>([
    { id: 1, ad: 'Ankara Merkez Silo', urun: 'Tahıl', urunId: 4, sicaklik: 18.5, durum: 'NORMAL', kritikSureSayaci: 0, bildirimGonderildi: false },
    { id: 2, ad: 'İstanbul Et Deposu', urun: 'Kırmızı Et', urunId: 1, sicaklik: -19.2, durum: 'NORMAL', kritikSureSayaci: 0, bildirimGonderildi: false }
  ]);

  // Rol Takibi
  private kullaniciRolu = new BehaviorSubject<string>('operator');
  currentRol = this.kullaniciRolu.asObservable();

  currentLimitler = this.urunLimitleri.asObservable();
  currentDepolar = this.depolar.asObservable();

  // --- HARİTA İÇİN GEREKLİ YENİ FONKSİYONLAR ---

  /**
   * Şehir bazlı depo sayılarını döner. 
   * GeoJSON üzerindeki 'name' alanı ile buradaki anahtarlar (İstanbul, Ankara vb.) eşleşmelidir.
   */
  sehirVerileriniGetir() {
    return of({
      "İstanbul": 52,
      "Ankara": 25,
      "İzmir": 18,
      "Bursa": 15,
      "Antalya": 10,
      "Samsun": 8,
      "Erzurum": 3
    });
  }

  /**
   * Depo yoğunluğuna göre renk kodu döndürür.
   * TMO ve benzeri kurumsal sistemlerdeki 'Yoğunluk Haritası' mantığıdır.
   */
  getColor(d: number) {
    return d > 50  ? '#ef4444' : // Kritik Yoğunluk: Kırmızı
           d > 20  ? '#f97316' : // Yüksek: Turuncu
           d > 10  ? '#facc15' : // Orta: Sarı
           d > 0   ? '#94a3b8' : // Düşük: Gri (Mavi-Gri)
                     '#f1f5f9';  // Veri Yok: Çok Açık Gri
  }

  // --- MEVCUT METOTLAR ---

  limitGuncelle(yeniLimitler: any[]) {
    this.urunLimitleri.next(yeniLimitler);
  }

  depoEkle(yeniDepo: any) {
    const mevcutDepolar = this.depolar.getValue();
    this.depolar.next([...mevcutDepolar, yeniDepo]);
  }

  rolGuncelle(yeniRol: string) {
    this.kullaniciRolu.next(yeniRol);
  }
}