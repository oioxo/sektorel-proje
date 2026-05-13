package com.ostim.akillioperasyon.controller.notification;

import com.ostim.akillioperasyon.controller.notification.model.MailRequest;
import com.ostim.akillioperasyon.controller.notification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200") // Angular'dan gelen isteklere izin ver
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody MailRequest request) {
        emailService.sendEmail(request.getTo(), request.getSubject(), request.getBody());
    }
}