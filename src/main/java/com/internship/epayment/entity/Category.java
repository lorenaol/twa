package com.internship.epayment.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_seq")
    @SequenceGenerator(name = "categories_seq", allocationSize = 1)
    private Long id;

    @Column(name = "category_name",length = 100)
    private String categoryName;

    @Column(name = "category_code",length = 100)
    private String categoryCode;

    @Column(name = "category_description",length = 100)
    private String categoryDescription;

    @Column(name = "store_id", length = 100)
    private String storeId;

    @Column(name = "date_added", length = 100)
    private Date dateAdded;

    @Column(name = "last_updated", length = 100)
    private Date lastUpdated;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

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

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public String getStoreId() {
        return storeId;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}