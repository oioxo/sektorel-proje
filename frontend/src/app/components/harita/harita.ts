import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-harita',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './harita.html',
  styleUrl: './harita.css'
})
export class HaritaComponent implements OnInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  private map!: L.Map;
  private geojsonLayer!: L.GeoJSON;
  
  seciliSehirDetay: any = null;
  sehirDepoSayilari: any = {};

  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // 1. Önce boş haritayı kur
    this.initMap();
    
    // 2. Sonra verileri dinle
    this.dataService.sehirVerileriniGetir().subscribe(res => {
      this.sehirDepoSayilari = res;
      console.log("Harita güncelleniyor, yeni sayılar:", res);
      
      // Eğer GeoJSON yüklendiyse, renkleri anında güncelle
      if (this.geojsonLayer) {
        this.geojsonLayer.setStyle((feature) => this.style(feature));
      }
    });
  }

  private initMap(): void {
    if (this.map) return; // Harita zaten kurulduysa tekrar kurma

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

    // GeoJSON'ı bir kez yüklüyoruz
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

  // --- İsim Eşleştirme Mantığı ---
  private normalizeName(name: string): string {
    return name ? name.toLocaleLowerCase('tr-TR').trim()
      .replace(/i/g, 'i').replace(/ı/g, 'i') // i-ı karmaşasını önlemek için
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
      fillOpacity: depoSayisi > 0 ? 0.9 : 0.4 // Depo olan yerler daha belirgin
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