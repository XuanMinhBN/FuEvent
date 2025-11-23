package com.fuevent.ui.service.mapper;

import com.fuevent.ui.domain.UserProfile;
import com.fuevent.ui.service.dto.UserProfileDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserProfile} and its DTO {@link UserProfileDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UserProfileMapper extends EntityMapper<UserProfileDTO, UserProfile> {}
