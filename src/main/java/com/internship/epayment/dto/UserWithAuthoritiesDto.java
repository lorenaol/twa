package com.internship.epayment.dto;

import java.util.List;

public class UserWithAuthoritiesDto {

    private String email;
    private List<String> authorityCode;

    public UserWithAuthoritiesDto(String userName, List<String> authorityCode) {
        this.email = userName;
        this.authorityCode = authorityCode;
    }

    public String getUserName() {
        return email;
    }

    public void setUserName(String userName) {
        this.email = userName;
    }

    public List<String> getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(List<String> authorityCode) {
        this.authorityCode = authorityCode;
    }
}
