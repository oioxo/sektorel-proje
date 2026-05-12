import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-harita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harita.html',
  styleUrl: './harita.css'
})
export class HaritaComponent implements OnInit {
  depoListesi: any[] = [];
  seciliDepo: any = null;

  // image_10.png (1000px genişlik) referans alınarak kalibre edilmiş koordinatlar
  sehirKoordinatlari: any = {
    'İstanbul': { x: 250, y: 140 }, // Marmara'nın kuzeybatısı
    'Ankara':   { x: 510, y: 230 }, // Tam merkez İç Anadolu
    'İzmir':    { x: 130, y: 310 }, // Ege kıyısı
    'Bursa':    { x: 260, y: 190 }, // Marmara'nın güneyi
    'Antalya':  { x: 380, y: 410 }, // Güney kıyısı
    'Adana':    { x: 600, y: 395 }, // Akdeniz'in doğusu
    'Erzurum':  { x: 860, y: 220 }, // Doğu Anadolu
    'Samsun':   { x: 620, y: 130 }  // Orta Karadeniz kıyısı
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentDepolar.subscribe(res => {
      this.depoListesi = res.map(depo => ({
        ...depo,
        // image_10.png üzerindeki koordinatları servisten gelen veriye göre atıyoruz
        coords: this.sehirKoordinatlari[depo.sehir] || { x: 510, y: 230 } // Şehir yoksa Ankara'ya koy
      }));
    });
  }

  detayGoster(depo: any) {
    this.seciliDepo = depo;
  }
}