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
    private String depoAciklama;
    private Long isyeriId;
}