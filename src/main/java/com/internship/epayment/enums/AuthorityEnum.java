package com.internship.epayment.enums;

public enum AuthorityEnum {
    EPAY_ADMIN("EPAY_ADMIN"),
    EPAY_CATEG("EPAY_CATEG");
    private final String code;

    AuthorityEnum(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }

}
