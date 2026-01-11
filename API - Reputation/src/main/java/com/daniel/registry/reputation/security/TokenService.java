package com.daniel.registry.reputation.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Value("${security.jwt.secret-key}")
    private String secret;

    public String validateToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(secret))
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject(); // email
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}
