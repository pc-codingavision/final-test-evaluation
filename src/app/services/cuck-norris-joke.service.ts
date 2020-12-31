import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Joke } from '../models/model';
import { catchError, map, tap } from 'rxjs/operators';

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
export class CuckNorrisJokeService {

  readonly RANDOM_JOKE_API_ENDPOINT = environment.chuckNorrisRandomJokeApi;

  // tslint:disable-next-line:variable-name
  _jokes$ = new BehaviorSubject<Array<Joke>>([]);

  jokes: Array<Joke> = [];
  private FILTER_IS_LIKED = (joke: Joke) => joke.isLiked === true;
  private FILTER_IS_DISLIKED = (joke: Joke) => joke.isDisliked === true;
  private FILTER_IS_ARCHIVED = (joke: Joke) => joke.isArchived === true;

  constructor(private httpClient: HttpClient) {
  }

  getRandomJoke(): Observable<Joke> {
    return this.httpClient.get<JokeResponse>(this.RANDOM_JOKE_API_ENDPOINT).pipe(
      map((jokeResponse: JokeResponse) => jokeResponse.value),
      map((response: Joke) => {
        return Object.assign({}, response, {joke: response.joke.replace('&quot;', '"')});
      }),
      map(r => new Joke(r.id, r.joke, r.categories)),
      tap(joke => this.jokes.push(joke)),
      catchError(error => {
        throw new Error(error);
      })
    );
  }

  likeJoke(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.isLiked = true;
      found.isDisliked = false;
      found.isArchived = false;
      this.dispatchJokes();
    }
  }

  dislikeJoke(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.isLiked = false;
      found.isDisliked = true;
      found.isArchived = false;

      this.dispatchJokes();
    }
  }

  archive(joke: Joke): void {
    const found = this.jokes.find(j => j.id === joke.id);
    if (found) {
      found.isLiked = false;
      found.isDisliked = false;
      found.isArchived = true;
      this.dispatchJokes();
    }
  }

  delete(joke: Joke): void {
    _.remove(this.jokes, j => j.id === joke.id);
    this.dispatchJokes();
  }

  getAllJokes(): Observable<Array<Joke>> {
    return this._jokes$.asObservable();
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
