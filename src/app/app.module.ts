import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JokeGeneratorComponent } from './components/joke-generator/joke-generator.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JokeContainerComponent } from './components/joke-container/joke-container.component';
import { JokeContainerCardComponent } from './components/joke-container-card/joke-container-card.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeGeneratorComponent,
    JokeContainerComponent,
    JokeContainerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
