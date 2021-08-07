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
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/users/add").permitAll()
                .antMatchers("/api/users/post/**").permitAll()
                .antMatchers("/api/users/forgot-password/**").permitAll()
                .antMatchers("/api/users/reset-password/**").permitAll()
                .antMatchers("/api/users/**").hasAuthority(AuthorityEnum.EPAY_ADMIN.getCode())
                .antMatchers("/api/categories/**").hasAuthority(AuthorityEnum.EPAY_CATEG.getCode())//luiza 3
                .antMatchers("/api/products/**").hasAuthority(AuthorityEnum.EPAY_PRODUCT.getCode())//lorena 3
                .antMatchers("/api/authorities/**").hasAuthority(AuthorityEnum.EPAY_AUTH.getCode())//lorena 4
                .antMatchers("/api/roles/**").hasAuthority(AuthorityEnum.EPAY_AUTH.getCode())//lorena 4
                .antMatchers("/api/**").hasAuthority(AuthorityEnum.EPAY_ADMIN.getCode())
                .anyRequest().permitAll();
    }
}
