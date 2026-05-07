package com.ostim.akillioperasyon.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "parametre_deger_kayit")
public class ParametreDegerKayitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "depo_entity_id")
    private DepoEntity depoEntity;

    @ManyToOne
    @JoinColumn(name = "parametre_entity_id")
    private ParametreEntity parametreEntity;

    @Column(name = "olcum_degeri")
    private Double olcumDegeri;

    @Column(name = "created_date")
    private Date createdDate;
}
