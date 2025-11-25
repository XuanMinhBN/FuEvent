package com.fuevent.api.service;

import com.fuevent.api.domain.TransactionHistory;
import com.fuevent.api.repository.TransactionHistoryRepository;
import com.fuevent.api.service.dto.TransactionHistoryDTO;
import com.fuevent.api.service.mapper.TransactionHistoryMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TransactionHistory}.
 */
@Service
@Transactional
public class TransactionHistoryService {

    private final Logger log = LoggerFactory.getLogger(TransactionHistoryService.class);

    private final TransactionHistoryRepository transactionHistoryRepository;

    private final TransactionHistoryMapper transactionHistoryMapper;

    public TransactionHistoryService(
        TransactionHistoryRepository transactionHistoryRepository,
        TransactionHistoryMapper transactionHistoryMapper
    ) {
        this.transactionHistoryRepository = transactionHistoryRepository;
        this.transactionHistoryMapper = transactionHistoryMapper;
    }

    /**
     * Save a transactionHistory.
     *
     * @param transactionHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    public TransactionHistoryDTO save(TransactionHistoryDTO transactionHistoryDTO) {
        log.debug("Request to save TransactionHistory : {}", transactionHistoryDTO);
        TransactionHistory transactionHistory = transactionHistoryMapper.toEntity(transactionHistoryDTO);
        transactionHistory = transactionHistoryRepository.save(transactionHistory);
        return transactionHistoryMapper.toDto(transactionHistory);
    }

    /**
     * Partially update a transactionHistory.
     *
     * @param transactionHistoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TransactionHistoryDTO> partialUpdate(TransactionHistoryDTO transactionHistoryDTO) {
        log.debug("Request to partially update TransactionHistory : {}", transactionHistoryDTO);

        return transactionHistoryRepository
            .findById(transactionHistoryDTO.getId())
            .map(existingTransactionHistory -> {
                transactionHistoryMapper.partialUpdate(existingTransactionHistory, transactionHistoryDTO);

                return existingTransactionHistory;
            })
            .map(transactionHistoryRepository::save)
            .map(transactionHistoryMapper::toDto);
    }

    /**
     * Get all the transactionHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TransactionHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TransactionHistories");
        return transactionHistoryRepository.findAll(pageable).map(transactionHistoryMapper::toDto);
    }

    /**
     * Get one transactionHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TransactionHistoryDTO> findOne(Long id) {
        log.debug("Request to get TransactionHistory : {}", id);
        return transactionHistoryRepository.findById(id).map(transactionHistoryMapper::toDto);
    }

    /**
     * Delete the transactionHistory by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TransactionHistory : {}", id);
        transactionHistoryRepository.deleteById(id);
    }
}
