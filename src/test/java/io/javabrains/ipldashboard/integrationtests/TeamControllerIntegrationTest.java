package io.javabrains.ipldashboard.integrationtests;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import io.javabrains.ipldashboard.model.Match;
import io.javabrains.ipldashboard.model.Team;
import io.javabrains.ipldashboard.repository.MatchRepository;
import io.javabrains.ipldashboard.repository.TeamRepository;
import java.time.LocalDate;
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
public class TeamControllerIntegrationTest {

    @Autowired private MockMvc mockMvc;

    @MockBean private TeamRepository teamRepositoryMock;
    @MockBean private MatchRepository matchRepositoryMock;

    @Test
    void testGetAllTeamReturns200() throws Exception {
        when(teamRepositoryMock.findAll()).thenReturn(Collections.singletonList(new Team()));
        mockMvc
                .perform(get("/team"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    void testGetTeam_whenValidInput_thenReturns200() throws Exception {
        String expectedTeamName = "Test Team";
        int expectedTotalMatches = 50;
        int expectedNumberOfLatestMatches = 4;

        when(teamRepositoryMock.findByTeamName(expectedTeamName))
                .thenReturn(new Team(expectedTeamName, expectedTotalMatches));
        when(matchRepositoryMock.findLatestMatchesbyTeam(eq(expectedTeamName), anyInt()))
                .thenReturn(Collections.nCopies(expectedNumberOfLatestMatches, new Match()));

        mockMvc
                .perform(get("/team/{teamName}", expectedTeamName))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty())
                .andExpect(jsonPath("$.teamName").value(expectedTeamName))
                .andExpect(jsonPath("$.totalMatches").value(expectedTotalMatches))
                .andExpect(jsonPath("$.matches").isNotEmpty())
                .andExpect(jsonPath("$.matches", hasSize(expectedNumberOfLatestMatches)));
    }

    @Test
    void testGetMatchesForTeam_whenValidInput_thenReturns200() throws Exception {
        String teamName = "Test Team";
        int expectedNumberOfMatches = 2;

        when(matchRepositoryMock.getMatchesByTeamBetweenDates(
                eq(teamName), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(Collections.nCopies(expectedNumberOfMatches, new Match()));

        mockMvc
                .perform(get("/team/{teamName}/matches", teamName).param("year", "2020"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(expectedNumberOfMatches)));
    }
}
