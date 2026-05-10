package com.ostim.akillioperasyon.controller.depo.repository;

import com.ostim.akillioperasyon.entity.DepoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepoRepository extends JpaRepository<DepoEntity, Long> {
}