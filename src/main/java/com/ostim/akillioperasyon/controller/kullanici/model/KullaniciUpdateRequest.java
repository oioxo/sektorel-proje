package com.ostim.akillioperasyon.controller.kullanici.model;

public record KullaniciUpdateRequest(Long id,String username,String password,String email,String phoneNumber,Long isyeriId) {
}
