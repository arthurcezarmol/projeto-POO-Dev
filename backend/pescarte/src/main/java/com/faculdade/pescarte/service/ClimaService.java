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
        String cidade = "Curitiba";

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
            JsonNode resposta = restTemplate.getForObject(url, JsonNode.class);

            // Cria um novo objeto para clima
            ClimaDTO clima =  new ClimaDTO();

            // Navega na árvore do JSON para pegar os dados que queremos
            clima.setCidade(resposta.get("name").asText());
            clima.setPais(resposta.get("sys").get("country").asText());
            clima.setTemperatura(resposta.get("main").get("temp").asDouble());
            clima.setUmidade(resposta.get("main").get("humidity").asInt());
            clima.setPressao(resposta.get("main").get("pressure").asInt());
            clima.setDescricao(resposta.get("weather").get(0).get("description").asText());
            clima.setVelocidadeVento(resposta.get("wind").get("speed").asDouble());
            clima.setDirecaoVento(resposta.get("wind").get("deg").asDouble());
            clima.setNebulosidade(resposta.get("clouds").get("all").asInt());

            // Retorna o DTO (clima)
            return clima;

        } catch (Exception e) {     // COLOCAR MAIS TRATAMENTO DE ERROS DEPOIS
            // Tratamento de erros simples
            e.printStackTrace();
            throw new RuntimeException("Erro ao buscar dados do clima: " + e.getMessage());
        }
    }
}
