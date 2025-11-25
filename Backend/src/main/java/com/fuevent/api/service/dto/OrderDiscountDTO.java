package com.fuevent.api.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.fuevent.api.domain.OrderDiscount} entity.
 */
public class OrderDiscountDTO implements Serializable {

    private Long id;

    private Long orderId;

    private Long discountId;

    private Instant appliedAt;

    private DiscountDTO discount;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDiscountId() {
        return discountId;
    }

    public void setDiscountId(Long discountId) {
        this.discountId = discountId;
    }

    public Instant getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Instant appliedAt) {
        this.appliedAt = appliedAt;
    }

    public DiscountDTO getDiscount() {
        return discount;
    }

    public void setDiscount(DiscountDTO discount) {
        this.discount = discount;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDiscountDTO)) {
            return false;
        }

        OrderDiscountDTO orderDiscountDTO = (OrderDiscountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, orderDiscountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDiscountDTO{" +
            "id=" + getId() +
            ", orderId=" + getOrderId() +
            ", discountId=" + getDiscountId() +
            ", appliedAt='" + getAppliedAt() + "'" +
            ", discount=" + getDiscount() +
            ", order=" + getOrder() +
            "}";
    }
}
