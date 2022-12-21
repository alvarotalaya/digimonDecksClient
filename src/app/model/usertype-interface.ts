import { Pageable, Sort } from "./shared-interface";

export interface UsertypeResponse {
    content:          IUsertype[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    sort:             Sort;
    number:           number;
    first:            boolean;
    size:             number;
    empty:            boolean;
}

export interface IUsertype {
    id:         number;
    type:       string;
    players:    number;
}

