import { FormControl } from "@angular/forms";
import { IEntity } from "./generic-types-interface";
import { IPlayer } from "./player-interface";

export interface IDeck {
    id:          number;
    name:        string;
    description:       string;
    lastupdate: Date;
    player:    IPlayer;
}

export interface IDeck2Form {
    id:          FormControl<number>;
    name:        FormControl<string>;
    description:       FormControl<string>;
    lastupdate: FormControl<Date>;
    idplayer:    FormControl<number>;
}
export interface IDeck2Send {
    id:          number;
    name:        string;
    description:       string;
    lastupdate: Date;
    player:    IEntity;
}