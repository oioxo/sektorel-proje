import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Mevcut verilerin...
  private urunLimitleri = new BehaviorSubject<any[]>([
    { id: 1, ad: 'Kırmızı Et', min: -20, max: -18 },
    { id: 2, ad: 'Tavuk', min: -2, max: 4 },
    { id: 3, ad: 'Süt ve Süt Ürünleri', min: 2, max: 6 },
    { id: 4, ad: 'Tahıl', min: 10, max: 20 }
  ]);

  private depolar = new BehaviorSubject<any[]>([
    { id: 1, ad: 'Ankara Merkez Silo', urun: 'Tahıl', urunId: 4, sicaklik: 18.5, durum: 'NORMAL', kritikSureSayaci: 0, bildirimGonderildi: false },
    { id: 2, ad: 'İstanbul Et Deposu', urun: 'Kırmızı Et', urunId: 1, sicaklik: -19.2, durum: 'NORMAL', kritikSureSayaci: 0, bildirimGonderildi: false }
  ]);

  // YENİ: Rol Takibi
  private kullaniciRolu = new BehaviorSubject<string>('operator');
  currentRol = this.kullaniciRolu.asObservable();

  currentLimitler = this.urunLimitleri.asObservable();
  currentDepolar = this.depolar.asObservable();

  limitGuncelle(yeniLimitler: any[]) {
    this.urunLimitleri.next(yeniLimitler);
  }

  depoEkle(yeniDepo: any) {
    const mevcutDepolar = this.depolar.getValue();
    this.depolar.next([...mevcutDepolar, yeniDepo]);
  }

  // YENİ: Rolü Güncelleme Fonksiyonu
  rolGuncelle(yeniRol: string) {
    this.kullaniciRolu.next(yeniRol);
  }
}