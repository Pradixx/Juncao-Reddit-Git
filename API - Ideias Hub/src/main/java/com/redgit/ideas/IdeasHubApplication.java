<<<<<<<< HEAD:API - Profile/src/main/java/com/redgit/profile/ProfileApplication.java
package com.redgit.profile;
========
package com.redgit.ideas;
>>>>>>>> ef40270143fc8b117a308d480711776626cac10c:API - Ideias Hub/src/main/java/com/redgit/ideas/IdeasHubApplication.java

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
<<<<<<<< HEAD:API - Profile/src/main/java/com/redgit/profile/ProfileApplication.java

@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
public class ProfileApplication {
========
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
@PropertySource("classpath:mongo.properties")
public class IdeasHubApplication {
>>>>>>>> ef40270143fc8b117a308d480711776626cac10c:API - Ideias Hub/src/main/java/com/redgit/ideas/IdeasHubApplication.java

	public static void main(String[] args) {
		SpringApplication.run(ProfileApplication.class, args);
	}

}
