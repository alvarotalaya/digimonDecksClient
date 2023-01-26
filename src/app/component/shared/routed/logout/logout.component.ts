import { Location } from '@angular/common';
import { MetadataService } from 'src/app/service/metadata.service';
import { IUser } from 'src/app/model/user-interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmitEvent, Events, SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  strOperation: string = "logout"
  strEmail: string = "";
  oUserSession: IUser;

  constructor(
    private oRouter: Router,
    private oSessionService: SessionService,
    protected oLocation: Location,
    public oMetadataService: MetadataService
  ) {

  if (this.oSessionService.isSessionActive()) {
    this.strEmail = this.oSessionService.getEmail();
  } else {
    this.oRouter.navigate(['/home']);
  }

}

ngOnInit() {
}

logout() {
  this.oSessionService.logout();
  this.oSessionService.emit(new EmitEvent(Events.logout, ""));
  this.oRouter.navigate(['/home']);
}

}


