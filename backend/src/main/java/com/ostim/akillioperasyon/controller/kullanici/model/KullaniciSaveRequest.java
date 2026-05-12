package com.ostim.akillioperasyon.controller.kullanici.model;

public record KullaniciSaveRequest(String username,String password,String email,String phoneNumber,Long isyeriId) {
}
