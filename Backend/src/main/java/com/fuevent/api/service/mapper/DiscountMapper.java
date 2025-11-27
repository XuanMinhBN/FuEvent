package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.Discount;
import com.fuevent.api.service.dto.DiscountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discount} and its DTO {@link DiscountDTO}.
 */
@Mapper(componentModel = "spring", uses = { EventMapper.class })
public interface DiscountMapper extends EntityMapper<DiscountDTO, Discount> {
    @Mapping(target = "event", source = "event", qualifiedByName = "id")
    DiscountDTO toDto(Discount s);

    @Named("code")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "code", source = "code")
    DiscountDTO toDtoCode(Discount discount);
}
