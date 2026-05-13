package com.ostim.akillioperasyon.controller.depo;

import com.ostim.akillioperasyon.controller.depo.model.DepoResponseModel;
import com.ostim.akillioperasyon.controller.depo.model.DepoSaveRequest;
import com.ostim.akillioperasyon.controller.depo.service.DepoService;
import org.springframework.web.bind.annotation.*;
import java.util.List; // List importunu unutma

@RestController
@RequestMapping("/api/depo") // Başına /api ekledik, frontend ile eşleşti
public class DepoController {

    private final DepoService depoService;

    public DepoController(DepoService depoService) {
        this.depoService = depoService;
    }

    // 1. LİSTELEME: Frontend'deki depolariYukle() buraya bağlanacak
    @GetMapping("/all")
    public List<DepoResponseModel> tumDepolariGetir() {
        return depoService.tumDepolariGetir(); // Service'te bu metodun olduğundan emin ol
    }

    // 2. KAYDETME: Frontend'deki depoEkle() buraya bağlanacak
    @PostMapping("/save") // /ekle yerine /save yaptık, frontend ile eşleşti
    public DepoResponseModel depoEkle(@RequestBody DepoSaveRequest request) {
        return depoService.depoEkle(request);
    }
}