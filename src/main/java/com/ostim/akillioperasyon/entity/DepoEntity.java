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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "depo_kodu")
    private String depoKodu;

    @Column(name = "depo_aciklama")
    private String depoAciklama;

    @ManyToOne
    @JoinColumn(name = "isyeri_entity_id")
    private IsyeriEntity isyeriEntity;

}
