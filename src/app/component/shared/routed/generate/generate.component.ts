import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/model/player-interface';
import { MetadataService } from 'src/app/service/metadata.service';
import { GenerateService } from 'src/app/service/generate.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { CountService } from 'src/app/service/count.service';

@Component({
  selector: 'app-randomload',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  oUserSession: IPlayer;
  nPlayers: number = 0;
  nUsertypes: number = 0;
  nCarddecks: number = 0;
  nDecks: number = 0;
  nCards: number = 0;
  strResult: string = "";
  bLoading:boolean=false;

  constructor(
    public oGenerateService: GenerateService,
    public oCountService: CountService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    protected oLocation: Location,
    public oMetadataService: MetadataService
  ) {
    this.getCount();
  }

  ngOnInit(): void { }

  getCount(): void {
    this.bLoading=true;
    this.oCountService.getCountPlayers().subscribe((n: number) => this.nPlayers = n);
    this.oCountService.getCountDecks().subscribe((n: number) => this.nDecks = n);
    this.oCountService.getCountCarddecks().subscribe((n: number) => this.nCarddecks = n);
    this.oCountService.getCountUsertypes().subscribe((n: number) => this.nUsertypes = n);
    this.oCountService.getCountCards().subscribe((n: number) => this.nCards = n);
    this.bLoading=false;
  }

  generatePlayers(n: number): void {
    this.bLoading=true;
    this.oGenerateService.generatePlayers(n).subscribe(
      (num: number) => {
        this.strResult = "There are " + num + " Players";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  generateUsertypes() {
    this.bLoading=true;
    this.oGenerateService.generateUsertypes().subscribe(
      (num: number) => {
        this.strResult = "There are " + num + " tipos de producto";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }
  generateCarddecks(n: number): void {
    this.bLoading=true;
    this.oGenerateService.generateCarddecks(n).subscribe(
      (num: number) => {
        this.strResult = "There are " + num + " Carddecks";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  generateDecks(n: number): void {
    this.bLoading=true;
    this.oGenerateService.generateDecks(n).subscribe(
      (num: number) => {
        this.strResult = "There are " + num + " Decks";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }

  getAllCards(n: number): void {
    this.bLoading=true;
    this.oGenerateService.getAllCardsAPI(n).subscribe(
      (num: number) => {
        this.strResult = "There are " + num + " Cards";
        this.bLoading=false;
        this.openModal();
      },
      err => {
        this.strResult = "ERROR: " + err.message;
        console.error('ERROR: ', err);
        this.bLoading=false;
        this.openModal();
      })
  }


//modal 
eventsModalSubject: Subject<string> = new Subject<string>();

openModal() {
  this.eventsModalSubject.next(" ");
}

onCloseModal() {
  this.getCount();
  this.strResult = "";
}

}
