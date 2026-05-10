package com.ostim.akillioperasyon.controller.olcum.repository;

import com.ostim.akillioperasyon.entity.ParametreDegerKayitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OlcumRepository extends JpaRepository<ParametreDegerKayitEntity, Long> {
}