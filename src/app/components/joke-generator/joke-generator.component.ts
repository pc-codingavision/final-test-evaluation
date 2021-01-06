import { Component, OnDestroy, OnInit } from '@angular/core';
import { Joke, VoteType } from '../../models/model';
import { ChuckNorrisJokeService } from '../../services/chuck-norris-joke.service';
import { interval, Subscription, timer } from 'rxjs';
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

  initialSubscription: Subscription;
  jokeSubscription: Subscription;

  VoteType = VoteType;

  constructor(private jokeService: ChuckNorrisJokeService) {
  }

  ngOnInit(): void {
    this.initialSubscription = this.jokeService.getRandomJoke()
      .subscribe(joke => this.joke = joke);
    this.jokeSubscription = this.getJokeSubscription(this._fetchTime);
  }

  set fetchTime(time: number) {
    this._fetchTime = time;
    this.jokeUnsubscribe();
    this.jokeSubscription = this.getJokeSubscription(time);
  }

  get fetchTime(): number {
    return this._fetchTime;
  }

  vote(type: VoteType, joke: Joke): void {
    switch (type) {
      case VoteType.LIKE:
        this.jokeService.likeJoke(joke);
        break;
      case VoteType.DISLIKE:
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
    this.initialSubscription.unsubscribe();
    this.jokeUnsubscribe();
  }

  private jokeUnsubscribe(): void {
    if (this.jokeSubscription) {
      this.jokeSubscription.unsubscribe();
    }
  }
}
