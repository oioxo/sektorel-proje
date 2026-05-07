package com.ostim.akillioperasyon.controller.urun;

import com.ostim.akillioperasyon.controller.urun.service.UrunService;
import com.ostim.akillioperasyon.entity.UrunEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/urun")
public class UrunController {

    private final UrunService urunService;

    public UrunController(UrunService urunService) {
        this.urunService = urunService;
    }

    // Sisteme yeni ürün ekleyen uç nokta
    @PostMapping("/ekle")
    public UrunEntity urunEkle(@RequestBody UrunEntity urun) {
        return urunService.urunEkle(urun);
    }

    // Sistemdeki kayıtlı tüm ürünleri listeleyen uç nokta
    @GetMapping("/liste")
    public List<UrunEntity> urunListesi() {
        return urunService.tumUrunleriGetir();
    }
}