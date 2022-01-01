package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;


@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Profile implements Persistable{
    @Id
    private String id;
    private String email;

    @Override
    @Transient
    public boolean isNew() {
        return id != null;
    }

}
