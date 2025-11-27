package com.fuevent.api.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fuevent.api.IntegrationTest;
import com.fuevent.api.domain.OrderDiscount;
import com.fuevent.api.repository.OrderDiscountRepository;
import com.fuevent.api.service.dto.OrderDiscountDTO;
import com.fuevent.api.service.mapper.OrderDiscountMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link OrderDiscountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OrderDiscountResourceIT {

    private static final Instant DEFAULT_APPLIED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_APPLIED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/order-discounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OrderDiscountRepository orderDiscountRepository;

    @Autowired
    private OrderDiscountMapper orderDiscountMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrderDiscountMockMvc;

    private OrderDiscount orderDiscount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderDiscount createEntity(EntityManager em) {
        OrderDiscount orderDiscount = new OrderDiscount().appliedAt(DEFAULT_APPLIED_AT);
        return orderDiscount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderDiscount createUpdatedEntity(EntityManager em) {
        OrderDiscount orderDiscount = new OrderDiscount().appliedAt(UPDATED_APPLIED_AT);
        return orderDiscount;
    }

    @BeforeEach
    public void initTest() {
        orderDiscount = createEntity(em);
    }

    @Test
    @Transactional
    void createOrderDiscount() throws Exception {
        int databaseSizeBeforeCreate = orderDiscountRepository.findAll().size();
        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);
        restOrderDiscountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isCreated());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeCreate + 1);
        OrderDiscount testOrderDiscount = orderDiscountList.get(orderDiscountList.size() - 1);
        assertThat(testOrderDiscount.getAppliedAt()).isEqualTo(DEFAULT_APPLIED_AT);
    }

    @Test
    @Transactional
    void createOrderDiscountWithExistingId() throws Exception {
        // Create the OrderDiscount with an existing ID
        orderDiscount.setId(1L);
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        int databaseSizeBeforeCreate = orderDiscountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderDiscountMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOrderDiscounts() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        // Get all the orderDiscountList
        restOrderDiscountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderDiscount.getId().intValue())))
            .andExpect(jsonPath("$.[*].appliedAt").value(hasItem(DEFAULT_APPLIED_AT.toString())));
    }

    @Test
    @Transactional
    void getOrderDiscount() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        // Get the orderDiscount
        restOrderDiscountMockMvc
            .perform(get(ENTITY_API_URL_ID, orderDiscount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(orderDiscount.getId().intValue()))
            .andExpect(jsonPath("$.appliedAt").value(DEFAULT_APPLIED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingOrderDiscount() throws Exception {
        // Get the orderDiscount
        restOrderDiscountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOrderDiscount() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();

        // Update the orderDiscount
        OrderDiscount updatedOrderDiscount = orderDiscountRepository.findById(orderDiscount.getId()).get();
        // Disconnect from session so that the updates on updatedOrderDiscount are not directly saved in db
        em.detach(updatedOrderDiscount);
        updatedOrderDiscount.appliedAt(UPDATED_APPLIED_AT);
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(updatedOrderDiscount);

        restOrderDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, orderDiscountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isOk());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
        OrderDiscount testOrderDiscount = orderDiscountList.get(orderDiscountList.size() - 1);
        assertThat(testOrderDiscount.getAppliedAt()).isEqualTo(UPDATED_APPLIED_AT);
    }

    @Test
    @Transactional
    void putNonExistingOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, orderDiscountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOrderDiscountWithPatch() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();

        // Update the orderDiscount using partial update
        OrderDiscount partialUpdatedOrderDiscount = new OrderDiscount();
        partialUpdatedOrderDiscount.setId(orderDiscount.getId());

        restOrderDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrderDiscount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrderDiscount))
            )
            .andExpect(status().isOk());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
        OrderDiscount testOrderDiscount = orderDiscountList.get(orderDiscountList.size() - 1);
        assertThat(testOrderDiscount.getAppliedAt()).isEqualTo(DEFAULT_APPLIED_AT);
    }

    @Test
    @Transactional
    void fullUpdateOrderDiscountWithPatch() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();

        // Update the orderDiscount using partial update
        OrderDiscount partialUpdatedOrderDiscount = new OrderDiscount();
        partialUpdatedOrderDiscount.setId(orderDiscount.getId());

        partialUpdatedOrderDiscount.appliedAt(UPDATED_APPLIED_AT);

        restOrderDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrderDiscount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrderDiscount))
            )
            .andExpect(status().isOk());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
        OrderDiscount testOrderDiscount = orderDiscountList.get(orderDiscountList.size() - 1);
        assertThat(testOrderDiscount.getAppliedAt()).isEqualTo(UPDATED_APPLIED_AT);
    }

    @Test
    @Transactional
    void patchNonExistingOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, orderDiscountDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOrderDiscount() throws Exception {
        int databaseSizeBeforeUpdate = orderDiscountRepository.findAll().size();
        orderDiscount.setId(count.incrementAndGet());

        // Create the OrderDiscount
        OrderDiscountDTO orderDiscountDTO = orderDiscountMapper.toDto(orderDiscount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(orderDiscountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OrderDiscount in the database
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOrderDiscount() throws Exception {
        // Initialize the database
        orderDiscountRepository.saveAndFlush(orderDiscount);

        int databaseSizeBeforeDelete = orderDiscountRepository.findAll().size();

        // Delete the orderDiscount
        restOrderDiscountMockMvc
            .perform(delete(ENTITY_API_URL_ID, orderDiscount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderDiscount> orderDiscountList = orderDiscountRepository.findAll();
        assertThat(orderDiscountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
