
const updateFixturesArray = function (fixturesArray, currentFixtureObj, homeTeamScore, awayTeamScore) {
    const fixturesArraycopy = [...fixturesArray];
    const index = fixturesArraycopy.findIndex(fixture => fixture.id === currentFixtureObj.id);
    fixturesArraycopy[index].played = true;
    fixturesArraycopy[index].homeTeam.goals = Number(homeTeamScore);
    fixturesArraycopy[index].awayTeam.goals = Number(awayTeamScore);
    const playedFixture = fixturesArraycopy[index];
    return { playedFixture, fixturesArraycopy };
}

export default updateFixturesArray;
