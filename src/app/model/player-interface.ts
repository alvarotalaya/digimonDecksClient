import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types-interface";
import { Usertype } from "./usertype-response-interface";

export interface IPlayer {
    id:          number;
    name:        string;
    email:       string;
    usertype:    Usertype;
}