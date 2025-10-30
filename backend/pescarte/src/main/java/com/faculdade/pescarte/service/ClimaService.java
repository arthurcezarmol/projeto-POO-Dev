package com.faculdade.pescarte.service;

import com.faculdade.pescarte.dto.ClimaDTO;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ClimaService {
    // Injetando o Bean "RestTemplate"
    private final RestTemplate restTemplate;

    // Pega os valores do application.properties
    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    // Injeção de dependência (via construtor)
    public ClimaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Buscando o clima de uma cidade
    // Por enquanto vai ficar estática a cidade, depois vou passar a cidade como parametro
    // OBS: DTO = Data Transfer Object
    public ClimaDTO buscarClima() {
        String cidade = "Rio de Janeiro";

        // O UriComponentsBuilder ajuda a montar a URL de forma segura
        // Aqui está a estrutura da URL da API
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("q", cidade)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric") // Para temperatura em Celsius
                .queryParam("lang", "pt_br")   // Para descrição em português
                .toUriString();

        try {
            // Faz a chamada GET e pede o resultado como JsonNode
            JsonNode root = restTemplate.getForObject(url, JsonNode.class);

            // Navega na árvore do JSON para pegar os dados que queremos
            String nomeCidade = root.path("name").asText();
            String descricao = root.path("weather").get(0).path("description").asText();
            double temperatura = root.path("main").path("temp").asDouble();

            // Retorna o DTO
            return new ClimaDTO(nomeCidade, temperatura, descricao);

        } catch (Exception e) {
            // Tratamento de erros simples
            e.printStackTrace();
            throw new RuntimeException("Erro ao buscar dados do clima: " + e.getMessage());
        }
    }
}
