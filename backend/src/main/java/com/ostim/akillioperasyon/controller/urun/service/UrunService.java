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

    // Sisteme yeni bir ürün kaydetmek için kullanıyoruz
    public UrunEntity urunEkle(UrunEntity urun) {
        return urunRepository.save(urun);
    }

    // Veritabanındaki tüm ürünleri listelemek için kullanıyoruz
    public List<UrunEntity> tumUrunleriGetir() {
        return urunRepository.findAll();
    }

    // YENİ: Ürün ve Parametre eşleştirmesi (Referans Aralıkları Belirleme)
    public UrunParametreReferansResponseModel referansEkle(UrunParametreReferansSaveRequest request) {
        // 1. Ürünü bul
        UrunEntity urun = urunRepository.findById(request.getUrunId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip ürün bulunamadı!"));

        // 2. Parametreyi bul
        ParametreEntity parametre = parametreRepository.findById(request.getParametreId())
                .orElseThrow(() -> new RuntimeException("Belirtilen ID'ye sahip parametre bulunamadı!"));

        // 3. Referans nesnesini oluştur ve doldur
        UrunParametreReferansEntity referans = new UrunParametreReferansEntity();
        referans.setUrun(urun); 
        referans.setParametre(parametre);
        referans.setMinDeger(request.getMinDeger());
        referans.setMaxDeger(request.getMaxDeger());

        // 4. Veritabanına kaydet
        UrunParametreReferansEntity kaydedilen = referansRepository.save(referans);

        // 5. Kullanıcıya sonucu dön
        return new UrunParametreReferansResponseModel(
                kaydedilen.getId(),
                kaydedilen.getUrun().getAd(),
                kaydedilen.getParametre().getParametreAdi(),
                kaydedilen.getMinDeger(),
                kaydedilen.getMaxDeger()
        );
    }

    // Sensörden gelen değeri, ürünün referans aralığı ile karşılaştırıyoruz
    public void olcumDegerlendir(String urunAd, String parametreAd, double olculenDeger, double minDeger, double maxDeger) {
        if (olculenDeger < minDeger || olculenDeger > maxDeger) {
            uyariMailiGonder(urunAd, parametreAd, olculenDeger);
        }
    }

    private void uyariMailiGonder(String urunAd, String parametreAd, double deger) {
        System.out.println("DİKKAT! Uyarı Maili Gönderildi: " + urunAd + " için " + parametreAd + " değeri sınırların dışında! Ölçülen: " + deger);
    }
}