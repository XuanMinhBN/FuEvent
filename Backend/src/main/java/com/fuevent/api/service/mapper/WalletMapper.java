package com.fuevent.api.service.mapper;

import com.fuevent.api.domain.Wallet;
import com.fuevent.api.service.dto.WalletDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Wallet} and its DTO {@link WalletDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WalletMapper extends EntityMapper<WalletDTO, Wallet> {}
