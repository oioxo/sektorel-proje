package com.ostim.akillioperasyon.controller.olcum.model;
import java.util.Date;

public class OlcumResponseModel {
    private String uyariMesaji;
    private Double olcumDegeri;
    private Date olcumTarihi;

    public OlcumResponseModel(String uyariMesaji, Double olcumDegeri, Date olcumTarihi) {
        this.uyariMesaji = uyariMesaji;
        this.olcumDegeri = olcumDegeri;
        this.olcumTarihi = olcumTarihi;
    }

    public String getUyariMesaji() { return uyariMesaji; }
    public void setUyariMesaji(String uyariMesaji) { this.uyariMesaji = uyariMesaji; }
    public Double getOlcumDegeri() { return olcumDegeri; }
    public void setOlcumDegeri(Double olcumDegeri) { this.olcumDegeri = olcumDegeri; }
    public Date getOlcumTarihi() { return olcumTarihi; }
    public void setOlcumTarihi(Date olcumTarihi) { this.olcumTarihi = olcumTarihi; }
}