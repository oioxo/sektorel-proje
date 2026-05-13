package com.ostim.akillioperasyon.controller.notification;

import com.ostim.akillioperasyon.controller.notification.model.MailRequest;
import com.ostim.akillioperasyon.controller.notification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    
    @Value("${app.notification.supervisor-email}")
    private String supervisorEmail;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody MailRequest request) {
        
        emailService.sendEmail(request.getTo(), request.getSubject(), request.getBody());

        
        if (supervisorEmail != null && !supervisorEmail.isEmpty()) {
            emailService.sendEmail(supervisorEmail, "BİLGİ: " + request.getSubject(), request.getBody());
            System.out.println("✅ Çift mail tetiklendi: " + request.getTo() + " ve " + supervisorEmail);
        } else {
            System.err.println("❌ HATA: YAML'dan supervisor maili okunamadı!");
        }
    }
}