import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { CharactersService } from '../service/characters.service';
import { Character } from '../model/character.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatGridList, MatPaginator } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, AfterContentInit {
  characters: Character[] = [];
  allCharacters: Character[] = [];
  viewCharacters: Character[] = [];
  @ViewChild('tile') grid: MatGridList;
  pageSize = 20;
  currentPage = 1;
  totalSize = 0;
  start = 0;
  end = 20;
  searchText = '';
  noOfTiles = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  }
  alerts: any[] = [];
  constructor(private characterService: CharactersService, private observableMedia: ObservableMedia) { }

  //search the entered text
  search() {
    this.viewCharacters = this.allCharacters.filter(character => character.name.indexOf(this.searchText) !== -1);
    if (this.searchText === '') {
      const tempChars = this.characters.slice(this.start, this.end);
      this.viewCharacters = tempChars;
    }
  }

  //fetch characters from server on component initilaization
  ngOnInit() {
    this.getCharacterList();
  }

  //pagination is achieved with angular material paginator
  public handlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.end = (this.currentPage + 1) * this.pageSize;
    this.start = this.currentPage * this.pageSize;
    const slicedCharacters = this.characters.slice(this.start, this.end);
    this.viewCharacters = slicedCharacters;

  }

  //responsive behaviour achieved using flex layout and angular material grid list
  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((mediaChange: MediaChange) => {
      this.grid.cols = this.noOfTiles[mediaChange.mqAlias];
    });
  }

  //get the characters list from server
  getCharacterList() {
    this.characterService.getCharacters().subscribe(characterListResponse => {
      characterListResponse.results.forEach(char => {
        this.characters.push(new Character(char.name,
          char.url.slice(char.url.lastIndexOf('/pokemon/') + 9, char.url.lastIndexOf('/'))));
      });
      this.allCharacters = this.characters;
      this.totalSize = this.characters.length;
      this.viewCharacters = this.characters.slice(this.start, this.end); //show only the first 20 characters on the first page
    },
      error => {
        this.handleError(error);
      });
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.alerts.push({
      type: 'ERROR',
      message: 'Something bad happened; please try again later.'
    });
  }
}
