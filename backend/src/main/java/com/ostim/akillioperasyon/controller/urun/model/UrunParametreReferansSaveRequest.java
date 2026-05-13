package com.ostim.akillioperasyon.controller.urun.model;

public class UrunParametreReferansSaveRequest {
    private Long urunId;
    private Long parametreId;
    private Double minDeger;
    private Double maxDeger;

    
    public Long getUrunId() { return urunId; }
    public void setUrunId(Long urunId) { this.urunId = urunId; }

    public Long getParametreId() { return parametreId; }
    public void setParametreId(Long parametreId) { this.parametreId = parametreId; }

    public Double getMinDeger() { return minDeger; }
    public void setMinDeger(Double minDeger) { this.minDeger = minDeger; }

    public Double getMaxDeger() { return maxDeger; }
    public void setMaxDeger(Double maxDeger) { this.maxDeger = maxDeger; }
}