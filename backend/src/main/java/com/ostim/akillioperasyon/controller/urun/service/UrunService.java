package com.ostim.akillioperasyon.controller.urun.service;

import com.ostim.akillioperasyon.controller.parametre.repository.ParametreRepository;
import com.ostim.akillioperasyon.controller.urun.model.UrunParametreReferansResponseModel;
import com.ostim.akillioperasyon.controller.urun.model.UrunParametreReferansSaveRequest;
import com.ostim.akillioperasyon.controller.urun.repository.UrunParametreReferansRepository;
import com.ostim.akillioperasyon.controller.urun.repository.UrunRepository;
import com.ostim.akillioperasyon.entity.ParametreEntity;
import com.ostim.akillioperasyon.entity.UrunEntity;
import com.ostim.akillioperasyon.entity.UrunParametreReferansEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrunService {

    private final UrunRepository urunRepository;
    private final UrunParametreReferansRepository referansRepository;
    private final ParametreRepository parametreRepository;

    public UrunService(UrunRepository urunRepository, 
                       UrunParametreReferansRepository referansRepository, 
                       ParametreRepository parametreRepository) {
        this.urunRepository = urunRepository;
        this.referansRepository = referansRepository;
        this.parametreRepository = parametreRepository;
    }

    
    public UrunEntity urunEkle(UrunEntity urun) {
        return urunRepository.save(urun);
    }

    
    public List<UrunEntity> tumUrunleriGetir() {
        return urunRepository.findAll();
    }

    
    public UrunParametreReferansResponseModel referansEkle(UrunParametreReferansSaveRequest request) {
        
        UrunEntity urun = urunRepository.findById(request.getUrunId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip ürün bulunamadı!"));

        
        ParametreEntity parametre = parametreRepository.findById(request.getParametreId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip parametre bulunamadı!"));

        
        UrunParametreReferansEntity referans = new UrunParametreReferansEntity();
        referans.setUrun(urun); 
        referans.setParametre(parametre);
        referans.setMinDeger(request.getMinDeger());
        referans.setMaxDeger(request.getMaxDeger());

        
        UrunParametreReferansEntity kaydedilen = referansRepository.save(referans);

        
        return new UrunParametreReferansResponseModel(
                kaydedilen.getId(),
                kaydedilen.getUrun().getAd(),
                kaydedilen.getParametre().getParametreAdi(),
                kaydedilen.getMinDeger(),
                kaydedilen.getMaxDeger()
        );
    }

    
    public void olcumDegerlendir(String urunAd, String parametreAd, double olculenDeger, double minDeger, double maxDeger) {
        if (olculenDeger < minDeger || olculenDeger > maxDeger) {
            uyariMailiGonder(urunAd, parametreAd, olculenDeger);
        }
    }

    private void uyariMailiGonder(String urunAd, String parametreAd, double deger) {
        System.out.println("DİKKAT! Uyarı Maili Gönderildi: " + urunAd + " için " + parametreAd + " değeri sınırların dışında! Ölçülen: " + deger);
    }
}