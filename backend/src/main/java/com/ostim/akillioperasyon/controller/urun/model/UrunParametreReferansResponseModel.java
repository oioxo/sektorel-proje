package com.ostim.akillioperasyon.controller.urun.model;

public class UrunParametreReferansResponseModel {
    private Long id;
    private String urunAdi;
    private String parametreAdi;
    private Double minDeger;
    private Double maxDeger;

    public UrunParametreReferansResponseModel() {}

    public UrunParametreReferansResponseModel(Long id, String urunAdi, String parametreAdi, Double minDeger, Double maxDeger) {
        this.id = id;
        this.urunAdi = urunAdi;
        this.parametreAdi = parametreAdi;
        this.minDeger = minDeger;
        this.maxDeger = maxDeger;
    }

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrunAdi() { return urunAdi; }
    public void setUrunAdi(String urunAdi) { this.urunAdi = urunAdi; }

    public String getParametreAdi() { return parametreAdi; }
    public void setParametreAdi(String parametreAdi) { this.parametreAdi = parametreAdi; }

    public Double getMinDeger() { return minDeger; }
    public void setMinDeger(Double minDeger) { this.minDeger = minDeger; }

    public Double getMaxDeger() { return maxDeger; }
    public void setMaxDeger(Double maxDeger) { this.maxDeger = maxDeger; }
}