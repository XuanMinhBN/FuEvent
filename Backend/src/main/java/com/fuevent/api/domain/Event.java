package com.fuevent.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fuevent.api.domain.enumeration.EventStatus;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private byte[] description;

    @Column(name = "description_content_type")
    private String descriptionContentType;

    @Column(name = "location")
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EventStatus status;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "organizer_login")
    private String organizerLogin;

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties(value = { "event" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties(value = { "event" }, allowSetters = true)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties(value = { "event" }, allowSetters = true)
    private Set<Discount> discounts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "events" }, allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Event id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Event title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getDescription() {
        return this.description;
    }

    public Event description(byte[] description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return this.descriptionContentType;
    }

    public Event descriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
        return this;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public String getLocation() {
        return this.location;
    }

    public Event location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public EventStatus getStatus() {
        return this.status;
    }

    public Event status(EventStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public String getPosterUrl() {
        return this.posterUrl;
    }

    public Event posterUrl(String posterUrl) {
        this.setPosterUrl(posterUrl);
        return this;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public Instant getStartTime() {
        return this.startTime;
    }

    public Event startTime(Instant startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return this.endTime;
    }

    public Event endTime(Instant endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public String getOrganizerLogin() {
        return this.organizerLogin;
    }

    public Event organizerLogin(String organizerLogin) {
        this.setOrganizerLogin(organizerLogin);
        return this;
    }

    public void setOrganizerLogin(String organizerLogin) {
        this.organizerLogin = organizerLogin;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setEvent(null));
        }
        if (products != null) {
            products.forEach(i -> i.setEvent(this));
        }
        this.products = products;
    }

    public Event products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Event addProducts(Product product) {
        this.products.add(product);
        product.setEvent(this);
        return this;
    }

    public Event removeProducts(Product product) {
        this.products.remove(product);
        product.setEvent(null);
        return this;
    }

    public Set<Review> getReviews() {
        return this.reviews;
    }

    public void setReviews(Set<Review> reviews) {
        if (this.reviews != null) {
            this.reviews.forEach(i -> i.setEvent(null));
        }
        if (reviews != null) {
            reviews.forEach(i -> i.setEvent(this));
        }
        this.reviews = reviews;
    }

    public Event reviews(Set<Review> reviews) {
        this.setReviews(reviews);
        return this;
    }

    public Event addReviews(Review review) {
        this.reviews.add(review);
        review.setEvent(this);
        return this;
    }

    public Event removeReviews(Review review) {
        this.reviews.remove(review);
        review.setEvent(null);
        return this;
    }

    public Set<Discount> getDiscounts() {
        return this.discounts;
    }

    public void setDiscounts(Set<Discount> discounts) {
        if (this.discounts != null) {
            this.discounts.forEach(i -> i.setEvent(null));
        }
        if (discounts != null) {
            discounts.forEach(i -> i.setEvent(this));
        }
        this.discounts = discounts;
    }

    public Event discounts(Set<Discount> discounts) {
        this.setDiscounts(discounts);
        return this;
    }

    public Event addDiscounts(Discount discount) {
        this.discounts.add(discount);
        discount.setEvent(this);
        return this;
    }

    public Event removeDiscounts(Discount discount) {
        this.discounts.remove(discount);
        discount.setEvent(null);
        return this;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Event category(Category category) {
        this.setCategory(category);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionContentType='" + getDescriptionContentType() + "'" +
            ", location='" + getLocation() + "'" +
            ", status='" + getStatus() + "'" +
            ", posterUrl='" + getPosterUrl() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", organizerLogin='" + getOrganizerLogin() + "'" +
            "}";
    }
}
