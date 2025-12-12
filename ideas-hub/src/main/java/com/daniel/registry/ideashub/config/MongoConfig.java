package com.daniel.registry.ideashub.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig {

    private static final String URI = "mongodb+srv://DaeL:yFpIohoAEX8aeb4O@project-ideas-cluster.dcrxch1.mongodb.net/ideas-db?retryWrites=true&w=majority&appName=project-ideas-cluster";

    @Bean
    public MongoTemplate mongoTemplate() {
        ConnectionString connectionString = new ConnectionString(URI);
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        return new MongoTemplate(MongoClients.create(mongoClientSettings), "ideas-db");
    }
}
