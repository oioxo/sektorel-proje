package com.ostim.akillioperasyon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "depo")
public class DepoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column(name = "depo_kodu")
    private String depoKodu;

    @Column(name = "depo_adi")
    private String depoAdi;

    @Column(name = "urun_tipi")
    private String urunTipi;

    @Column(name = "sicaklik")
    private Double sicaklik;

    @Column(name = "min_sicaklik")
    private Double minSicaklik;

    @Column(name = "max_sicaklik")
    private Double maxSicaklik;

    @Column(name = "depo_aciklama")
    private String depoAciklama;

    @Column(name = "kullanici_adi")
    private String kullaniciAdi;

    @Column(name = "kullanici_email")
    private String kullaniciEmail;

    @Column(name = "kullanici_telefon")
    private String kullaniciTelefon;

    @ManyToOne
    @JoinColumn(name = "isyeri_entity_id")
    private IsyeriEntity isyeriEntity;
}
