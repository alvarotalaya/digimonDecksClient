import { Component, OnInit } from '@angular/core';
import { Events, SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  strEmail: string = "";
  strUsertype: string = "";

  constructor(
    private oSessionService: SessionService,
  ) {
    this.strEmail = oSessionService.getPlayer();
  }

  ngOnInit() {
    this.oSessionService.on(Events.login).subscribe(
      (data: string) => {
        this.strEmail = this.oSessionService.getPlayer();
        this.strUsertype = this.oSessionService.getUsertype();
        console.log(this.strUsertype)
      });
    this.oSessionService.on(Events.logout).subscribe(
      (data: string) => {
        this.strEmail = '';
      });
  }

}
