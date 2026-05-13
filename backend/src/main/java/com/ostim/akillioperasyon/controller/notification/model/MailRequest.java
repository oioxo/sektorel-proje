package com.ostim.akillioperasyon.controller.notification.model;

import lombok.Data;

@Data // Getter ve Setter'ları otomatik oluşturur
public class MailRequest {
    private String to;
    private String subject;
    private String body;
}