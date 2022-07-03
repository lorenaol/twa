package com.internship.epayment.enums;

public enum AuthorityEnum {
    EPAY_ADMIN("EPAY_ADMIN"),
    EPAY_USERS("EPAY_USERS"),
    EPAY_CATEG("EPAY_CATEG"),
    EPAY_AUTH("EPAY_AUTH"),
    EPAY_PRODUCT("EPAY_PRODUCT"),
    TUTOR("fD"),
    STUDENT("DSC"),
    USERS("EPAY_USERS");

    private final String code;

    AuthorityEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
