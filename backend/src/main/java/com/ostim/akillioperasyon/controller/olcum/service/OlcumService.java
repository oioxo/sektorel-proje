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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class OlcumService {

    private final OlcumRepository olcumRepository;
    private final DepoRepository depoRepository;
    private final ParametreRepository parametreRepository;
    private final UrunParametreReferansRepository referansRepository;
    private final JavaMailSender mailSender; 

    public OlcumService(OlcumRepository olcumRepository, DepoRepository depoRepository,
                        ParametreRepository parametreRepository, UrunParametreReferansRepository referansRepository,
                        JavaMailSender mailSender) {
        this.olcumRepository = olcumRepository;
        this.depoRepository = depoRepository;
        this.parametreRepository = parametreRepository;
        this.referansRepository = referansRepository;
        this.mailSender = mailSender;
    }

    public OlcumResponseModel olcumKaydetVeDegerlendir(OlcumSaveRequest request) {
        DepoEntity depo = depoRepository.findById(request.getDepoId())
                .orElseThrow(() -> new RuntimeException("Depo bulunamadı!"));
        ParametreEntity parametre = parametreRepository.findById(request.getParametreId())
                .orElseThrow(() -> new RuntimeException("Parametre bulunamadı!"));

        ParametreDegerKayitEntity kayit = new ParametreDegerKayitEntity();
        kayit.setDepoEntity(depo);
        kayit.setParametreEntity(parametre);
        kayit.setOlcumDegeri(request.getOlcumDegeri());
        kayit.setCreatedDate(new Date());
        olcumRepository.save(kayit);

        UrunParametreReferansEntity referans = referansRepository.findByUrun_IdAndParametre_Id(request.getUrunId(), request.getParametreId());
        String durumMesaji = "Ölçüm Normal. Sınırlar içerisinde.";

        if (referans != null) {
            double min = referans.getMinDeger();
            double max = referans.getMaxDeger();
            double olculen = request.getOlcumDegeri();

            if (olculen < min || olculen > max) {
                durumMesaji = "DİKKAT! " + parametre.getParametreAdi() + " değeri sınırların dışında!";
                
                try {
                    SimpleMailMessage message = new SimpleMailMessage();
                    
                    // BURAYA HOCANIN MAİLİNİ YAZ
                    message.setTo("serhanogurlu@gmail.com"); 
                    
                    message.setSubject("Staj Projesi: Akıllı Operasyon Sistemi - Otomatik Uyarı Testi");
                    
                    message.setText("Sayın Hocam,\n\n" +
                                    "Bu e-posta, staj projem kapsamında geliştirdiğim otomatik kritik eşik kontrol mekanizması tarafından oluşturulmuştur.\n\n" +
                                    "Sistem tarafından tespit edilen limit aşımı detayları:\n" +
                                    "--------------------------------------------------\n" +
                                    "İşlem Yapılan Depo: " + depo.getDepoAciklama() + "\n" +
                                    "Kontrol Edilen Parametre: " + parametre.getParametreAdi() + "\n" +
                                    "Ölçülen Değer: " + olculen + "\n" +
                                    "Referans Aralığı (Min - Max): " + min + " - " + max + "\n" +
                                    "--------------------------------------------------\n" +
                                    "Bu uyarı, veritabanına kaydedilen değerin güvenli sınırların dışında kalması sebebiyle sistem tarafından otomatik olarak tetiklenmiştir.\n\n" +
                                    "İyi çalışmalar dilerim.\n" +
                                    "Arda Özkan - Stajyer");
                    
                    mailSender.send(message);
                    System.out.println(">>> Bilgilendirme maili başarıyla gönderildi! <<<");
                } catch (Exception e) {
                    System.out.println(">>> Mail gönderilirken hata oluştu: " + e.getMessage());
                }
            }
        }

        return new OlcumResponseModel(durumMesaji, request.getOlcumDegeri(), kayit.getCreatedDate());
    }
}