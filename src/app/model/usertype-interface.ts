import { Pageable, Sort } from "./shared-interface";
import { FormControl } from "@angular/forms";

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

export interface IUsertype2Form {
    id:          FormControl<number>;
    type:        FormControl<string>;
}
export interface IUsertype2Send {
    id:          number;
    type:        string;
}

