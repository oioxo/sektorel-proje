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
    this.dataService.sehirVerileriniGetir().subscribe(res => {
      this.sehirDepoSayilari = res;
      this.initMap();
    });
  }

  private initMap(): void {
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
    return name ? name.toLocaleLowerCase('tr-TR').trim() : '';
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
      weight: 1,           // Normal durumda çok ince beyaz çizgi
      opacity: 1,
      color: '#ffffff',    
      fillOpacity: 0.7     // Hafif şeffaf durması modern hissettirir
    };
  }

  private onEachFeature(feature: any, layer: L.Layer) {
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        
        // --- DÜZENLEME BURASI: Siyah çizgileri ve noktaları kaldırdık ---
        l.setStyle({
          weight: 0,         // Sınır çizgisini tamamen kaldırdık
          fillOpacity: 1     // Sadece dolgu rengini parlatıyoruz
        });
        // -------------------------------------------------------------

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          l.bringToFront();
        }
        
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
        this.geojsonLayer.resetStyle(e.target); // Fare ayrılınca ince beyaz çizgiye geri döner
        this.seciliSehirDetay = null;
      }
    });
  }
}