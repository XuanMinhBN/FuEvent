package com.fuevent.api.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fuevent.api.IntegrationTest;
import com.fuevent.api.domain.Discount;
import com.fuevent.api.repository.DiscountRepository;
import com.fuevent.api.service.dto.DiscountDTO;
import com.fuevent.api.service.mapper.DiscountMapper;
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
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link DiscountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DiscountResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DESCRIPTION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESCRIPTION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESCRIPTION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESCRIPTION_CONTENT_TYPE = "image/png";

    private static final Float DEFAULT_PERCENTAGE = 0F;
    private static final Float UPDATED_PERCENTAGE = 1F;

    private static final Long DEFAULT_MAX_USERS = 1L;
    private static final Long UPDATED_MAX_USERS = 2L;

    private static final Instant DEFAULT_VALID_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_VALID_TO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_TO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_USER_LOGIN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/discounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private DiscountMapper discountMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiscountMockMvc;

    private Discount discount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discount createEntity(EntityManager em) {
        Discount discount = new Discount()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .descriptionContentType(DEFAULT_DESCRIPTION_CONTENT_TYPE)
            .percentage(DEFAULT_PERCENTAGE)
            .maxUsers(DEFAULT_MAX_USERS)
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO)
            .type(DEFAULT_TYPE)
            .userLogin(DEFAULT_USER_LOGIN);
        return discount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discount createUpdatedEntity(EntityManager em) {
        Discount discount = new Discount()
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .percentage(UPDATED_PERCENTAGE)
            .maxUsers(UPDATED_MAX_USERS)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .type(UPDATED_TYPE)
            .userLogin(UPDATED_USER_LOGIN);
        return discount;
    }

    @BeforeEach
    public void initTest() {
        discount = createEntity(em);
    }

    @Test
    @Transactional
    void createDiscount() throws Exception {
        int databaseSizeBeforeCreate = discountRepository.findAll().size();
        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);
        restDiscountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isCreated());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeCreate + 1);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testDiscount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDiscount.getDescriptionContentType()).isEqualTo(DEFAULT_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDiscount.getPercentage()).isEqualTo(DEFAULT_PERCENTAGE);
        assertThat(testDiscount.getMaxUsers()).isEqualTo(DEFAULT_MAX_USERS);
        assertThat(testDiscount.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testDiscount.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testDiscount.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDiscount.getUserLogin()).isEqualTo(DEFAULT_USER_LOGIN);
    }

    @Test
    @Transactional
    void createDiscountWithExistingId() throws Exception {
        // Create the Discount with an existing ID
        discount.setId(1L);
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        int databaseSizeBeforeCreate = discountRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDiscounts() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        // Get all the discountList
        restDiscountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discount.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].descriptionContentType").value(hasItem(DEFAULT_DESCRIPTION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESCRIPTION))))
            .andExpect(jsonPath("$.[*].percentage").value(hasItem(DEFAULT_PERCENTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].maxUsers").value(hasItem(DEFAULT_MAX_USERS.intValue())))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].userLogin").value(hasItem(DEFAULT_USER_LOGIN)));
    }

    @Test
    @Transactional
    void getDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        // Get the discount
        restDiscountMockMvc
            .perform(get(ENTITY_API_URL_ID, discount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(discount.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.descriptionContentType").value(DEFAULT_DESCRIPTION_CONTENT_TYPE))
            .andExpect(jsonPath("$.description").value(Base64Utils.encodeToString(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.percentage").value(DEFAULT_PERCENTAGE.doubleValue()))
            .andExpect(jsonPath("$.maxUsers").value(DEFAULT_MAX_USERS.intValue()))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.userLogin").value(DEFAULT_USER_LOGIN));
    }

    @Test
    @Transactional
    void getNonExistingDiscount() throws Exception {
        // Get the discount
        restDiscountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeUpdate = discountRepository.findAll().size();

        // Update the discount
        Discount updatedDiscount = discountRepository.findById(discount.getId()).get();
        // Disconnect from session so that the updates on updatedDiscount are not directly saved in db
        em.detach(updatedDiscount);
        updatedDiscount
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .percentage(UPDATED_PERCENTAGE)
            .maxUsers(UPDATED_MAX_USERS)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .type(UPDATED_TYPE)
            .userLogin(UPDATED_USER_LOGIN);
        DiscountDTO discountDTO = discountMapper.toDto(updatedDiscount);

        restDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, discountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isOk());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDiscount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDiscount.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDiscount.getPercentage()).isEqualTo(UPDATED_PERCENTAGE);
        assertThat(testDiscount.getMaxUsers()).isEqualTo(UPDATED_MAX_USERS);
        assertThat(testDiscount.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testDiscount.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testDiscount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDiscount.getUserLogin()).isEqualTo(UPDATED_USER_LOGIN);
    }

    @Test
    @Transactional
    void putNonExistingDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, discountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDiscountWithPatch() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeUpdate = discountRepository.findAll().size();

        // Update the discount using partial update
        Discount partialUpdatedDiscount = new Discount();
        partialUpdatedDiscount.setId(discount.getId());

        partialUpdatedDiscount.code(UPDATED_CODE).validFrom(UPDATED_VALID_FROM).type(UPDATED_TYPE).userLogin(UPDATED_USER_LOGIN);

        restDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiscount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiscount))
            )
            .andExpect(status().isOk());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDiscount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDiscount.getDescriptionContentType()).isEqualTo(DEFAULT_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDiscount.getPercentage()).isEqualTo(DEFAULT_PERCENTAGE);
        assertThat(testDiscount.getMaxUsers()).isEqualTo(DEFAULT_MAX_USERS);
        assertThat(testDiscount.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testDiscount.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testDiscount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDiscount.getUserLogin()).isEqualTo(UPDATED_USER_LOGIN);
    }

    @Test
    @Transactional
    void fullUpdateDiscountWithPatch() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeUpdate = discountRepository.findAll().size();

        // Update the discount using partial update
        Discount partialUpdatedDiscount = new Discount();
        partialUpdatedDiscount.setId(discount.getId());

        partialUpdatedDiscount
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .percentage(UPDATED_PERCENTAGE)
            .maxUsers(UPDATED_MAX_USERS)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .type(UPDATED_TYPE)
            .userLogin(UPDATED_USER_LOGIN);

        restDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiscount.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiscount))
            )
            .andExpect(status().isOk());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testDiscount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDiscount.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testDiscount.getPercentage()).isEqualTo(UPDATED_PERCENTAGE);
        assertThat(testDiscount.getMaxUsers()).isEqualTo(UPDATED_MAX_USERS);
        assertThat(testDiscount.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testDiscount.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testDiscount.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDiscount.getUserLogin()).isEqualTo(UPDATED_USER_LOGIN);
    }

    @Test
    @Transactional
    void patchNonExistingDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, discountDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();
        discount.setId(count.incrementAndGet());

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiscountMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(discountDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeDelete = discountRepository.findAll().size();

        // Delete the discount
        restDiscountMockMvc
            .perform(delete(ENTITY_API_URL_ID, discount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
