
const updateFixturesArray = function (fixturesArray, index, homeTeamScore, awayTeamScore) {
    const fixturesArraycopy = [...fixturesArray];
    fixturesArraycopy[index].played = true;
    fixturesArraycopy[index].homeTeam.goals = Number(homeTeamScore);
    fixturesArraycopy[index].awayTeam.goals = Number(awayTeamScore);
    const playedFixture = fixturesArraycopy[index];
    return { playedFixture, fixturesArraycopy };
}

export default updateFixturesArray;
