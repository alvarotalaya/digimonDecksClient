import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarddeck, ICarddeck2Send } from 'src/app/model/carddeck-interface';
import { SessionService } from 'src/app/service/session.service';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { StatsService } from 'src/app/service/stats.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
declare let bootstrap: any;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-carddeck-plist-user-routed',
  templateUrl: './carddeck-plist-user-routed.component.html',
  styleUrls: ['./carddeck-plist-user-routed.component.css'],
  template: '<div [chart]="chart"></div>',
})
export class CarddeckPlistUserRoutedComponent implements OnInit {

  responseFromServer: IPage<ICarddeck>;
  //
  oCarddeck2Send: ICarddeck2Send = null;
  strTermFilter: string = "";
  id_cardFilter: number = 0;
  id_deckFilter: number = 0;
  numberOfElements: number = 50;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  //
  faEye = faEye;
  faUserPen = faUserPen;
  faTrash = faTrash;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  //
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //
  idCard: number = null;
  strUsertype: string = "";
  id: number = 0;
  //
  datos: string = "";
  plus: string = "plus";
  minus: string = "minus"
  //
  level2: number = 0;
  level3: number = 0;
  level4: number = 0;
  level5: number = 0;
  level6: number = 0;
  level7: number = 0;
  digitama: number = 0;
  digimon: number = 0;
  tamer: number = 0;
  option: number = 0;
  listCards: string = "";

  columnChart1
  columnChart2
  edit: number = 0;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
    private oRouter: Router,
    private oSessionService: SessionService,
    private oStatsService: StatsService
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
    this.id_deckFilter = this.id;
  }

  ngOnInit() {
    this.getPage();
    this.grafico();
  }

  getPage() {
    this.oCarddeckService.getCarddecksPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_deckFilter,this.id_cardFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<ICarddeck>) => {
          this.responseFromServer = resp;
          if (this.page > resp.totalPages - 1) {
            this.page = resp.totalPages - 1;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
    this.setPage(1);
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.getPage();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  setDirection(direction: string): void{
    if (direction == "asc") {
      this.sortDirection = "asc";
    } else {
      this.sortDirection = "desc";
    }
    this.getPage();
  }

  openModalCard(idCard: number): void {
    this.myModal = new bootstrap.Modal(document.getElementById("carddetail"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.idCard = idCard;
    this.myModal.show()
  }

  closeCardModal() {
    this.myModal.hide();
  }

  changeCopies(idCarddeck:number, copiesSend:number, idCard:number, idDeck:number, signe:string){
    if(signe == "plus"){
      copiesSend++;
    } else if (signe == "minus"){
      copiesSend--;
    }
    this.oCarddeck2Send = {
      id: idCarddeck,
      copies: copiesSend,
      card: {id: idCard},
      deck: {id: idDeck}
    }
    this.oCarddeckService.updateOne(this.oCarddeck2Send).subscribe({
      next: (data: number) => {
        window.location.reload();
      }
    });
  }

  stats(){
    console.log("stats started")
    for(let i = 0; i <= this.responseFromServer.totalElements - 1; i++){
      switch(this.responseFromServer.content[i].card.level){
        
        case 2:{
          this.level2 += this.responseFromServer.content[i].copies;
          break;
        }
        case 3:{
          this.level3 += this.responseFromServer.content[i].copies;;
          break;
        }
        case 4:{
          this.level4 += this.responseFromServer.content[i].copies;;
          break;
        }
        case 5:{
          this.level5 += this.responseFromServer.content[i].copies;;
          break;
        }
        case 6:{
          this.level6 += this.responseFromServer.content[i].copies;;
          break;
        }
        case 7:{
          this.level7 += this.responseFromServer.content[i].copies;;
          break
        }
        default:{
          break;
        }
      }

      switch(this.responseFromServer.content[i].card.type){
        case "Digi-Egg":{
          this.digitama += this.responseFromServer.content[i].copies;
          break;
        }
        case "Digimon":{
          this.digimon += this.responseFromServer.content[i].copies;
          break;
        }
        case "Option":{
          this.option += this.responseFromServer.content[i].copies;
          break;
        }
        case "Tamer":{
          this.tamer += this.responseFromServer.content[i].copies;
          break;
        }
        default:{
          break;
        }
      }
    }
    console.log("stats finished")
  }

  textPdf(){
    for(let i = 0; i <= this.responseFromServer.totalElements - 1; i++){
      this.listCards += this.responseFromServer.content[i].copies + "x " +
      this.responseFromServer.content[i].card.name + " " + this.responseFromServer.content[i].card.cardnumber + "\n"
    }
  }

  pruebaPdf(){
    this.textPdf();
    const pdfDefinition: any = {
      content:[
        {
          text: this.responseFromServer.content[1].deck.name,
          style: 'header',
          alignment: 'center'
        },
        {
          text: 'by ' + this.responseFromServer.content[1].deck.player.name,
          style: 'subheader',
          alignment: 'center'
        },
        this.listCards
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    }

    const pdf  = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    this.listCards = "";
  }

  changeEdit(){
    if(this.edit == 0){
      this.edit = 1
    } else {
      this.edit = 0;
    }
  }

  grafico(){
    console.log(this.edit)
    this.columnChart1 = new Chart({
      chart: {
        type: 'column',
        backgroundColor: '#0B0F19',
      },
      title: {
        text: "Digimon's level",
        style:{
          fontWeight: 'bold',
          color: 'white',
          fontSize: '16px'
        }
      },
      legend: {
        enabled:false
      },
      tooltip:{
        enabled: false
      },
      xAxis: {
        categories: [
          'Level 2',
          'Level 3',
          'Level 4',
          'Level 5',
          'Level 6',
          'Level 7',
        ],
        crosshair: true,
        labels:{
          style:{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '13px'
          }
        }
      },
      yAxis: {
        title: null,
        gridLineWidth: 0,
        labels:{
          enabled: false
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          pointWidth: 55
        }
      },
      credits:{
        enabled: false
      },
      series: [{
        type: "column",
        data: [4, 12, 12, 8, 5, 1],
        dataLabels:[{
          enabled: true,
          inside: false,
          style: {
            fontSize: '16px',
            textOutline: '0px',
          }
        }]
      }]
    });

    this.columnChart2 = new Chart({
      chart: {
        type: 'column',
        backgroundColor: '#0B0F19',
      },
      title: {
        text: "Type of cards",
        style:{
          fontWeight: 'bold',
          color: 'white',
          fontSize: '16px'
        }
      },
      legend: {
        enabled:false
      },
      tooltip:{
        enabled: false
      },
      xAxis: {
        categories: [
          'Digitama',
          'Digimon',
          'Tamer',
          'Option'
        ],
        crosshair: true,
        labels:{
          style:{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '13px'
          }
        }
      },
      yAxis: {
        title: null,
        gridLineWidth: 0,
        labels:{
          enabled: false
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          pointWidth: 55
        }
      },
      credits:{
        enabled: false
      },
      series: [{
        type: "column",
        data: [4, 38, 5, 7],
        dataLabels:[{
          enabled: true,
          inside: false,
          style: {
            fontSize: '16px',
            textOutline: '0px',
          }
        }]
      }]
    });
  }
}
