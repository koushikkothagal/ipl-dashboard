package io.javabrains.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import io.javabrains.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long>  {

    Team findByTeamName(String teamName);
    
}
