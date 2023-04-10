import {TypeOfLeague} from "../interfaces/standings.interface";

export function setPositionColor({result}: {result: string}): string {
  let className = '';
  switch (result) {
    case TypeOfLeague.LeagueChampions:
    case TypeOfLeague.LeagueChampionsQualifiers:
      className = 'position-league-champions';
      break;
    case TypeOfLeague.LeagueEurope:
    case TypeOfLeague.LeagueEuropeQualifiers:
      className = 'position-league-europe';
      break;
    case TypeOfLeague.LeagueConference:
      className = 'position-league-conference';
      break;
    case TypeOfLeague.Relegation:
      className = 'position-relegation';
      break;
  }
  return className
}
