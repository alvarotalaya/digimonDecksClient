import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types-interface";
import { Usertype } from "./usertype-response-interface";

export interface IPlayer {
    id:          number;
    name:        string;
    email:       string;
    usertype:    Usertype;
}

export interface IPlayer2Form {
    id:          FormControl<number>;
    name:        FormControl<string>;
    email:       FormControl<string>;
    usertype:    FormControl<IEntity>;
}
export interface IPlayer2Send {
    id:          number;
    name:        string;
    email:       string;
    usertype:    IEntity;
}