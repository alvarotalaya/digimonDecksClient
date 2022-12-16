import { FormControl } from "@angular/forms";

export interface IUser {
    email: FormControl<string>;
    password: FormControl<string>;
}
