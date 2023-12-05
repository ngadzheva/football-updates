import { Base, BaseResponse } from "./base.type";
import { Country, League } from "./common.type";

interface Seasons {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: Coverage;
}

interface Coverage {
    fixtures: Fixtures;
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: true;
}

interface Fixtures {
    events: true;
    lineups: true;
    statistics_fixtures: true;
    statistics_players: true;
}

export interface LeagueData {
    league: League;
    country: Country;
    seasons: Seasons[];
}

export interface LeagueParams extends Base {
    country: string;
    season: number;
}

export interface LeagueResponse extends BaseResponse {
    parameters: LeagueParams;
    response: LeagueData[];
}