package com.internship.epayment.dto;

public class CategoryDto {

//    private Long id;

    private String categoryName;
    private String category_description;
    private String category_code;
    private Integer store_id;
    private String date_added;
    private Integer parent_id;

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}



