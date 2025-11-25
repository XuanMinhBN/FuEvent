package com.fuevent.api.web.rest;

import com.fuevent.api.repository.OrderDiscountRepository;
import com.fuevent.api.service.OrderDiscountService;
import com.fuevent.api.service.dto.OrderDiscountDTO;
import com.fuevent.api.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.fuevent.api.domain.OrderDiscount}.
 */
@RestController
@RequestMapping("/api")
public class OrderDiscountResource {

    private final Logger log = LoggerFactory.getLogger(OrderDiscountResource.class);

    private static final String ENTITY_NAME = "fuEventApiOrderDiscount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderDiscountService orderDiscountService;

    private final OrderDiscountRepository orderDiscountRepository;

    public OrderDiscountResource(OrderDiscountService orderDiscountService, OrderDiscountRepository orderDiscountRepository) {
        this.orderDiscountService = orderDiscountService;
        this.orderDiscountRepository = orderDiscountRepository;
    }

    /**
     * {@code POST  /order-discounts} : Create a new orderDiscount.
     *
     * @param orderDiscountDTO the orderDiscountDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderDiscountDTO, or with status {@code 400 (Bad Request)} if the orderDiscount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-discounts")
    public ResponseEntity<OrderDiscountDTO> createOrderDiscount(@RequestBody OrderDiscountDTO orderDiscountDTO) throws URISyntaxException {
        log.debug("REST request to save OrderDiscount : {}", orderDiscountDTO);
        if (orderDiscountDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderDiscount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderDiscountDTO result = orderDiscountService.save(orderDiscountDTO);
        return ResponseEntity
            .created(new URI("/api/order-discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-discounts/:id} : Updates an existing orderDiscount.
     *
     * @param id the id of the orderDiscountDTO to save.
     * @param orderDiscountDTO the orderDiscountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderDiscountDTO,
     * or with status {@code 400 (Bad Request)} if the orderDiscountDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderDiscountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-discounts/{id}")
    public ResponseEntity<OrderDiscountDTO> updateOrderDiscount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OrderDiscountDTO orderDiscountDTO
    ) throws URISyntaxException {
        log.debug("REST request to update OrderDiscount : {}, {}", id, orderDiscountDTO);
        if (orderDiscountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orderDiscountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!orderDiscountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OrderDiscountDTO result = orderDiscountService.save(orderDiscountDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderDiscountDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /order-discounts/:id} : Partial updates given fields of an existing orderDiscount, field will ignore if it is null
     *
     * @param id the id of the orderDiscountDTO to save.
     * @param orderDiscountDTO the orderDiscountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderDiscountDTO,
     * or with status {@code 400 (Bad Request)} if the orderDiscountDTO is not valid,
     * or with status {@code 404 (Not Found)} if the orderDiscountDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the orderDiscountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/order-discounts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OrderDiscountDTO> partialUpdateOrderDiscount(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OrderDiscountDTO orderDiscountDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update OrderDiscount partially : {}, {}", id, orderDiscountDTO);
        if (orderDiscountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orderDiscountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!orderDiscountRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OrderDiscountDTO> result = orderDiscountService.partialUpdate(orderDiscountDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderDiscountDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /order-discounts} : get all the orderDiscounts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderDiscounts in body.
     */
    @GetMapping("/order-discounts")
    public ResponseEntity<List<OrderDiscountDTO>> getAllOrderDiscounts(Pageable pageable) {
        log.debug("REST request to get a page of OrderDiscounts");
        Page<OrderDiscountDTO> page = orderDiscountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /order-discounts/:id} : get the "id" orderDiscount.
     *
     * @param id the id of the orderDiscountDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderDiscountDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-discounts/{id}")
    public ResponseEntity<OrderDiscountDTO> getOrderDiscount(@PathVariable Long id) {
        log.debug("REST request to get OrderDiscount : {}", id);
        Optional<OrderDiscountDTO> orderDiscountDTO = orderDiscountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderDiscountDTO);
    }

    /**
     * {@code DELETE  /order-discounts/:id} : delete the "id" orderDiscount.
     *
     * @param id the id of the orderDiscountDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-discounts/{id}")
    public ResponseEntity<Void> deleteOrderDiscount(@PathVariable Long id) {
        log.debug("REST request to delete OrderDiscount : {}", id);
        orderDiscountService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
