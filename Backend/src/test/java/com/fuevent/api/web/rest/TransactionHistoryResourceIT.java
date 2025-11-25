package com.fuevent.api.web.rest;

import static com.fuevent.api.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fuevent.api.IntegrationTest;
import com.fuevent.api.domain.TransactionHistory;
import com.fuevent.api.domain.enumeration.TransactionType;
import com.fuevent.api.repository.TransactionHistoryRepository;
import com.fuevent.api.service.dto.TransactionHistoryDTO;
import com.fuevent.api.service.mapper.TransactionHistoryMapper;
import java.math.BigDecimal;
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
 * Integration tests for the {@link TransactionHistoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TransactionHistoryResourceIT {

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final TransactionType DEFAULT_TYPE = TransactionType.DEPOSIT;
    private static final TransactionType UPDATED_TYPE = TransactionType.WITHDRAW;

    private static final byte[] DEFAULT_DESCRIPTION = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DESCRIPTION = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DESCRIPTION_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DESCRIPTION_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_TRANSACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TRANSACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_WALLET_ID = 1L;
    private static final Long UPDATED_WALLET_ID = 2L;

    private static final String ENTITY_API_URL = "/api/transaction-histories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Autowired
    private TransactionHistoryMapper transactionHistoryMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransactionHistoryMockMvc;

    private TransactionHistory transactionHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionHistory createEntity(EntityManager em) {
        TransactionHistory transactionHistory = new TransactionHistory()
            .amount(DEFAULT_AMOUNT)
            .type(DEFAULT_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .descriptionContentType(DEFAULT_DESCRIPTION_CONTENT_TYPE)
            .transactionDate(DEFAULT_TRANSACTION_DATE)
            .walletId(DEFAULT_WALLET_ID);
        return transactionHistory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionHistory createUpdatedEntity(EntityManager em) {
        TransactionHistory transactionHistory = new TransactionHistory()
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .walletId(UPDATED_WALLET_ID);
        return transactionHistory;
    }

    @BeforeEach
    public void initTest() {
        transactionHistory = createEntity(em);
    }

    @Test
    @Transactional
    void createTransactionHistory() throws Exception {
        int databaseSizeBeforeCreate = transactionHistoryRepository.findAll().size();
        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);
        restTransactionHistoryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionHistory testTransactionHistory = transactionHistoryList.get(transactionHistoryList.size() - 1);
        assertThat(testTransactionHistory.getAmount()).isEqualByComparingTo(DEFAULT_AMOUNT);
        assertThat(testTransactionHistory.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testTransactionHistory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTransactionHistory.getDescriptionContentType()).isEqualTo(DEFAULT_DESCRIPTION_CONTENT_TYPE);
        assertThat(testTransactionHistory.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testTransactionHistory.getWalletId()).isEqualTo(DEFAULT_WALLET_ID);
    }

    @Test
    @Transactional
    void createTransactionHistoryWithExistingId() throws Exception {
        // Create the TransactionHistory with an existing ID
        transactionHistory.setId(1L);
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        int databaseSizeBeforeCreate = transactionHistoryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionHistoryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionHistoryRepository.findAll().size();
        // set the field null
        transactionHistory.setAmount(null);

        // Create the TransactionHistory, which fails.
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        restTransactionHistoryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionHistoryRepository.findAll().size();
        // set the field null
        transactionHistory.setType(null);

        // Create the TransactionHistory, which fails.
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        restTransactionHistoryMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTransactionHistories() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        // Get all the transactionHistoryList
        restTransactionHistoryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(sameNumber(DEFAULT_AMOUNT))))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].descriptionContentType").value(hasItem(DEFAULT_DESCRIPTION_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(Base64Utils.encodeToString(DEFAULT_DESCRIPTION))))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].walletId").value(hasItem(DEFAULT_WALLET_ID.intValue())));
    }

    @Test
    @Transactional
    void getTransactionHistory() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        // Get the transactionHistory
        restTransactionHistoryMockMvc
            .perform(get(ENTITY_API_URL_ID, transactionHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transactionHistory.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(sameNumber(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.descriptionContentType").value(DEFAULT_DESCRIPTION_CONTENT_TYPE))
            .andExpect(jsonPath("$.description").value(Base64Utils.encodeToString(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()))
            .andExpect(jsonPath("$.walletId").value(DEFAULT_WALLET_ID.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingTransactionHistory() throws Exception {
        // Get the transactionHistory
        restTransactionHistoryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTransactionHistory() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();

        // Update the transactionHistory
        TransactionHistory updatedTransactionHistory = transactionHistoryRepository.findById(transactionHistory.getId()).get();
        // Disconnect from session so that the updates on updatedTransactionHistory are not directly saved in db
        em.detach(updatedTransactionHistory);
        updatedTransactionHistory
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .walletId(UPDATED_WALLET_ID);
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(updatedTransactionHistory);

        restTransactionHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, transactionHistoryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isOk());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
        TransactionHistory testTransactionHistory = transactionHistoryList.get(transactionHistoryList.size() - 1);
        assertThat(testTransactionHistory.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTransactionHistory.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTransactionHistory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTransactionHistory.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testTransactionHistory.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testTransactionHistory.getWalletId()).isEqualTo(UPDATED_WALLET_ID);
    }

    @Test
    @Transactional
    void putNonExistingTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, transactionHistoryDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTransactionHistoryWithPatch() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();

        // Update the transactionHistory using partial update
        TransactionHistory partialUpdatedTransactionHistory = new TransactionHistory();
        partialUpdatedTransactionHistory.setId(transactionHistory.getId());

        partialUpdatedTransactionHistory.description(UPDATED_DESCRIPTION).descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE);

        restTransactionHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTransactionHistory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTransactionHistory))
            )
            .andExpect(status().isOk());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
        TransactionHistory testTransactionHistory = transactionHistoryList.get(transactionHistoryList.size() - 1);
        assertThat(testTransactionHistory.getAmount()).isEqualByComparingTo(DEFAULT_AMOUNT);
        assertThat(testTransactionHistory.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testTransactionHistory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTransactionHistory.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testTransactionHistory.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testTransactionHistory.getWalletId()).isEqualTo(DEFAULT_WALLET_ID);
    }

    @Test
    @Transactional
    void fullUpdateTransactionHistoryWithPatch() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();

        // Update the transactionHistory using partial update
        TransactionHistory partialUpdatedTransactionHistory = new TransactionHistory();
        partialUpdatedTransactionHistory.setId(transactionHistory.getId());

        partialUpdatedTransactionHistory
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION)
            .descriptionContentType(UPDATED_DESCRIPTION_CONTENT_TYPE)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .walletId(UPDATED_WALLET_ID);

        restTransactionHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTransactionHistory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTransactionHistory))
            )
            .andExpect(status().isOk());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
        TransactionHistory testTransactionHistory = transactionHistoryList.get(transactionHistoryList.size() - 1);
        assertThat(testTransactionHistory.getAmount()).isEqualByComparingTo(UPDATED_AMOUNT);
        assertThat(testTransactionHistory.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTransactionHistory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTransactionHistory.getDescriptionContentType()).isEqualTo(UPDATED_DESCRIPTION_CONTENT_TYPE);
        assertThat(testTransactionHistory.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testTransactionHistory.getWalletId()).isEqualTo(UPDATED_WALLET_ID);
    }

    @Test
    @Transactional
    void patchNonExistingTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, transactionHistoryDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTransactionHistory() throws Exception {
        int databaseSizeBeforeUpdate = transactionHistoryRepository.findAll().size();
        transactionHistory.setId(count.incrementAndGet());

        // Create the TransactionHistory
        TransactionHistoryDTO transactionHistoryDTO = transactionHistoryMapper.toDto(transactionHistory);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransactionHistoryMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(transactionHistoryDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TransactionHistory in the database
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTransactionHistory() throws Exception {
        // Initialize the database
        transactionHistoryRepository.saveAndFlush(transactionHistory);

        int databaseSizeBeforeDelete = transactionHistoryRepository.findAll().size();

        // Delete the transactionHistory
        restTransactionHistoryMockMvc
            .perform(delete(ENTITY_API_URL_ID, transactionHistory.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransactionHistory> transactionHistoryList = transactionHistoryRepository.findAll();
        assertThat(transactionHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
