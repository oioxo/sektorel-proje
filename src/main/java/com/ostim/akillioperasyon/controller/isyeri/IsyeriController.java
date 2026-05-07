package com.ostim.akillioperasyon.controller.isyeri;

import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriResponseModel;
import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriSaveRequest;
import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriUpdateRequest;
import com.ostim.akillioperasyon.controller.isyeri.service.IsyeriService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("isyeri")
@CrossOrigin("*")
public class IsyeriController {

    private final IsyeriService isyeriService;

    public IsyeriController(IsyeriService isyeriService) {
        this.isyeriService = isyeriService;
    }

    @PostMapping("save")
    public Long save(@RequestBody IsyeriSaveRequest isyeriSaveRequest){
        return isyeriService.save(isyeriSaveRequest);
    }

    @PutMapping("update")
    public Long update(@RequestBody IsyeriUpdateRequest isyeriUpdateRequest){
        return isyeriService.update(isyeriUpdateRequest);
    }

    @GetMapping("getAll")
    public List<IsyeriResponseModel> getAll(){
        return isyeriService.getAll();
    }

    @GetMapping("get/{id}")
    public IsyeriResponseModel getById(@PathVariable Long id){
        return isyeriService.getById(id);
    }

    // CRUD * Create Read Update DELETE
}
