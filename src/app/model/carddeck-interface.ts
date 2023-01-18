import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types-interface";
import { IDeck } from "./deck-interface";
import { ICard } from "./card-interface";

export interface ICarddeck {
    id:          number;
    deck:    IDeck;
    card: ICard;
    copies: number;
}

export interface ICarddeck2Form {
    id:          FormControl<number>;
    iddeck:        FormControl<number>;
    idcard:    FormControl<number>;
    copies: FormControl<number>;
}
export interface ICarddeck2Send {
    id:          number;
    card:    IEntity;
    deck:    IEntity;
    copies: number;
}