package io.javabrains.ipldashboard.data;

import java.time.LocalDate;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import io.javabrains.ipldashboard.model.Match;

@Mapper(componentModel = "spring")
public interface MatchMapper {
    public static final MatchMapper INSTANCE = Mappers.getMapper(MatchMapper.class);
    String ELECTED_TO_BAT = "bat";

    @Mappings({ @Mapping(source = "date", target = "date", qualifiedByName = "dateConvert"),
            @Mapping(source = "player_of_match", target = "playerOfMatch"),
            @Mapping(source = "matchInput", target = "team1", qualifiedByName = "firstInningsTeam"),
            @Mapping(source = "matchInput", target = "team2", qualifiedByName = "secondInningsTeam"),
            @Mapping(source = "toss_winner", target = "tossWinner"),
            @Mapping(source = "toss_decision", target = "tossDecision"),
            @Mapping(source = "winner", target = "matchWinner"),
            @Mapping(source = "result_margin", target = "resultMargin") })
    public Match toMatch(MatchInput matchInput);

    @Named("dateConvert")
    default LocalDate dateConvert(String date) {
        return LocalDate.parse(date);
    }

    @Named("firstInningsTeam")
    default String firstInningsTeam(MatchInput matchInput) {
        String firstInningsTeam;
        if (ELECTED_TO_BAT.equals(matchInput.getToss_decision())) {
            firstInningsTeam = matchInput.getToss_winner();
        } else {
            firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2()
                    : matchInput.getTeam1();
        }
        return firstInningsTeam;
    }

    @Named("secondInningsTeam")
    default String secondInningsTeam(MatchInput matchInput) {
        String secondInningsTeam;

        if (ELECTED_TO_BAT.equals(matchInput.getToss_decision())) {
            secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2()
                    : matchInput.getTeam1();
        } else {
            secondInningsTeam = matchInput.getToss_winner();
        }
        return secondInningsTeam;
    }
}
