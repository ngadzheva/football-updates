export interface Base {
    id: number;
    name: string;
}

export interface BaseWithLogo extends Base {
    logo: string;
}

export interface BaseResponse {
    get: string;
    errors: Array<string>;
    results: number;
    paging: {
        current: number;
        total: number;
    };
}