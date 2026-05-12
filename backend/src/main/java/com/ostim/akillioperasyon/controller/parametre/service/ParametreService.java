package com.ostim.akillioperasyon.controller.parametre.service;

import com.ostim.akillioperasyon.controller.parametre.model.ParametreResponseModel;
import com.ostim.akillioperasyon.controller.parametre.model.ParametreSaveRequest;
import com.ostim.akillioperasyon.controller.parametre.repository.ParametreRepository;
import com.ostim.akillioperasyon.entity.ParametreEntity;
import org.springframework.stereotype.Service;

@Service
public class ParametreService {

    private final ParametreRepository parametreRepository;

    public ParametreService(ParametreRepository parametreRepository) {
        this.parametreRepository = parametreRepository;
    }

    public ParametreResponseModel parametreEkle(ParametreSaveRequest request) {
        ParametreEntity parametre = new ParametreEntity();
        parametre.setParametreAdi(request.getParametreAdi());

        ParametreEntity kaydedilen = parametreRepository.save(parametre);

        return new ParametreResponseModel(kaydedilen.getId(), kaydedilen.getParametreAdi());
    }
}