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
@Table(name = "isyeri_parametre")
public class IsyeriParametreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "depo_entity_id")
    private DepoEntity depoEntity;

    @ManyToOne
    @JoinColumn(name = "parametre_entity_id")
    private ParametreEntity parametreEntity;

    @Column(name = "min_referans")
    private Integer minReferans;

    @Column(name = "max_referans")
    private Integer maxReferans;

}
