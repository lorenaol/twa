package com.internship.epayment.serviceImpl;

import com.internship.epayment.entity.Category;
import com.internship.epayment.entity.Product;
import com.internship.epayment.entity.User;
import com.internship.epayment.repository.CategoryRepository;
import com.internship.epayment.repository.ProductRepository;
import com.internship.epayment.service.EmailService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Service
@EnableScheduling
public class EmailServiceImpl implements EmailService {
    private final TemplateEngine templateEngine;

    private final JavaMailSender javaMailSender;

    public EmailServiceImpl(TemplateEngine templateEngine, JavaMailSender javaMailSender) {
        this.templateEngine = templateEngine;
        this.javaMailSender = javaMailSender;
    }

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

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

    @SneakyThrows
    public String sendMailProductsCateg(int products, int categories, String c) throws MessagingException{
        Context context = new Context();
        context.setVariable("products", products);
        context.setVariable("categories", categories);
        String process = templateEngine.process(c, context);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject("Products and categories per " + c);
        helper.setText(process, true);
        helper.setTo("raduna.daniel@trencadis.ro");
        javaMailSender.send(mimeMessage);
        return "Sent";
    }

    @Scheduled(cron = "0 0 16 * * ?")
    public void productsAndCategoriesToday() throws MessagingException{
        List<Product> products = productRepository.findProductsByDateToday();
        List<Category> categories = categoryRepository.findCategoriesByDateToday();

        sendMailProductsCateg(products.size(), categories.size(), "day");
    }

    @Scheduled(cron = "0 0 16 ? * FRI")
    public void productsAndCategoriesWeek() throws MessagingException{
        List<Product> products = productRepository.findProductsByDateWeek();
        List<Category> categories = categoryRepository.findCategoriesByDateWeek();
        int nrProducts = 0, nrCategories = 0;
        Date today = new Date();
        Calendar calendar1 = new GregorianCalendar();
        calendar1.setTime(today);
        int week1 = calendar1.get(calendar1.WEEK_OF_YEAR);

        for(Product product : products){
            Date d = product.getCreatedDate();
            Calendar calendar2 = new GregorianCalendar();
            calendar2.setTime(d);
            int week2 = calendar2.get(calendar2.WEEK_OF_YEAR);
            if(d.getYear() == today.getYear() && week1 == week2)
                nrProducts++;

        }

        for(Category category : categories){
            Date d = category.getCreatedDate();
            Calendar calendar2 = new GregorianCalendar();
            calendar2.setTime(d);
            int week2 = calendar2.get(calendar2.WEEK_OF_YEAR);
            if(d.getYear() == today.getYear() && week1 == week2)
                nrCategories++;
        }
        sendMailProductsCateg(nrProducts, nrCategories, "week");
    }

    @Scheduled(cron = "0 0 16 LW * ?")
    public void productsAndCategoriesMonth() throws MessagingException{
        List<Product> products = productRepository.findProductsByDateMonth();
        List<Category> categories = categoryRepository.findCategoriesByDateMonth();
        int nrProducts = 0, nrCategories = 0;
        Date today = new Date();
        for(Product product : products){
            Date d = product.getCreatedDate();
            if(d.getMonth() == today.getMonth() && d.getYear() == today.getYear())
                nrProducts++;
        }
        for(Category category : categories){
            Date d = category.getCreatedDate();
            if(d.getMonth() == today.getMonth() && d.getYear() == today.getYear())
                nrCategories++;
        }
        sendMailProductsCateg(nrProducts, nrCategories, "month");
    }
}
