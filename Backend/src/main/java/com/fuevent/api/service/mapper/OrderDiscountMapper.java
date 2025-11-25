package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.OrderDiscount;
import com.fuevent.api.service.dto.OrderDiscountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderDiscount} and its DTO {@link OrderDiscountDTO}.
 */
@Mapper(componentModel = "spring", uses = { DiscountMapper.class, OrderMapper.class })
public interface OrderDiscountMapper extends EntityMapper<OrderDiscountDTO, OrderDiscount> {
    @Mapping(target = "discount", source = "discount", qualifiedByName = "code")
    @Mapping(target = "order", source = "order", qualifiedByName = "id")
    OrderDiscountDTO toDto(OrderDiscount s);
}
