package com.ostim.akillioperasyon.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "urun_parametre_referans")
public class UrunParametreReferansEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "urun_id", nullable = false)
    private UrunEntity urun;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parametre_id", nullable = false)
    private ParametreEntity parametre;

    @Column(name = "min_deger", nullable = false)
    private Double minDeger;

    @Column(name = "max_deger", nullable = false)
    private Double maxDeger;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UrunEntity getUrun() { return urun; }
    public void setUrun(UrunEntity urun) { this.urun = urun; }

    public ParametreEntity getParametre() { return parametre; }
    public void setParametre(ParametreEntity parametre) { this.parametre = parametre; }

    public Double getMinDeger() { return minDeger; }
    public void setMinDeger(Double minDeger) { this.minDeger = minDeger; }

    public Double getMaxDeger() { return maxDeger; }
    public void setMaxDeger(Double maxDeger) { this.maxDeger = maxDeger; }
}