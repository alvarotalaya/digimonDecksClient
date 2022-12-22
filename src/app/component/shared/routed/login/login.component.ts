import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/model/user-interface';
import { SessionService } from 'src/app/service/session.service';
import { UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';
import { CryptoService } from 'src/app/service/crypto.service';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strOperation: string = "login"
  formularioLogin: UntypedFormGroup;
  oUserSession: IUser;

  constructor(
    private FormBuilder: UntypedFormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService,
    private oCryptoService: CryptoService, 
    public oMetadataService: MetadataService 
  ) {

    if (oRoute.snapshot.data['message']) {
      this.oUserSession = this.oRoute.snapshot.data['message'];
      localStorage.setItem("user", JSON.stringify(oRoute.snapshot.data['message']));
      oRouter.navigate(['/home']);
    } else {
      localStorage.clear();
    }

    this.formularioLogin = <UntypedFormGroup>this.FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void { }

  onSubmit() {
    const loginData = { email: this.formularioLogin.get('email')!.value, password: this.oCryptoService.getSHA256(this.formularioLogin.get('password')!.value) };
    console.log("login:onSubmit: ", loginData);
    this.oSessionService.login(JSON.stringify(loginData)).subscribe(data => {
      localStorage.setItem("player", JSON.stringify(data));
      if (data != null) {
        this.oRouter.navigate(['/','home']);
      } else {
        localStorage.clear();
      }
    });
    return false;
  }

  loginAdmin() {
    this.formularioLogin.setValue({
      email: "altaro2002@gmail.com",
      password: "DIGIMON_DECKS"
    })
  }

  loginUser() {
    this.formularioLogin.setValue({
      email: "user",
      password: "wildcart"
    })
  }

}
