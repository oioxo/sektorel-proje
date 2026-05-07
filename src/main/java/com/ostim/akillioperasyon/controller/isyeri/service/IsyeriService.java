package com.ostim.akillioperasyon.controller.isyeri.service;

import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriResponseModel;
import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriSaveRequest;
import com.ostim.akillioperasyon.controller.isyeri.model.IsyeriUpdateRequest;
import com.ostim.akillioperasyon.controller.isyeri.repository.IsyeriRepository;
import com.ostim.akillioperasyon.entity.IsyeriEntity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IsyeriService {

    private final IsyeriRepository isyeriRepository;

    public IsyeriService(IsyeriRepository isyeriRepository) {
        this.isyeriRepository = isyeriRepository;
    }

    public Long save(IsyeriSaveRequest isyeriSaveRequest) {
        IsyeriEntity isyeriEntity = new IsyeriEntity();
        isyeriEntity.setIsyeriAdi(isyeriSaveRequest.isyeriAdi());
        return isyeriRepository.save(isyeriEntity).getId();
    }

    public Long update(IsyeriUpdateRequest isyeriUpdateRequest) {
        Optional<IsyeriEntity> byId = isyeriRepository.findById(isyeriUpdateRequest.id());
        if (byId.isPresent()) {
            IsyeriEntity isyeri = byId.get();
            isyeri.setIsyeriAdi(isyeriUpdateRequest.isyeriAdi());
            isyeriRepository.save(isyeri);
        } else {
            throw new EntityNotFoundException();
        }

        return isyeriUpdateRequest.id();
    }

    public List<IsyeriResponseModel> getAll() {

//        List<IsyeriEntity> butunIsyerleri = isyeriRepository.findAll();
//        List<IsyeriResponseModel> isyeriResponseModels = new ArrayList<>();
//        for (IsyeriEntity isyeriEntity : butunIsyerleri) {
//            IsyeriResponseModel isyeriResponseModel = new IsyeriResponseModel(isyeriEntity.getId(), isyeriEntity.getIsyeriAdi());
//            isyeriResponseModels.add(isyeriResponseModel);
//        }
//
//        return isyeriResponseModels;


        return isyeriRepository.findAll().stream().map(a -> new IsyeriResponseModel(a.getId(), a.getIsyeriAdi())).toList();
    }

    public IsyeriResponseModel getById(Long id) {
        Optional<IsyeriEntity> byId = isyeriRepository.findById(id);
        if (byId.isPresent()) {
            return new IsyeriResponseModel(byId.get().getId(), byId.get().getIsyeriAdi());
        } else {
            throw new EntityNotFoundException();
        }

    }
}
