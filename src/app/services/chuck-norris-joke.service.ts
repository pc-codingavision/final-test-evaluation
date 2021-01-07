import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joke, JokeStatus } from '../models/model';
import { catchError, map } from 'rxjs/operators';

import * as _ from 'lodash';

class JokeResponse {
  constructor(
    public type: string,
    public value: Joke
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisJokeService {

  readonly RANDOM_JOKE_API_ENDPOINT = environment.chuckNorrisRandomJokeApi;
  // tslint:disable-next-line:variable-name
  _jokes$ = new BehaviorSubject<Array<Joke>>([]);
  jokes: Array<Joke> = [];

  private readonly FILTER_IS_LIKED = (joke: Joke) => joke.status === JokeStatus.LIKED;
  private readonly FILTER_IS_DISLIKED = (joke: Joke) => joke.status === JokeStatus.DISLIKED;
  private readonly FILTER_IS_ARCHIVED = (joke: Joke) => joke.status === JokeStatus.ARCHIVED;

  constructor(private httpClient: HttpClient) {
  }

  getRandomJoke(): Observable<Joke> {
    return this.httpClient.get<JokeResponse>(`${this.RANDOM_JOKE_API_ENDPOINT}?limitTo=[nerdy]`).pipe(
      map((jokeResponse: JokeResponse) => jokeResponse.value),
      map((response: Joke) => {
        // @ts-ignore
        return Object.assign({}, response, {joke: response.joke.replaceAll('&quot;', '"')});
      }),
      map(r => new Joke(r.id, r.joke, r.categories)),
      catchError(error => {
        console.error(`An error has occurred: `, error);
        throw new Error(error);
      })
    );
  }

  likeJoke(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.status = JokeStatus.LIKED;
    } else {
      joke.status = JokeStatus.LIKED;
      this.jokes.push(joke);
    }
    this.dispatchJokes();
  }

  dislikeJoke(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.status = JokeStatus.DISLIKED;
    } else {
      joke.status = JokeStatus.DISLIKED;
      this.jokes.push(joke);
    }
    this.dispatchJokes();
  }

  archive(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.status = JokeStatus.ARCHIVED;
    } else {
      joke.status = JokeStatus.ARCHIVED;
      this.jokes.push(joke);
    }
    this.dispatchJokes();
  }

  delete(joke: Joke): void {
    _.remove(this.jokes, j => j.id === joke.id);
    this.dispatchJokes();
  }

  getAllLikedJokes(): Observable<Joke[]> {
    return this.getJokesBasedOnFilter(this.FILTER_IS_LIKED);
  }

  getAllDisLikedJokes(): Observable<Joke[]> {
    return this.getJokesBasedOnFilter(this.FILTER_IS_DISLIKED);
  }

  getAllArchivedJokes(): Observable<Joke[]> {
    return this.getJokesBasedOnFilter(this.FILTER_IS_ARCHIVED);
  }

  private dispatchJokes(): void {
    this._jokes$.next(this.jokes);
  }

  private getJokesBasedOnFilter(filterFn: (joke) => boolean): Observable<Joke[]> {
    return this._jokes$.asObservable().pipe(
      map(jokes => jokes.filter(filterFn))
    );
  }
}
