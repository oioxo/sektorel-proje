import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-harita',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './harita.html',
  styleUrl: './harita.css'
})
export class HaritaComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  private map!: L.Map;
  private geojsonLayer!: L.GeoJSON;

  seciliSehirDetay: any = null;
  sehirDepoSayilari: any = {};

  tumDepolar: any[] = [];
  filtrelenmisDepolar: any[] = [];
  kullanicilar: any[] = [];
  seciliFiltre: string = 'genel';
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
    this.initMap();

    this.dataService.currentDepolar.subscribe(depolar => {
      this.tumDepolar = depolar;
      this.kullanicilariGrupla();
      this.filtreUygula();
    });
  }

  kullanicilariGrupla() {
    const emailMap = new Map<string, any>();
    this.tumDepolar.forEach(depo => {
      const email = depo.kullaniciEmail;
      if (email && !emailMap.has(email)) {
        emailMap.set(email, {
          ad: depo.kullaniciAdi || 'İsimsiz',
          email: email
        });
      }
    });
    this.kullanicilar = Array.from(emailMap.values());
  }

  filtreUygula() {
    if (this.rol !== 'admin') {
      this.filtrelenmisDepolar = this.tumDepolar.filter(
        d => d.kullaniciAdi.toLowerCase() === this.kullaniciAdi.toLowerCase()
      );
    } else if (this.seciliFiltre === 'genel') {
      this.filtrelenmisDepolar = this.tumDepolar;
    } else {
      this.filtrelenmisDepolar = this.tumDepolar.filter(
        d => d.kullaniciEmail === this.seciliFiltre
      );
    }
    this.sehirSayilariniHesapla();
  }

  filtreSecildi() {
    this.filtreUygula();
  }

  sehirSayilariniHesapla() {
    this.sehirDepoSayilari = {};
    this.filtrelenmisDepolar.forEach(depo => {
      if (depo.sehir && depo.sehir !== 'Bilinmiyor') {
        this.sehirDepoSayilari[depo.sehir] = (this.sehirDepoSayilari[depo.sehir] || 0) + 1;
      }
    });

    if (this.geojsonLayer) {
      this.geojsonLayer.setStyle((feature) => this.style(feature));
    }
  }

  depoSilOnay(depo: any) {
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
        alert(`🗑️ "${silinecekAd}" deposu başarıyla silindi!`);
        this.silmeOnay = null;
      },
      error: (err: any) => {
        console.error('Silme hatası:', err);
        alert('❌ Depo silinemedi!');
        this.silmeOnay = null;
      }
    });
  }

  private initMap(): void {
    if (this.map) return;

    const bounds = L.latLngBounds(L.latLng(33.5, 25.0), L.latLng(43.5, 46.0));

    this.map = L.map(this.mapElement.nativeElement, {
      center: [39.1, 35.4],
      zoom: 6,
      minZoom: 6,
      maxZoom: 10,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png').addTo(this.map);

    this.http.get('geojson/turkiye_iller.json').subscribe({
      next: (geoJson: any) => {
        this.geojsonLayer = L.geoJSON(geoJson, {
          style: (feature) => this.style(feature),
          onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
        }).addTo(this.map);
      },
      error: (err) => console.error("GeoJSON yüklenemedi:", err)
    });
  }

  private normalizeName(name: string): string {
    return name ? name.toLocaleLowerCase('tr-TR').trim()
      .replace(/i/g, 'i').replace(/ı/g, 'i')
      .replace(/ğ/g, 'g').replace(/ü/g, 'u')
      .replace(/ş/g, 's').replace(/ö/g, 'o')
      .replace(/ç/g, 'c') : '';
  }

  private style(feature: any) {
    const rawName = feature.properties.name || feature.properties.NAME || '';
    const normalizedJsonName = this.normalizeName(rawName);

    const matchedKey = Object.keys(this.sehirDepoSayilari).find(
      key => this.normalizeName(key) === normalizedJsonName
    );

    const depoSayisi = matchedKey ? this.sehirDepoSayilari[matchedKey] : 0;

    return {
      fillColor: this.dataService.getColor(depoSayisi),
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: depoSayisi > 0 ? 0.9 : 0.4
    };
  }

  private onEachFeature(feature: any, layer: L.Layer) {
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle({ weight: 2, color: '#666', fillOpacity: 1 });

        const ad = feature.properties.name || feature.properties.NAME;
        const matchedKey = Object.keys(this.sehirDepoSayilari).find(
          key => this.normalizeName(key) === this.normalizeName(ad)
        );
        const sayi = matchedKey ? this.sehirDepoSayilari[matchedKey] : 0;

        this.seciliSehirDetay = {
          ad: ad,
          sayi: sayi,
          renk: this.dataService.getColor(sayi)
        };
      },
      mouseout: (e) => {
        this.geojsonLayer.resetStyle(e.target);
        this.seciliSehirDetay = null;
      }
    });
  }
}