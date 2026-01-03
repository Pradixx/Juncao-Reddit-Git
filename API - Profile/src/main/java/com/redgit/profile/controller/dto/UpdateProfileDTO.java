package com.redgit.profile.controller.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileDTO {

    @Size(min = 3, max = 30, message = "Username deve ter entre 3 e 30 caracteres")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username deve conter apenas letras, números e underscore")
    private String username;

    @Size(min = 3, max = 50, message = "Nome de exibição deve ter entre 3 e 50 caracteres")
    private String displayName;

    @Size(max = 500, message = "Bio deve ter no máximo 500 caracteres")
    private String bio;

    @Size(max = 100, message = "Localização deve ter no máximo 100 caracteres")
    private String location;

    @Pattern(
            regexp = "^(https?://)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(/.*)?$",
            message = "Website deve ser uma URL válida"
    )
    private String website;

    private Map<String, String> socialLinks;

    private Boolean isPublic;
}