package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.Payment;
import com.fuevent.api.service.dto.PaymentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring", uses = { OrderMapper.class })
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    @Mapping(target = "order", source = "order", qualifiedByName = "id")
    PaymentDTO toDto(Payment s);
}
