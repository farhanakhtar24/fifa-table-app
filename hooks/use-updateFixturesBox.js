
const updateFulltournament = function (fixturesArray, currentFixtureObj, homeTeamScore, awayTeamScore, table) {
    // updating fixtures arrays
    const fixturesArraycopy = [...fixturesArray];
    const index = fixturesArraycopy.findIndex(fixture => fixture.id === currentFixtureObj.id);
    fixturesArraycopy[index].played = true;
    fixturesArraycopy[index].homeTeam.goals = Number(homeTeamScore);
    fixturesArraycopy[index].awayTeam.goals = Number(awayTeamScore);
    const playedFixture = fixturesArraycopy[index];
    console.log(playedFixture, table);

    // updating points-table
    const tableCopy = [...table];
    const homeTeamIndex = tableCopy.findIndex(team => team.name === playedFixture.homeTeam.name);
    const awayTeamIndex = tableCopy.findIndex(team => team.name === playedFixture.awayTeam.name);

    if (Number(homeTeamScore) > Number(awayTeamScore)) {
        tableCopy[homeTeamIndex].points += 3;
        tableCopy[homeTeamIndex].won += 1;

        tableCopy[awayTeamIndex].points += 0;
        tableCopy[awayTeamIndex].lost += 1;

    } else if (Number(homeTeamScore) < Number(awayTeamScore)) {
        tableCopy[awayTeamIndex].points += 3;
        tableCopy[awayTeamIndex].won += 1;

        tableCopy[homeTeamIndex].points += 0;
        tableCopy[homeTeamIndex].lost += 1;
    }
    else if (Number(homeTeamScore) === Number(awayTeamScore)) {
        tableCopy[homeTeamIndex].points += 1;
        tableCopy[homeTeamIndex].drawn += 1;

        tableCopy[awayTeamIndex].points += 1;
        tableCopy[awayTeamIndex].drawn += 1;
    }

    tableCopy[homeTeamIndex].played += 1;
    tableCopy[awayTeamIndex].played += 1;

    tableCopy[homeTeamIndex].goals_for += Number(homeTeamScore);
    tableCopy[homeTeamIndex].goals_against += Number(awayTeamScore);

    tableCopy[awayTeamIndex].goals_for += Number(awayTeamScore);
    tableCopy[awayTeamIndex].goals_against += Number(homeTeamScore);


    return { playedFixture, fixturesArraycopy, tableCopy };
}

export default updateFulltournament;
