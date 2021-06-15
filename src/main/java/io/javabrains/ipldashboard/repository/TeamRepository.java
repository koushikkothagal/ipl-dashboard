package io.javabrains.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import io.javabrains.ipldashboard.model.Team;

import java.util.List;

public interface TeamRepository extends CrudRepository<Team, Long>  {

    Team findByTeamName(String teamName);

    List<Team> findAllByOrderByTotalWinsDesc();
    
}
