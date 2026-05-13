package com.ostim.akillioperasyon.controller.depo;

import com.ostim.akillioperasyon.controller.depo.model.DepoResponseModel;
import com.ostim.akillioperasyon.controller.depo.model.DepoSaveRequest;
import com.ostim.akillioperasyon.controller.depo.service.DepoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/depo")
public class DepoController {

    private final DepoService depoService;

    public DepoController(DepoService depoService) {
        this.depoService = depoService;
    }

    @GetMapping("/all")
    public List<DepoResponseModel> tumDepolariGetir() {
        return depoService.tumDepolariGetir();
    }

    @PostMapping("/save")
    public DepoResponseModel depoEkle(@RequestBody DepoSaveRequest request) {
        return depoService.depoEkle(request);
    }

    @PutMapping("/update/{id}")
    public DepoResponseModel depoGuncelle(@PathVariable Long id, @RequestBody DepoSaveRequest request) {
        return depoService.depoGuncelle(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public void depoSil(@PathVariable Long id) {
        depoService.depoSil(id);
    }
}