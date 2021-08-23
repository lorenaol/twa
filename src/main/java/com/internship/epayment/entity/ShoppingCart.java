package com.internship.epayment.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shopping_cart_seq")
    @SequenceGenerator(name = "shopping_cart_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    private Long quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Product getProduct() {
        return product;
    }

    @JsonProperty
    public void setProduct(Product product) {
        this.product = product;
    }
}
