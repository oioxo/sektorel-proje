package com.ostim.akillioperasyon.controller.olcum.service;

import com.ostim.akillioperasyon.controller.depo.repository.DepoRepository;
import com.ostim.akillioperasyon.controller.olcum.model.OlcumResponseModel;
import com.ostim.akillioperasyon.controller.olcum.model.OlcumSaveRequest;
import com.ostim.akillioperasyon.controller.olcum.repository.OlcumRepository;
import com.ostim.akillioperasyon.controller.parametre.repository.ParametreRepository;
import com.ostim.akillioperasyon.controller.urun.repository.UrunParametreReferansRepository;
import com.ostim.akillioperasyon.entity.DepoEntity;
import com.ostim.akillioperasyon.entity.ParametreDegerKayitEntity;
import com.ostim.akillioperasyon.entity.ParametreEntity;
import com.ostim.akillioperasyon.entity.UrunParametreReferansEntity;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class OlcumService {

    private final OlcumRepository olcumRepository;
    private final DepoRepository depoRepository;
    private final ParametreRepository parametreRepository;
    private final UrunParametreReferansRepository referansRepository;

    public OlcumService(OlcumRepository olcumRepository, DepoRepository depoRepository,
                        ParametreRepository parametreRepository, UrunParametreReferansRepository referansRepository) {
        this.olcumRepository = olcumRepository;
        this.depoRepository = depoRepository;
        this.parametreRepository = parametreRepository;
        this.referansRepository = referansRepository;
    }

    public OlcumResponseModel olcumKaydetVeDegerlendir(OlcumSaveRequest request) {
        DepoEntity depo = depoRepository.findById(request.getDepoId())
                .orElseThrow(() -> new RuntimeException("Depo bulunamadı!"));
        ParametreEntity parametre = parametreRepository.findById(request.getParametreId())
                .orElseThrow(() -> new RuntimeException("Parametre bulunamadı!"));

        // 1. Ölçümü Veritabanına Kaydet
        ParametreDegerKayitEntity kayit = new ParametreDegerKayitEntity();
        kayit.setDepoEntity(depo);
        kayit.setParametreEntity(parametre);
        kayit.setOlcumDegeri(request.getOlcumDegeri());
        kayit.setCreatedDate(new Date());
        olcumRepository.save(kayit);

        // 2. Akıllı Kontrol: Referans aralığını kontrol et
        UrunParametreReferansEntity referans = referansRepository.findByUrun_IdAndParametre_Id(request.getUrunId(), request.getParametreId());
        String durumMesaji = "Ölçüm Normal. Sınırlar içerisinde.";

        if (referans != null) {
            double min = referans.getMinDeger();
            double max = referans.getMaxDeger();
            double olculen = request.getOlcumDegeri();

            if (olculen < min || olculen > max) {
                durumMesaji = "DİKKAT! " + parametre.getParametreAdi() + " değeri (" + olculen + ") sınırların dışında! (Olması gereken: " + min + " - " + max + ")";
                System.out.println("*************************************************");
                System.out.println("UYARI: " + durumMesaji);
                System.out.println("*************************************************");
            }
        }

        return new OlcumResponseModel(durumMesaji, request.getOlcumDegeri(), kayit.getCreatedDate());
    }
}