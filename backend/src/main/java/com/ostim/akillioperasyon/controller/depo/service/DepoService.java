package com.ostim.akillioperasyon.controller.depo.service;

import com.ostim.akillioperasyon.controller.depo.model.DepoResponseModel;
import com.ostim.akillioperasyon.controller.depo.model.DepoSaveRequest;
import com.ostim.akillioperasyon.controller.depo.repository.DepoRepository;
import com.ostim.akillioperasyon.controller.isyeri.repository.IsyeriRepository;
import com.ostim.akillioperasyon.entity.DepoEntity;
import com.ostim.akillioperasyon.entity.IsyeriEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepoService {

    private final DepoRepository depoRepository;
    private final IsyeriRepository isyeriRepository;

    public DepoService(DepoRepository depoRepository, IsyeriRepository isyeriRepository) {
        this.depoRepository = depoRepository;
        this.isyeriRepository = isyeriRepository;
    }

    // --- YENİ: Frontend'in 404 almaması için tüm listeyi dönen metod ---
    public List<DepoResponseModel> tumDepolariGetir() {
        return depoRepository.findAll().stream()
                .map(depo -> new DepoResponseModel(
                        depo.getId(),
                        depo.getDepoKodu(),
                        depo.getDepoAciklama(),
                        depo.getIsyeriEntity() != null ? depo.getIsyeriEntity().getId() : null
                ))
                .collect(Collectors.toList());
    }

    public DepoResponseModel depoEkle(DepoSaveRequest request) {
        IsyeriEntity isyeri = isyeriRepository.findById(request.getIsyeriId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip işyeri bulunamadı!"));

        DepoEntity depo = new DepoEntity();
        depo.setDepoKodu(request.getDepoKodu());
        depo.setDepoAciklama(request.getDepoAciklama());
        depo.setIsyeriEntity(isyeri);

        DepoEntity kaydedilenDepo = depoRepository.save(depo);

        return new DepoResponseModel(
                kaydedilenDepo.getId(),
                kaydedilenDepo.getDepoKodu(),
                kaydedilenDepo.getDepoAciklama(),
                kaydedilenDepo.getIsyeriEntity().getId()
        );
    }
}