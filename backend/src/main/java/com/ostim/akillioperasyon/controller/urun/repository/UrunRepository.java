package com.ostim.akillioperasyon.controller.urun.repository;

import com.ostim.akillioperasyon.entity.UrunEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrunRepository extends JpaRepository<UrunEntity, Long> {
}