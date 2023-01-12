import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types-interface";

export interface ICard {
    id:          number;
    name:        string;
    type:        string;
    color:        string;
    stage:        string;
    digitype:        string;
    attribute:        string;
    level:        string;
    playcost:        string;
    evolutioncost:        string;
    dp:        string;
    cardnumber:        string;
    maineffect:        string;
    sourceeffect:        string;
    image:        string;
}

export interface ICard2Form {
    id:          FormControl<number>;
    name:        FormControl<string>;
    type:       FormControl<string>;
    color:       FormControl<string>;
    stage:       FormControl<string>;
    digitype:       FormControl<string>;
    attribute:       FormControl<string>;
    level:       FormControl<string>;
    playcost:       FormControl<string>;
    evolutioncost:       FormControl<string>;
    dp:       FormControl<string>;
    cardnumber:       FormControl<string>;
    maineffect:       FormControl<string>;
    sourceeffect:       FormControl<string>;
    image:       FormControl<string>;
}
export interface ICard2Send {
    id:          number;
    name:        string;
    type:        string;
    color:        string;
    stage:        string;
    digitype:        string;
    attribute:        string;
    level:        string;
    playcost:        string;
    evolutioncost:        string;
    dp:        string;
    cardnumber:        string;
    maineffect:        string;
    sourceeffect:        string;
    image:        string;
}