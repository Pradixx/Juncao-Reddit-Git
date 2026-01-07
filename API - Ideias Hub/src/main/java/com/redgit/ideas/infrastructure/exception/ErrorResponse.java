<<<<<<<< HEAD:API - Ideias Hub/src/main/java/com/redgit/ideas/infrastructure/exception/ErrorResponse.java
package com.redgit.ideas.infrastructure.exception;
========
package com.redgit.auth.infrastructure.exception;
>>>>>>>> dc123b385db9a3da8dda22b5fab7736abf95e4fa:API - Cadastro e Login/src/main/java/com/redgit/auth/infrastructure/exception/ErrorResponse.java

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private Object details;
    private LocalDateTime timestamp;
}
