package io.javabrains.ipldashboard.data;

import io.javabrains.ipldashboard.model.Match;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MatchInput {
    private String id;
    private String city;
    private String date;
    private String player_of_match;
    private String venue;
    private String neutral_venue;
    private String team1;
    private String team2;
    private String toss_winner;
    private String toss_decision;
    private String winner;
    private String result;
    private String result_margin;
    private String eliminator;
    private String method;
    private String umpire1;
    private String umpire2;

    public Match toMatch() {
        String firstInningsTeam, secondInningsTeam;

        if ("bat".equals(this.getToss_decision())) {
            firstInningsTeam = this.getToss_winner();
            secondInningsTeam = this.getToss_winner().equals(this.getTeam1())
                    ? this.getTeam2() : this.getTeam1();

        } else {
            secondInningsTeam = this.getToss_winner();
            firstInningsTeam = this.getToss_winner().equals(this.getTeam1())
                    ? this.getTeam2() : this.getTeam1();
        }

        return Match.builder()
                .id(Long.parseLong(this.getId()))
                .city(this.getCity())
                .date(LocalDate.parse(this.getDate()))
                .playerOfMatch(this.getPlayer_of_match())
                .venue(this.getVenue())
                .team1(firstInningsTeam)
                .team2(secondInningsTeam)
                .tossWinner(this.getToss_winner())
                .tossDecision(this.getToss_decision())
                .matchWinner(this.getWinner())
                .result(this.getWinner())
                .result(this.getResult())
                .resultMargin(this.getResult_margin())
                .umpire1(this.getUmpire1())
                .umpire2(this.getUmpire2())
                .build();
    }
}
