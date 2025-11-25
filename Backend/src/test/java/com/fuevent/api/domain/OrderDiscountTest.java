package com.fuevent.api.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.fuevent.api.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderDiscountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderDiscount.class);
        OrderDiscount orderDiscount1 = new OrderDiscount();
        orderDiscount1.setId(1L);
        OrderDiscount orderDiscount2 = new OrderDiscount();
        orderDiscount2.setId(orderDiscount1.getId());
        assertThat(orderDiscount1).isEqualTo(orderDiscount2);
        orderDiscount2.setId(2L);
        assertThat(orderDiscount1).isNotEqualTo(orderDiscount2);
        orderDiscount1.setId(null);
        assertThat(orderDiscount1).isNotEqualTo(orderDiscount2);
    }
}
