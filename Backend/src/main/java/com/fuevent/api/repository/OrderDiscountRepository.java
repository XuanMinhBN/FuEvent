package com.fuevent.api.repository;

import com.fuevent.api.domain.OrderDiscount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OrderDiscount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderDiscountRepository extends JpaRepository<OrderDiscount, Long> {}
