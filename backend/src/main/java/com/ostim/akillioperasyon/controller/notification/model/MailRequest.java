package com.ostim.akillioperasyon.controller.notification.model;

import lombok.Data;

@Data 
public class MailRequest {
    private String to;
    private String subject;
    private String body;
}