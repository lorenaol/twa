package com.internship.epayment.rest;

import com.internship.epayment.entity.User;
import com.internship.epayment.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping(path = "/api/email")
public class EmailController {
//    private EmailSenderService emailService;
//
//    /*
//     * Send HTML mail with inline image
//     */
//    @RequestMapping(value = "/sendMailWithInlineImage", method = RequestMethod.POST)
//    public String sendMailWithInline(
//            @RequestParam("recipientName") final String recipientName,
//            @RequestParam("recipientEmail") final String recipientEmail,
//            @RequestParam("image") final MultipartFile image,
//            final Locale locale)
//            throws MessagingException, IOException {
//
//        this.emailService.sendMailWithInline(
//                recipientName, recipientEmail, image.getName(),
//                image.getBytes(), image.getContentType(), locale);
//        return "redirect:sent.html";
//
//    }
    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendMail(@RequestBody User user) throws MessagingException{
        emailService.sendMail(user);
        return "Email Sent Successsfully.!";

    }



}
