import { Base, BaseResponse, BaseWithLogo } from "./base.type";

interface Team extends BaseWithLogo {
    code: string;
    country: string;
    founded: number;
    national: boolean;
}

interface Vanue extends Base {
    address: string | null;
    city: string;
    capacity: number;
    surface: string;
    image: string;
}

export interface TeamData {
    team: Team;
    vanue: Vanue;
}

export interface TeamResponse extends BaseResponse {
    response: TeamData;
}