package com.ostim.akillioperasyon.controller.parametre;

import com.ostim.akillioperasyon.controller.parametre.model.ParametreResponseModel;
import com.ostim.akillioperasyon.controller.parametre.model.ParametreSaveRequest;
import com.ostim.akillioperasyon.controller.parametre.service.ParametreService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parametre")
public class ParametreController {

    private final ParametreService parametreService;

    public ParametreController(ParametreService parametreService) {
        this.parametreService = parametreService;
    }

    @PostMapping("/ekle")
    public ParametreResponseModel parametreEkle(@RequestBody ParametreSaveRequest request) {
        return parametreService.parametreEkle(request);
    }
}