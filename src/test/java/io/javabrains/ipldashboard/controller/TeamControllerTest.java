package io.javabrains.ipldashboard.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.javabrains.ipldashboard.model.Team;
import io.javabrains.ipldashboard.repository.MatchRepository;
import io.javabrains.ipldashboard.repository.TeamRepository;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@ExtendWith(MockitoExtension.class)
@SpringJUnitConfig(TeamController.class)
class TeamControllerTest {

    @Autowired TeamController teamController;

    @MockBean TeamRepository teamRepositoryMock;
    @MockBean MatchRepository matchRepositoryMock;

    @Captor ArgumentCaptor<String> stringArgumentCaptor;

    @Test
    void testGetAllTeam() {
        teamController.getAllTeam();
        verify(teamRepositoryMock).findAll();
    }

    @Test
    void testGetTeam(@Mock Team teamMock) {
        String expectedTeamName = "test team";
        when(teamRepositoryMock.findByTeamName(expectedTeamName)).thenReturn(teamMock);

        teamController.getTeam(expectedTeamName);

        verify(teamRepositoryMock).findByTeamName(stringArgumentCaptor.capture());
        verify(teamMock).setMatches(anyList());

        String capturedTeamName = stringArgumentCaptor.getValue();
        assertThat(capturedTeamName).isEqualTo(expectedTeamName);
    }

    @Test
    void testGetMatchesForTeam() {
        String expectedTeamName = "test team";
        int expectedYear = 2020;

        teamController.getMatchesForTeam(expectedTeamName, expectedYear);

        verify(matchRepositoryMock)
                .getMatchesByTeamBetweenDates(
                        stringArgumentCaptor.capture(),
                        eq(LocalDate.of(expectedYear, 1, 1)),
                        eq(LocalDate.of(expectedYear + 1, 1, 1)));

        String capturedTeamName = stringArgumentCaptor.getValue();
        assertThat(capturedTeamName).isEqualTo(expectedTeamName);
    }
}
