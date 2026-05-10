package com.ostim.akillioperasyon.controller.depo.service;

import com.ostim.akillioperasyon.controller.depo.model.DepoResponseModel;
import com.ostim.akillioperasyon.controller.depo.model.DepoSaveRequest;
import com.ostim.akillioperasyon.controller.depo.repository.DepoRepository;
import com.ostim.akillioperasyon.controller.isyeri.repository.IsyeriRepository;
import com.ostim.akillioperasyon.entity.DepoEntity;
import com.ostim.akillioperasyon.entity.IsyeriEntity;
import org.springframework.stereotype.Service;

@Service
public class DepoService {

    private final DepoRepository depoRepository;
    private final IsyeriRepository isyeriRepository;

    public DepoService(DepoRepository depoRepository, IsyeriRepository isyeriRepository) {
        this.depoRepository = depoRepository;
        this.isyeriRepository = isyeriRepository;
    }

    public DepoResponseModel depoEkle(DepoSaveRequest request) {
        // İsteğin içindeki isyeriId ile veritabanından o işyerini buluyoruz
        IsyeriEntity isyeri = isyeriRepository.findById(request.getIsyeriId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip işyeri bulunamadı!"));

        // Yeni bir Depo Entity oluşturup içini dolduruyoruz
        DepoEntity depo = new DepoEntity();
        depo.setDepoKodu(request.getDepoKodu());
        depo.setDepoAciklama(request.getDepoAciklama());
        depo.setIsyeriEntity(isyeri); // Bulduğumuz işyerini depoya bağlıyoruz

        // Veritabanına kaydediyoruz
        DepoEntity kaydedilenDepo = depoRepository.save(depo);

        // Kullanıcıya döneceğimiz response modelini hazırlıyoruz
        return new DepoResponseModel(
                kaydedilenDepo.getId(),
                kaydedilenDepo.getDepoKodu(),
                kaydedilenDepo.getDepoAciklama(),
                kaydedilenDepo.getIsyeriEntity().getId()
        );
    }
}