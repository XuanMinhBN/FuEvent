package com.fuevent.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A OrderDiscount.
 */
@Entity
@Table(name = "order_discount")
public class OrderDiscount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "discount_id")
    private Long discountId;

    @Column(name = "applied_at")
    private Instant appliedAt;

    @ManyToOne
    private Discount discount;

    @ManyToOne
    @JsonIgnoreProperties(value = { "orderDiscounts" }, allowSetters = true)
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OrderDiscount id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return this.orderId;
    }

    public OrderDiscount orderId(Long orderId) {
        this.setOrderId(orderId);
        return this;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDiscountId() {
        return this.discountId;
    }

    public OrderDiscount discountId(Long discountId) {
        this.setDiscountId(discountId);
        return this;
    }

    public void setDiscountId(Long discountId) {
        this.discountId = discountId;
    }

    public Instant getAppliedAt() {
        return this.appliedAt;
    }

    public OrderDiscount appliedAt(Instant appliedAt) {
        this.setAppliedAt(appliedAt);
        return this;
    }

    public void setAppliedAt(Instant appliedAt) {
        this.appliedAt = appliedAt;
    }

    public Discount getDiscount() {
        return this.discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public OrderDiscount discount(Discount discount) {
        this.setDiscount(discount);
        return this;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public OrderDiscount order(Order order) {
        this.setOrder(order);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDiscount)) {
            return false;
        }
        return id != null && id.equals(((OrderDiscount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDiscount{" +
            "id=" + getId() +
            ", orderId=" + getOrderId() +
            ", discountId=" + getDiscountId() +
            ", appliedAt='" + getAppliedAt() + "'" +
            "}";
    }
}
