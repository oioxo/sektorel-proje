package com.ostim.akillioperasyon.controller.depo;

import com.ostim.akillioperasyon.controller.depo.model.DepoResponseModel;
import com.ostim.akillioperasyon.controller.depo.model.DepoSaveRequest;
import com.ostim.akillioperasyon.controller.depo.service.DepoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/depo")
public class DepoController {

    private final DepoService depoService;

    public DepoController(DepoService depoService) {
        this.depoService = depoService;
    }

    @PostMapping("/ekle")
    public DepoResponseModel depoEkle(@RequestBody DepoSaveRequest request) {
        return depoService.depoEkle(request);
    }
}