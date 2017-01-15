import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FieldElementComponent } from './field-element/field-element.component';

import { AlgorithmService } from './algorithm';

@NgModule({
  declarations: [
    AppComponent,
    FieldElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AlgorithmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
