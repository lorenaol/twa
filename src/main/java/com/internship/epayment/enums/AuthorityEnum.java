package com.internship.epayment.enums;

public enum AuthorityEnum {
    ADMIN("ADMIN"),
    USERS("USERS");
    private final String code;

    AuthorityEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
