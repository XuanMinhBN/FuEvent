package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.Review;
import com.fuevent.api.service.dto.ReviewDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Review} and its DTO {@link ReviewDTO}.
 */
@Mapper(componentModel = "spring", uses = { EventMapper.class })
public interface ReviewMapper extends EntityMapper<ReviewDTO, Review> {
    @Mapping(target = "event", source = "event", qualifiedByName = "id")
    ReviewDTO toDto(Review s);
}
