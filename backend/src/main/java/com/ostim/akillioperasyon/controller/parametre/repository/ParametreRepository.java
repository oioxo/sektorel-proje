package com.ostim.akillioperasyon.controller.parametre.repository;

import com.ostim.akillioperasyon.entity.ParametreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametreRepository extends JpaRepository<ParametreEntity, Long> {
}