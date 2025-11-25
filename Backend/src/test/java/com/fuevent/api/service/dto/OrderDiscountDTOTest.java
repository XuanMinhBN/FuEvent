package com.fuevent.api.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.fuevent.api.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderDiscountDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderDiscountDTO.class);
        OrderDiscountDTO orderDiscountDTO1 = new OrderDiscountDTO();
        orderDiscountDTO1.setId(1L);
        OrderDiscountDTO orderDiscountDTO2 = new OrderDiscountDTO();
        assertThat(orderDiscountDTO1).isNotEqualTo(orderDiscountDTO2);
        orderDiscountDTO2.setId(orderDiscountDTO1.getId());
        assertThat(orderDiscountDTO1).isEqualTo(orderDiscountDTO2);
        orderDiscountDTO2.setId(2L);
        assertThat(orderDiscountDTO1).isNotEqualTo(orderDiscountDTO2);
        orderDiscountDTO1.setId(null);
        assertThat(orderDiscountDTO1).isNotEqualTo(orderDiscountDTO2);
    }
}
