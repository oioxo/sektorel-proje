package com.ostim.akillioperasyon.controller.depo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepoResponseModel {
    private Long id;
    private String depoKodu;
    private String depoAdi;
    private String urunTipi;
    private Double sicaklik;
    private Double minSicaklik;
    private Double maxSicaklik;
    private String depoAciklama;
    private String kullaniciAdi;
    private String kullaniciEmail;
    private String kullaniciTelefon;
    private Long isyeriId;
}