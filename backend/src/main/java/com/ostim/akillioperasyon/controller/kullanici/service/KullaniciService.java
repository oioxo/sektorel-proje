package com.ostim.akillioperasyon.controller.kullanici.service;

import com.ostim.akillioperasyon.controller.isyeri.repository.IsyeriRepository;
import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciResponseModel;
import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciSaveRequest;
import com.ostim.akillioperasyon.controller.kullanici.model.KullaniciUpdateRequest;
import com.ostim.akillioperasyon.controller.kullanici.repository.KullaniciRepository;
import com.ostim.akillioperasyon.entity.IsyeriEntity;
import com.ostim.akillioperasyon.entity.KullaniciEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KullaniciService {

    private final KullaniciRepository kullaniciRepository;
    private final IsyeriRepository isyeriRepository;

    public KullaniciService(KullaniciRepository kullaniciRepository, IsyeriRepository isyeriRepository) {
        this.kullaniciRepository = kullaniciRepository;
        this.isyeriRepository = isyeriRepository;
    }

    public Long save(KullaniciSaveRequest kullaniciSaveRequest) {
        KullaniciEntity kullaniciEntity = new KullaniciEntity();

        kullaniciEntity.setUsername(kullaniciSaveRequest.username());
        /*password encode şifre veritabanına hashlenerek kaydedilir. araştırma ödevi*/
        kullaniciEntity.setPassword(kullaniciSaveRequest.password());
        kullaniciEntity.setEmail(kullaniciSaveRequest.email());
        kullaniciEntity.setPhoneNumber(kullaniciSaveRequest.phoneNumber());

        IsyeriEntity isyeriEntity = isyeriRepository.findById(kullaniciSaveRequest.isyeriId()).get();
        kullaniciEntity.setIsyeriEntity(isyeriEntity);

        return kullaniciRepository.save(kullaniciEntity).getId();
    }


    public Long update(KullaniciUpdateRequest kullaniciUpdateRequest) {
        KullaniciEntity kullaniciEntity = kullaniciRepository.findById(kullaniciUpdateRequest.id()).get();
        kullaniciEntity.setUsername(kullaniciUpdateRequest.username());
        kullaniciEntity.setPassword(kullaniciUpdateRequest.password());
        kullaniciEntity.setEmail(kullaniciUpdateRequest.email());
        kullaniciEntity.setPhoneNumber(kullaniciUpdateRequest.phoneNumber());
        IsyeriEntity isyeriEntity = isyeriRepository.findById(kullaniciUpdateRequest.isyeriId()).get();
        kullaniciEntity.setIsyeriEntity(isyeriEntity);
        return kullaniciRepository.save(kullaniciEntity).getId();
    }

    public List<KullaniciResponseModel> getAll() {
        List<KullaniciEntity> butunKullanicilar = kullaniciRepository.findAll();
        return butunKullanicilar.stream().map(a -> new KullaniciResponseModel(a.getId(), a.getUsername(), a.getEmail(), a.getPhoneNumber(), a.getIsyeriEntity().getId(), a.getIsyeriEntity().getIsyeriAdi())).toList();
    }

    public KullaniciResponseModel getById(Long id) {
        KullaniciEntity kullaniciEntity = kullaniciRepository.findById(id).get();
        return new KullaniciResponseModel(kullaniciEntity.getId(), kullaniciEntity.getUsername(), kullaniciEntity.getEmail(), kullaniciEntity.getPhoneNumber(), kullaniciEntity.getIsyeriEntity().getId(), kullaniciEntity.getIsyeriEntity().getIsyeriAdi());
    }
}
