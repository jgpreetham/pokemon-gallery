import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Character } from '../model/character.model';
import { Observable } from 'rxjs/Observable';
import { CharacterResponse } from '../model/character-response';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/observable/throw';

@Injectable()
export class CharactersService {
  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  constructor(private http: HttpClient) { }

  getCharacters(): Observable<CharacterResponse> {
    const response: Observable<CharacterResponse> = this.http.get<CharacterResponse>(this.pokemonUrl)
      .timeoutWith(60000, Observable.throw(new Error('Time out while fetching data')));
    return response;
  }
}
