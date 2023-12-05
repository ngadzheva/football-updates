export enum Country {
    ENGLAND = 'England',
    SPAIN = 'Spain',
    GERMANY = 'Germany',
    FRANCE = 'France',
    ITALY = 'Italy'
}

export const COUNTRY_LEAGUE = {
    [Country.ENGLAND]: {
        name: 'Premier League',
        id: 39
    },
    [Country.SPAIN]: {
        name: 'La Liga',
        id: 140
    },
    [Country.GERMANY]: {
        name: 'Bundesliga',
        id: 78
    },
    [Country.FRANCE]: {
        name: 'Ligue 1',
        id: 61
    },
    [Country.ITALY]: {
        name: 'Serie A',
        id: 71
    }
};