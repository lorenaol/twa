package com.internship.epayment.dto;

import java.util.List;

public class UserWithAuthoritiesDto {

    private String userName;
    private List<String> authorityCode;

    public UserWithAuthoritiesDto(String userName, List<String> authorityCode) {
        this.userName = userName;
        this.authorityCode = authorityCode;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getAuthorityCode() {
        return authorityCode;
    }

    public void setAuthorityCode(List<String> authorityCode) {
        this.authorityCode = authorityCode;
    }
}
