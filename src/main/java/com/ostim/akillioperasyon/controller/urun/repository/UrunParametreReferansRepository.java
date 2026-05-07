package com.ostim.akillioperasyon.controller.urun.repository;

import com.ostim.akillioperasyon.entity.UrunParametreReferansEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrunParametreReferansRepository extends JpaRepository<UrunParametreReferansEntity, Long> {
}