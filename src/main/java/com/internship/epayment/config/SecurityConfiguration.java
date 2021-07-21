package com.internship.epayment.config;

import com.internship.epayment.enums.AuthorityEnum;
import com.internship.epayment.security.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomAuthenticationProvider authenticationProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .httpBasic()
            .and()
                .cors()
            .and()
                .csrf().disable()
                .authorizeRequests()
                // uncomment after adding auth in frontend
//                .antMatchers("/api/login").permitAll()
//
//                .antMatchers("/api/users").hasAnyAuthority(AuthorityEnum.EPAY_USERS.getCode(),AuthorityEnum.EPAY_ADMIN.getCode()) // andreea 2
//                .antMatchers("/api/categories").hasAnyAuthority(AuthorityEnum.EPAY_CATEG.getCode(),AuthorityEnum.EPAY_ADMIN.getCode()) //luiza 3
//                .antMatchers("/api/authorities").hasAnyAuthority(AuthorityEnum.EPAY_AUTH.getCode(),AuthorityEnum.EPAY_ADMIN.getCode()) //lorena 4
//                .antMatchers("/api/**").hasAuthority(AuthorityEnum.EPAY_ADMIN.getCode())
//                .anyRequest().permitAll();

                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/users").hasAuthority(AuthorityEnum.EPAY_USERS.getCode())
                .antMatchers("/api/categories").hasAuthority(AuthorityEnum.EPAY_CATEG.getCode())
                .antMatchers("/api/authorities").hasAuthority(AuthorityEnum.EPAY_AUTH.getCode())
                .antMatchers("/api/**").hasAuthority(AuthorityEnum.EPAY_ADMIN.getCode())
                .anyRequest().permitAll();
    }
}
