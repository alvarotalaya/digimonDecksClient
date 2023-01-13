import { FormControl } from "@angular/forms";


export interface ICard {
    id:          number;
    name:        string;
    type:        string;
    color:        string;
    stage:        string;
    digitype:        string;
    attribute:        string;
    level:        number;
    playcost:        number;
    evolutioncost:        number;
    dp:        number;
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
    level:       FormControl<number>;
    playcost:       FormControl<number>;
    evolutioncost:       FormControl<number>;
    dp:       FormControl<number>;
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
    level:        number;
    playcost:        number;
    evolutioncost:        number;
    dp:        number;
    cardnumber:        string;
    maineffect:        string;
    sourceeffect:        string;
    image:        string;
}