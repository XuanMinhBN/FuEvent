package com.fuevent.ui.repository.rowmapper;

import com.fuevent.ui.domain.UserProfile;
import com.fuevent.ui.service.ColumnConverter;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link UserProfile}, with proper type conversions.
 */
@Service
public class UserProfileRowMapper implements BiFunction<Row, String, UserProfile> {

    private final ColumnConverter converter;

    public UserProfileRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link UserProfile} stored in the database.
     */
    @Override
    public UserProfile apply(Row row, String prefix) {
        UserProfile entity = new UserProfile();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setPhoneNumber(converter.fromRow(row, prefix + "_phone_number", String.class));
        entity.setDescription(converter.fromRow(row, prefix + "_description", String.class));
        entity.setAddress(converter.fromRow(row, prefix + "_address", String.class));
        entity.setStudentCode(converter.fromRow(row, prefix + "_student_code", String.class));
        entity.setWalletId(converter.fromRow(row, prefix + "_wallet_id", Long.class));
        return entity;
    }
}
