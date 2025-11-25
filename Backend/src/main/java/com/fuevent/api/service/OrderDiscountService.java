package com.fuevent.api.service;

import com.fuevent.api.domain.OrderDiscount;
import com.fuevent.api.repository.OrderDiscountRepository;
import com.fuevent.api.service.dto.OrderDiscountDTO;
import com.fuevent.api.service.mapper.OrderDiscountMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderDiscount}.
 */
@Service
@Transactional
public class OrderDiscountService {

    private final Logger log = LoggerFactory.getLogger(OrderDiscountService.class);

    private final OrderDiscountRepository orderDiscountRepository;

    private final OrderDiscountMapper orderDiscountMapper;

    public OrderDiscountService(OrderDiscountRepository orderDiscountRepository, OrderDiscountMapper orderDiscountMapper) {
        this.orderDiscountRepository = orderDiscountRepository;
        this.orderDiscountMapper = orderDiscountMapper;
    }

    /**
     * Save a orderDiscount.
     *
     * @param orderDiscountDTO the entity to save.
     * @return the persisted entity.
     */
    public OrderDiscountDTO save(OrderDiscountDTO orderDiscountDTO) {
        log.debug("Request to save OrderDiscount : {}", orderDiscountDTO);
        OrderDiscount orderDiscount = orderDiscountMapper.toEntity(orderDiscountDTO);
        orderDiscount = orderDiscountRepository.save(orderDiscount);
        return orderDiscountMapper.toDto(orderDiscount);
    }

    /**
     * Partially update a orderDiscount.
     *
     * @param orderDiscountDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<OrderDiscountDTO> partialUpdate(OrderDiscountDTO orderDiscountDTO) {
        log.debug("Request to partially update OrderDiscount : {}", orderDiscountDTO);

        return orderDiscountRepository
            .findById(orderDiscountDTO.getId())
            .map(existingOrderDiscount -> {
                orderDiscountMapper.partialUpdate(existingOrderDiscount, orderDiscountDTO);

                return existingOrderDiscount;
            })
            .map(orderDiscountRepository::save)
            .map(orderDiscountMapper::toDto);
    }

    /**
     * Get all the orderDiscounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<OrderDiscountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrderDiscounts");
        return orderDiscountRepository.findAll(pageable).map(orderDiscountMapper::toDto);
    }

    /**
     * Get one orderDiscount by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OrderDiscountDTO> findOne(Long id) {
        log.debug("Request to get OrderDiscount : {}", id);
        return orderDiscountRepository.findById(id).map(orderDiscountMapper::toDto);
    }

    /**
     * Delete the orderDiscount by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete OrderDiscount : {}", id);
        orderDiscountRepository.deleteById(id);
    }
}
