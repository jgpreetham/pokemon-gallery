import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CharactersService } from './service/characters.service';
import { MatGridListModule, MatPaginatorModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharacterListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatPaginatorModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CharactersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
