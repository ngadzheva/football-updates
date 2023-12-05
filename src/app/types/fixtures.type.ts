import { Base, BaseResponse, BaseWithLogo } from "./base.type";
import { Team } from "./common.type";
import { StandingsLeague } from "./standings.type";

// TODO: Fix null types
interface Fixture {
    id: number;
    reference: number | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: Periods;
    vanue: Vanue;
    status: Status;
}

interface Periods {
    first: number;
    second?: number;
}

interface Vanue extends Base {
    city: string;
}

interface Status {
    long: string;
    short: string;
    elapsed: number;
}

interface FixtureLeague extends Pick<StandingsLeague, 'id' | 'name' | 'logo' | 'flag' | 'season'> {
    country: string;
    round: string;
}

interface Teams {
    home: Team;
    away: Team;
}

interface Goals {
    home: number | null;
    away: number | null;
}

interface Score {
    halftime: Goals;
    fulltime: Goals;
    extratime: Goals;
    penalty: Goals;
}

export interface FixturesData {
    fixture: Fixture;
    league: FixtureLeague;
    teams: Teams;
    goals: Required<Goals>;
    score: Score;
}

export interface FixturesParams {
    leagueId: number;
    season: number;
    teamId: number;
}

export interface FixturesResponse extends BaseResponse {
    parameters: FixturesParams;
    response: FixturesData[];
}