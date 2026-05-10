package com.ostim.akillioperasyon.controller.olcum.model;

public class OlcumSaveRequest {
    private Long depoId;
    private Long parametreId;
    private Long urunId; 
    private Double olcumDegeri;

    public Long getDepoId() { return depoId; }
    public void setDepoId(Long depoId) { this.depoId = depoId; }
    public Long getParametreId() { return parametreId; }
    public void setParametreId(Long parametreId) { this.parametreId = parametreId; }
    public Long getUrunId() { return urunId; }
    public void setUrunId(Long urunId) { this.urunId = urunId; }
    public Double getOlcumDegeri() { return olcumDegeri; }
    public void setOlcumDegeri(Double olcumDegeri) { this.olcumDegeri = olcumDegeri; }
}