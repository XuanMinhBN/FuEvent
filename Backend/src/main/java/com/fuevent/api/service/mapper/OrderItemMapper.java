package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.OrderItem;
import com.fuevent.api.service.dto.OrderItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OrderItem} and its DTO {@link OrderItemDTO}.
 */
@Mapper(componentModel = "spring", uses = { ProductMapper.class })
public interface OrderItemMapper extends EntityMapper<OrderItemDTO, OrderItem> {
    @Mapping(target = "product", source = "product", qualifiedByName = "id")
    OrderItemDTO toDto(OrderItem s);
}
