package com.fuevent.ui.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import com.fuevent.ui.domain.UserProfile;
import com.fuevent.ui.repository.rowmapper.UserProfileRowMapper;
import com.fuevent.ui.service.EntityManager;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoin;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive custom repository implementation for the UserProfile entity.
 */
@SuppressWarnings("unused")
class UserProfileRepositoryInternalImpl implements UserProfileRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final UserProfileRowMapper userprofileMapper;

    private static final Table entityTable = Table.aliased("user_profile", EntityManager.ENTITY_ALIAS);

    public UserProfileRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        UserProfileRowMapper userprofileMapper
    ) {
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.userprofileMapper = userprofileMapper;
    }

    @Override
    public Flux<UserProfile> findAllBy(Pageable pageable) {
        return findAllBy(pageable, null);
    }

    @Override
    public Flux<UserProfile> findAllBy(Pageable pageable, Criteria criteria) {
        return createQuery(pageable, criteria).all();
    }

    RowsFetchSpec<UserProfile> createQuery(Pageable pageable, Criteria criteria) {
        List<Expression> columns = UserProfileSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        SelectFromAndJoin selectFrom = Select.builder().select(columns).from(entityTable);

        String select = entityManager.createSelect(selectFrom, UserProfile.class, pageable, criteria);
        String alias = entityTable.getReferenceName().getReference();
        String selectWhere = Optional
            .ofNullable(criteria)
            .map(crit ->
                new StringBuilder(select)
                    .append(" ")
                    .append("WHERE")
                    .append(" ")
                    .append(alias)
                    .append(".")
                    .append(crit.toString())
                    .toString()
            )
            .orElse(select);
        return db.sql(selectWhere).map(this::process);
    }

    @Override
    public Flux<UserProfile> findAll() {
        return findAllBy(null, null);
    }

    @Override
    public Mono<UserProfile> findById(Long id) {
        return createQuery(null, where("id").is(id)).one();
    }

    private UserProfile process(Row row, RowMetadata metadata) {
        UserProfile entity = userprofileMapper.apply(row, "e");
        return entity;
    }

    @Override
    public <S extends UserProfile> Mono<S> insert(S entity) {
        return entityManager.insert(entity);
    }

    @Override
    public <S extends UserProfile> Mono<S> save(S entity) {
        if (entity.getId() == null) {
            return insert(entity);
        } else {
            return update(entity)
                .map(numberOfUpdates -> {
                    if (numberOfUpdates.intValue() <= 0) {
                        throw new IllegalStateException("Unable to update UserProfile with id = " + entity.getId());
                    }
                    return entity;
                });
        }
    }

    @Override
    public Mono<Integer> update(UserProfile entity) {
        //fixme is this the proper way?
        return r2dbcEntityTemplate.update(entity).thenReturn(1);
    }
}
