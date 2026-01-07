package com.redgit.ideas.controller.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class IdeaDTO {
    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotBlank(message = "Description is mandatory")
    private String description;

    private String authorId;
}
