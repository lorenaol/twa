package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.User;
import com.internship.epayment.service.EmailService;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {



    private final TemplateEngine templateEngine;

    private final JavaMailSender javaMailSender;

    public EmailServiceImpl(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;

    }
    @SneakyThrows
    public String sendMail(User user) throws MessagingException{
        Context context = new Context();
        context.setVariable("user", user);
        String process = templateEngine.process("welcome", context);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("Welcome " + user.getName());
        helper.setText(process, true);
        helper.setTo(user.getEmail());
        javaMailSender.send(mimeMessage);
        return "Sent";
    }


    @SneakyThrows
    public String sendMailFPass(User user) throws MessagingException{
        Context context = new Context();
        context.setVariable("user", user);
        String process = templateEngine.process("token", context);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("Welcome " + user.getName());
        helper.setText(process, true);
        helper.setTo(user.getEmail());
        javaMailSender.send(mimeMessage);
        return "Sent";
    }
    @SneakyThrows
    public String sendMailCPass(User user) throws MessagingException{
        Context context = new Context();
        context.setVariable("user", user);
        String process = templateEngine.process("change_password", context);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("Hello " + user.getName());
        helper.setText(process, true);
        helper.setTo(user.getEmail());
        javaMailSender.send(mimeMessage);
        return "Sent";
    }


}
