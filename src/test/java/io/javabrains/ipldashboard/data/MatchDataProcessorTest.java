package io.javabrains.ipldashboard.data;

import static org.assertj.core.api.Assertions.assertThat;

import io.javabrains.ipldashboard.model.Match;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig(MatchDataProcessor.class)
class MatchDataProcessorTest {

    private static final String TOSS_WINNER = "test team 1";
    private static final String TOSS_LOSER = "test team 2";

    static MatchDataProcessor matchDataProcessor;
    static MatchInput matchInput;

    @BeforeAll
    static void setUp() {
        matchDataProcessor = new MatchDataProcessor();
        matchInput = new MatchInput();

        matchInput.setId("123");
        matchInput.setDate("2020-09-24");
        matchInput.setToss_winner(TOSS_WINNER);
        matchInput.setTeam1(TOSS_WINNER);
        matchInput.setTeam2(TOSS_LOSER);
    }

    @Test
    void testProcess_whenTossDecisionIsBat_thenFirstTeamIsTossWinner() throws Exception {
        matchInput.setToss_decision("bat");

        Match match = matchDataProcessor.process(matchInput);

        assert match != null;
        assertThat(match.getTeam1()).isEqualTo(TOSS_WINNER);
        assertThat(match.getTeam2()).isEqualTo(TOSS_LOSER);
    }

    @Test
    void testProcess_whenTossDecisionIsField_thenSecondTeamIsTossWinner() throws Exception {
        matchInput.setToss_decision("field");

        Match match = matchDataProcessor.process(matchInput);

        assert match != null;
        assertThat(match.getTeam1()).isEqualTo(TOSS_LOSER);
        assertThat(match.getTeam2()).isEqualTo(TOSS_WINNER);
    }
}
