package com.fuevent.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fuevent.api.domain.enumeration.OrderStatus;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @DecimalMin(value = "0")
    @Column(name = "total_amount", precision = 21, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "user_login")
    private String userLogin;

    @Column(name = "ordered_at")
    private Instant orderedAt;

    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties(value = { "discount", "order" }, allowSetters = true)
    private Set<OrderDiscount> orderDiscounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Order id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return this.totalAmount;
    }

    public Order totalAmount(BigDecimal totalAmount) {
        this.setTotalAmount(totalAmount);
        return this;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return this.status;
    }

    public Order status(OrderStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getUserLogin() {
        return this.userLogin;
    }

    public Order userLogin(String userLogin) {
        this.setUserLogin(userLogin);
        return this;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Instant getOrderedAt() {
        return this.orderedAt;
    }

    public Order orderedAt(Instant orderedAt) {
        this.setOrderedAt(orderedAt);
        return this;
    }

    public void setOrderedAt(Instant orderedAt) {
        this.orderedAt = orderedAt;
    }

    public Set<OrderDiscount> getOrderDiscounts() {
        return this.orderDiscounts;
    }

    public void setOrderDiscounts(Set<OrderDiscount> orderDiscounts) {
        if (this.orderDiscounts != null) {
            this.orderDiscounts.forEach(i -> i.setOrder(null));
        }
        if (orderDiscounts != null) {
            orderDiscounts.forEach(i -> i.setOrder(this));
        }
        this.orderDiscounts = orderDiscounts;
    }

    public Order orderDiscounts(Set<OrderDiscount> orderDiscounts) {
        this.setOrderDiscounts(orderDiscounts);
        return this;
    }

    public Order addOrderDiscounts(OrderDiscount orderDiscount) {
        this.orderDiscounts.add(orderDiscount);
        orderDiscount.setOrder(this);
        return this;
    }

    public Order removeOrderDiscounts(OrderDiscount orderDiscount) {
        this.orderDiscounts.remove(orderDiscount);
        orderDiscount.setOrder(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", totalAmount=" + getTotalAmount() +
            ", status='" + getStatus() + "'" +
            ", userLogin='" + getUserLogin() + "'" +
            ", orderedAt='" + getOrderedAt() + "'" +
            "}";
    }
}
