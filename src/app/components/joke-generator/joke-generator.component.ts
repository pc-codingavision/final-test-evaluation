import { Component, OnInit } from '@angular/core';
import { Joke } from '../../models/model';
import { CuckNorrisJokeService } from '../../services/cuck-norris-joke.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-joke-generator',
  templateUrl: './joke-generator.component.html',
  styleUrls: ['./joke-generator.component.css']
})
export class JokeGeneratorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _fetchTime = 30000;     // 5000ms
  joke: Joke;
  jokeSubscription: Subscription;

  constructor(private jokeService: CuckNorrisJokeService) {
  }

  ngOnInit(): void {
    this.jokeService.getRandomJoke().subscribe(joke => this.joke = joke);
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

  private getJokeSubscription(time: number): Subscription {
    return interval(time).pipe(
      switchMap(() => this.jokeService.getRandomJoke())
    ).subscribe(joke => this.joke = joke);
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
}
