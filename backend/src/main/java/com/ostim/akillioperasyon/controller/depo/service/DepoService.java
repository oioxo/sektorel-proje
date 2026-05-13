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

    public List<DepoResponseModel> tumDepolariGetir() {
        return depoRepository.findAll().stream()
                .map(depo -> {
                    String depoAdi = depo.getDepoAdi();
                    String urunTipi = depo.getUrunTipi();

                    if ((depoAdi == null || urunTipi == null) && depo.getDepoAciklama() != null && depo.getDepoAciklama().contains("||")) {
                        String[] parcalar = depo.getDepoAciklama().split("\\|\\|");
                        if (depoAdi == null && parcalar.length > 0) {
                            depoAdi = parcalar[0];
                        }
                        if (urunTipi == null && parcalar.length > 1) {
                            urunTipi = parcalar[1];
                        }
                    }

                    return toResponseModel(depo, depoAdi, urunTipi);
                })
                .collect(Collectors.toList());
    }

    public DepoResponseModel depoEkle(DepoSaveRequest request) {
        IsyeriEntity isyeri = isyeriRepository.findById(request.getIsyeriId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip işyeri bulunamadı!"));

        DepoEntity depo = new DepoEntity();
        applyRequestToEntity(depo, request);
        depo.setIsyeriEntity(isyeri);

        DepoEntity kaydedilenDepo = depoRepository.save(depo);
        return toResponseModel(kaydedilenDepo, kaydedilenDepo.getDepoAdi(), kaydedilenDepo.getUrunTipi());
    }

    public DepoResponseModel depoGuncelle(Long id, DepoSaveRequest request) {
        DepoEntity depo = depoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip depo bulunamadı!"));

        if (request.getDepoAdi() != null) depo.setDepoAdi(request.getDepoAdi());
        if (request.getUrunTipi() != null) depo.setUrunTipi(request.getUrunTipi());
        if (request.getSicaklik() != null) depo.setSicaklik(request.getSicaklik());
        if (request.getMinSicaklik() != null) depo.setMinSicaklik(request.getMinSicaklik());
        if (request.getMaxSicaklik() != null) depo.setMaxSicaklik(request.getMaxSicaklik());
        if (request.getDepoKodu() != null) depo.setDepoKodu(request.getDepoKodu());
        if (request.getKullaniciAdi() != null) depo.setKullaniciAdi(request.getKullaniciAdi());
        if (request.getKullaniciEmail() != null) depo.setKullaniciEmail(request.getKullaniciEmail());
        if (request.getKullaniciTelefon() != null) depo.setKullaniciTelefon(request.getKullaniciTelefon());

        DepoEntity guncellenen = depoRepository.save(depo);
        return toResponseModel(guncellenen, guncellenen.getDepoAdi(), guncellenen.getUrunTipi());
    }

    public void depoSil(Long id) {
        DepoEntity depo = depoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip depo bulunamadı!"));
        depoRepository.delete(depo);
    }

    private void applyRequestToEntity(DepoEntity depo, DepoSaveRequest request) {
        depo.setDepoKodu(request.getDepoKodu());
        depo.setDepoAdi(request.getDepoAdi());
        depo.setUrunTipi(request.getUrunTipi());
        depo.setSicaklik(request.getSicaklik());
        depo.setMinSicaklik(request.getMinSicaklik());
        depo.setMaxSicaklik(request.getMaxSicaklik());
        depo.setDepoAciklama(request.getDepoAciklama());
        depo.setKullaniciAdi(request.getKullaniciAdi());
        depo.setKullaniciEmail(request.getKullaniciEmail());
        depo.setKullaniciTelefon(request.getKullaniciTelefon());
    }

    private DepoResponseModel toResponseModel(DepoEntity depo, String depoAdi, String urunTipi) {
        return new DepoResponseModel(
                depo.getId(),
                depo.getDepoKodu(),
                depoAdi,
                urunTipi,
                depo.getSicaklik(),
                depo.getMinSicaklik(),
                depo.getMaxSicaklik(),
                depo.getDepoAciklama(),
                depo.getKullaniciAdi(),
                depo.getKullaniciEmail(),
                depo.getKullaniciTelefon(),
                depo.getIsyeriEntity() != null ? depo.getIsyeriEntity().getId() : null
        );
    }
}