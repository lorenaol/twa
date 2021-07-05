package com.internship.epayment.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_seq")
    @SequenceGenerator(name = "categories_seq", allocationSize = 1)
    private Long id;

    @Column(name = "category_name",length = 100)
    private String categoryName;

    @Column(name = "category_code", length = 100)
    private String categoryCode;

    @Column(name = "category_description", length = 100)
    private String category_description;

    @Column(name = "store_id", length = 100)
    private String store_id;

    @Temporal(TemporalType.DATE)
        @Column(name = "date_added", length = 100)
        private Date dateAdded;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategory_description() {
        return category_description;
    }

    public void setCategory_description(String category_description) {
        this.category_description = category_description;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getStore_id() {
        return store_id;
    }

    public void setStore_id(String store_id) {
        this.store_id = store_id;
    }
}
