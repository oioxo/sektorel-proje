package com.ostim.akillioperasyon.controller.kullanici.repository;

import com.ostim.akillioperasyon.entity.KullaniciEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KullaniciRepository extends JpaRepository<KullaniciEntity,Long> {
}
