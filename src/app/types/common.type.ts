import { BaseWithLogo } from "./base.type";

export interface Country {
    name: string;
    code?: string;
    flag: string;
}

export interface Team extends BaseWithLogo {
    winner: boolean;
}

export interface League extends BaseWithLogo {
    type?: string;
}