package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vinyls")
public class Vinyl {

    @Id
    private String _id;

    private String title;

    //@DBRef
    private Artist artistFetched;

    private String artist;

    private String coverImage;

    private Double price;
}