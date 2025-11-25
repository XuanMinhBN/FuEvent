package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.Event;
import com.fuevent.api.service.dto.EventDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Event} and its DTO {@link EventDTO}.
 */
@Mapper(componentModel = "spring", uses = { CategoryMapper.class })
public interface EventMapper extends EntityMapper<EventDTO, Event> {
    @Mapping(target = "category", source = "category", qualifiedByName = "id")
    EventDTO toDto(Event s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EventDTO toDtoId(Event event);
}
