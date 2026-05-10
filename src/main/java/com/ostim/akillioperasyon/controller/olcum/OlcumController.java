package com.ostim.akillioperasyon.controller.olcum;

import com.ostim.akillioperasyon.controller.olcum.model.OlcumResponseModel;
import com.ostim.akillioperasyon.controller.olcum.model.OlcumSaveRequest;
import com.ostim.akillioperasyon.controller.olcum.service.OlcumService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/olcum")
public class OlcumController {

    private final OlcumService olcumService;

    public OlcumController(OlcumService olcumService) {
        this.olcumService = olcumService;
    }

    @PostMapping("/kaydet")
    public OlcumResponseModel kaydet(@RequestBody OlcumSaveRequest request) {
        return olcumService.olcumKaydetVeDegerlendir(request);
    }
}