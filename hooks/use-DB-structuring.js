

const useDBstructuring = (selectedTeams) => {
    const fixtures = [];
    const pointsTable = [];

    selectedTeams.forEach(team => {
        return (
            pointsTable.push({
                ...team,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goals_for: 0,
                goals_against: 0,
                points: 0
            })
        );
    })

    for (let i = 0; i < selectedTeams.length; i++) {
        for (let j = i + 1; j < selectedTeams.length; j++) {
            fixtures.push({
                homeTeam: selectedTeams[i],
                awayTeam: selectedTeams[j]
            })
        }
    }

    return { fixtures, pointsTable };
}

export default useDBstructuring;