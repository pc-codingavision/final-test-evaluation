import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardContainerType, Joke } from '../../models/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-joke-container-card',
  templateUrl: './joke-container-card.component.html',
  styleUrls: ['./joke-container-card.component.css']
})
export class JokeContainerCardComponent {

  @Input() cardTitle: string;
  @Input() jokes$: Observable<Array<Joke>>;
  @Input() containerType: CardContainerType;

  @Output() liked = new EventEmitter<Joke>();
  @Output() disliked = new EventEmitter<Joke>();
  @Output() archived = new EventEmitter<Joke>();
  @Output() deleted = new EventEmitter<Joke>();

  CardContainerType = CardContainerType;

  constructor() {
  }

  like(joke: Joke): void {
    this.liked.emit(joke);
  }

  dislike(joke: Joke): void {
    this.disliked.emit(joke);
  }

  archive(joke: Joke): void {
    this.archived.emit(joke);
  }

  delete(joke: Joke): void {
    this.deleted.emit(joke);
  }
}
