package com.fuevent.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fuevent.api.domain.enumeration.ProductType;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "description")
    private byte[] description;

    @Column(name = "description_content_type")
    private String descriptionContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductType type;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @Min(value = 0)
    @Column(name = "quantity_total")
    private Integer quantityTotal;

    @Min(value = 0)
    @Column(name = "quantity_sold")
    private Integer quantitySold;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "event_id")
    private Long eventId;

    @ManyToOne
    @JsonIgnoreProperties(value = { "products", "reviews", "category" }, allowSetters = true)
    private Event event;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getDescription() {
        return this.description;
    }

    public Product description(byte[] description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return this.descriptionContentType;
    }

    public Product descriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
        return this;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public ProductType getType() {
        return this.type;
    }

    public Product type(ProductType type) {
        this.setType(type);
        return this;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public Product price(BigDecimal price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantityTotal() {
        return this.quantityTotal;
    }

    public Product quantityTotal(Integer quantityTotal) {
        this.setQuantityTotal(quantityTotal);
        return this;
    }

    public void setQuantityTotal(Integer quantityTotal) {
        this.quantityTotal = quantityTotal;
    }

    public Integer getQuantitySold() {
        return this.quantitySold;
    }

    public Product quantitySold(Integer quantitySold) {
        this.setQuantitySold(quantitySold);
        return this;
    }

    public void setQuantitySold(Integer quantitySold) {
        this.quantitySold = quantitySold;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public Product imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getEventId() {
        return this.eventId;
    }

    public Product eventId(Long eventId) {
        this.setEventId(eventId);
        return this;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Event getEvent() {
        return this.event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Product event(Event event) {
        this.setEvent(event);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionContentType='" + getDescriptionContentType() + "'" +
            ", type='" + getType() + "'" +
            ", price=" + getPrice() +
            ", quantityTotal=" + getQuantityTotal() +
            ", quantitySold=" + getQuantitySold() +
            ", imageUrl='" + getImageUrl() + "'" +
            ", eventId=" + getEventId() +
            "}";
    }
}
