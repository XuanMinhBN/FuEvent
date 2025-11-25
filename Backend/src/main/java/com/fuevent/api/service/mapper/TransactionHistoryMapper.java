package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.TransactionHistory;
import com.fuevent.api.service.dto.TransactionHistoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TransactionHistory} and its DTO {@link TransactionHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TransactionHistoryMapper extends EntityMapper<TransactionHistoryDTO, TransactionHistory> {}
