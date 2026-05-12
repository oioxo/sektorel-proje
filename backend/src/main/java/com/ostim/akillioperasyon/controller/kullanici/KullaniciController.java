package com.ostim.akillioperasyon.controller.kullanici;

import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciResponseModel;
import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciSaveRequest;
import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciUpdateRequest;
import com.ostim.akillioperasyon.controller.kullanici.service.KullaniciService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("kullanici")
@CrossOrigin("*")
public class KullaniciController {

    private final KullaniciService kullaniciService;

    public KullaniciController(KullaniciService kullaniciService) {
        this.kullaniciService = kullaniciService;
    }

    @PostMapping("save")
    public Long save(@RequestBody KullaniciSaveRequest kullaniciSaveRequest){
        return kullaniciService.save(kullaniciSaveRequest);
    }

    @PutMapping("update")
    public Long update(@RequestBody KullaniciUpdateRequest kullaniciUpdateRequest){
        return kullaniciService.update(kullaniciUpdateRequest);
    }

    @GetMapping("getAll")
    public List<KullaniciResponseModel> getAll(){
        return kullaniciService.getAll();
    }

    @GetMapping("get/{id}")
    public KullaniciResponseModel getById(@PathVariable Long id){
        return kullaniciService.getById(id);
    }

}
