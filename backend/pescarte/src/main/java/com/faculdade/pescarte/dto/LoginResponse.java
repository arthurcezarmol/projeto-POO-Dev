package com.faculdade.pescarte.dto;

// expiresIn: tempo de expiração do token (em quantos segundos o token vai expirar)
public record LoginResponse(String accessToken, long expiresIn) {
}
