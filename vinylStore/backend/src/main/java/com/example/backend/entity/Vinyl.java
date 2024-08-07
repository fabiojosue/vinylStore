package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "vinyls")
public class Vinyl {

    @Id
    private String _id;

    private String title;

    //@DBRef
    private Artist artistFetched;

    private String artist;

    private String coverImage;

    private Float price;

    public Vinyl(String title, String artist, String coverImage, Float price) {
        this.title = title;
        this.artist = artist;
        this.coverImage = coverImage;
        this.price = price;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Artist getArtistFetched() {
        return artistFetched;
    }

    public void setArtistFetched(Artist artistFetched) {
        this.artistFetched = artistFetched;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }
}