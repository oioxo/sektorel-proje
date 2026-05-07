package com.ostim.akillioperasyon.controller.urun.service;

import org.springframework.stereotype.Service;
import com.ostim.akillioperasyon.entity.UrunEntity;
import com.ostim.akillioperasyon.controller.urun.repository.UrunRepository;
import java.util.List;

@Service
public class UrunService {

    private final UrunRepository urunRepository;

    public UrunService(UrunRepository urunRepository) {
        this.urunRepository = urunRepository;
    }

    // Sisteme yeni bir ürün kaydetmek için kullanıyoruz
    public UrunEntity urunEkle(UrunEntity urun) {
        return urunRepository.save(urun);
    }

    // Veritabanındaki tüm ürünleri listelemek için kullanıyoruz
    public List<UrunEntity> tumUrunleriGetir() {
        return urunRepository.findAll();
    }

    // Sensörden gelen değeri, ürünün referans aralığı ile karşılaştırıyoruz
    public void olcumDegerlendir(String urunAd, String parametreAd, double olculenDeger, double minDeger, double maxDeger) {
        if (olculenDeger < minDeger || olculenDeger > maxDeger) {
            uyariMailiGonder(urunAd, parametreAd, olculenDeger);
        }
    }

    // Şimdilik test amaçlı konsola yazdırıyoruz. İlerleyen aşamada buraya SMTP e-posta ayarlarını ekleyeceğiz.
    private void uyariMailiGonder(String urunAd, String parametreAd, double deger) {
        System.out.println("DİKKAT! Uyarı Maili Gönderildi: " + urunAd + " için " + parametreAd + " değeri sınırların dışında! Ölçülen: " + deger);
    }
}