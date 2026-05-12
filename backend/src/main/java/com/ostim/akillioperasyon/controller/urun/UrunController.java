package com.ostim.akillioperasyon.controller.urun;

import com.ostim.akillioperasyon.controller.urun.model.UrunParametreReferansResponseModel;
import com.ostim.akillioperasyon.controller.urun.model.UrunParametreReferansSaveRequest;
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

    @PostMapping("/ekle")
    public UrunEntity urunEkle(@RequestBody UrunEntity urun) {
        return urunService.urunEkle(urun);
    }

    @GetMapping("/liste")
    public List<UrunEntity> urunListesi() {
        return urunService.tumUrunleriGetir();
    }

    // YENİ EKLENEN UÇ NOKTA: Referans Ekleme
    @PostMapping("/referans-ekle")
    public UrunParametreReferansResponseModel referansEkle(@RequestBody UrunParametreReferansSaveRequest request) {
        return urunService.referansEkle(request);
    }
}