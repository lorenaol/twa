package com.internship.epayment.service;

import com.internship.epayment.entity.User;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public interface EmailService {


    String sendMail(User user) throws MessagingException;

    String sendMailFPass(User user) throws MessagingException;

    String sendMailCPass(User user) throws MessagingException;


}
