package com.internship.epayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaRepositories("com.internship.epayment.repository")
public class EpaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpaymentApplication.class, args);
	}

}
