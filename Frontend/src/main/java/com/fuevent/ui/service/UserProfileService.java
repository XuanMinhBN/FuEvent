package com.fuevent.ui.service;

import com.fuevent.ui.domain.UserProfile;
import com.fuevent.ui.repository.UserProfileRepository;
import com.fuevent.ui.service.dto.UserProfileDTO;
import com.fuevent.ui.service.mapper.UserProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link UserProfile}.
 */
@Service
@Transactional
public class UserProfileService {

    private final Logger log = LoggerFactory.getLogger(UserProfileService.class);

    private final UserProfileRepository userProfileRepository;

    private final UserProfileMapper userProfileMapper;

    public UserProfileService(UserProfileRepository userProfileRepository, UserProfileMapper userProfileMapper) {
        this.userProfileRepository = userProfileRepository;
        this.userProfileMapper = userProfileMapper;
    }

    /**
     * Save a userProfile.
     *
     * @param userProfileDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<UserProfileDTO> save(UserProfileDTO userProfileDTO) {
        log.debug("Request to save UserProfile : {}", userProfileDTO);
        return userProfileRepository.save(userProfileMapper.toEntity(userProfileDTO)).map(userProfileMapper::toDto);
    }

    /**
     * Partially update a userProfile.
     *
     * @param userProfileDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<UserProfileDTO> partialUpdate(UserProfileDTO userProfileDTO) {
        log.debug("Request to partially update UserProfile : {}", userProfileDTO);

        return userProfileRepository
            .findById(userProfileDTO.getId())
            .map(existingUserProfile -> {
                userProfileMapper.partialUpdate(existingUserProfile, userProfileDTO);

                return existingUserProfile;
            })
            .flatMap(userProfileRepository::save)
            .map(userProfileMapper::toDto);
    }

    /**
     * Get all the userProfiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Flux<UserProfileDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserProfiles");
        return userProfileRepository.findAllBy(pageable).map(userProfileMapper::toDto);
    }

    /**
     * Returns the number of userProfiles available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return userProfileRepository.count();
    }

    /**
     * Get one userProfile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Mono<UserProfileDTO> findOne(Long id) {
        log.debug("Request to get UserProfile : {}", id);
        return userProfileRepository.findById(id).map(userProfileMapper::toDto);
    }

    /**
     * Delete the userProfile by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete UserProfile : {}", id);
        return userProfileRepository.deleteById(id);
    }
}
