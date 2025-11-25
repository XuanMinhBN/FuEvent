package com.fuevent.api.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class OrderDiscountMapperTest {

    private OrderDiscountMapper orderDiscountMapper;

    @BeforeEach
    public void setUp() {
        orderDiscountMapper = new OrderDiscountMapperImpl();
    }
}
