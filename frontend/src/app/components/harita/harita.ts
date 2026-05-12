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

  // Harita üzerindeki X (yatay) ve Y (dikey) konumları. 
  // (0-1000 arası X, 0-450 arası Y olacak şekilde kalibre edildi)
  sehirRehberi: any = {
  'İstanbul': { x: 200, y: 125 }, // Marmara'nın tam yeri
  'Ankara':   { x: 440, y: 220 }, // İç Anadolu'nun ortası
  'İzmir':    { x: 105, y: 295 }, // Ege kıyısı
  'Bursa':    { x: 225, y: 170 }, 
  'Antalya':  { x: 340, y: 395 }, // Güney kıyısı
  'Adana':    { x: 560, y: 390 },
  'Erzurum':  { x: 830, y: 225 }, // Doğu Anadolu
  'Samsun':   { x: 580, y: 115 }  // Karadeniz kıyısı
};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Servisten gelen depoları dinle ve koordinatlarını bas
    this.dataService.currentDepolar.subscribe(res => {
      this.depoListesi = res.map(depo => ({
        ...depo,
        coords: this.sehirRehberi[depo.sehir] || { x: 440, y: 220 } // Şehir yoksa Ankara'ya ata
      }));
    });
  }

  detayGoster(depo: any) {
    this.seciliDepo = depo;
  }
}