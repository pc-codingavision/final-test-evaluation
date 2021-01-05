import { Component, OnDestroy, OnInit } from '@angular/core';
import { Joke } from '../../models/model';
import { ChuckNorrisJokeService } from '../../services/chuck-norris-joke.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-joke-generator',
  templateUrl: './joke-generator.component.html',
  styleUrls: ['./joke-generator.component.css']
})
export class JokeGeneratorComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:variable-name
  _fetchTime = 30;     // 30 seconds
  joke: Joke;
  jokeSubscription: Subscription;

  constructor(private jokeService: ChuckNorrisJokeService) {
  }

  ngOnInit(): void {
    this.jokeService.getRandomJoke()
      .subscribe(joke => this.joke = joke);
    this.jokeSubscription = this.getJokeSubscription(this._fetchTime);
  }

  set fetchTime(time: number) {
    this._fetchTime = time;
    this.jokeSubscription.unsubscribe();
    this.jokeSubscription = this.getJokeSubscription(time);
  }

  get fetchTime(): number {
    return this._fetchTime;
  }

  vote(type: string, joke: Joke): void {
    switch (type) {
      case 'UP':
        this.jokeService.likeJoke(joke);
        break;
      case 'DOWN':
        this.jokeService.dislikeJoke(joke);
        break;
    }
  }

  private getJokeSubscription(time: number): Subscription {
    return interval(time * 1000).pipe(
      switchMap(() => this.jokeService.getRandomJoke())
    ).subscribe(joke => this.joke = joke);
  }

  ngOnDestroy(): void {
    this.jokeSubscription.unsubscribe();
  }
}
