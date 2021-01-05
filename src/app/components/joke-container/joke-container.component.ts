import { Component, OnInit } from '@angular/core';
import { ChuckNorrisJokeService } from '../../services/chuck-norris-joke.service';
import { Observable } from 'rxjs';
import { CardContainerType, Joke } from '../../models/model';

@Component({
  selector: 'app-joke-container',
  templateUrl: './joke-container.component.html',
  styleUrls: ['./joke-container.component.css']
})
export class JokeContainerComponent implements OnInit {

  CardContainerType = CardContainerType;

  likedJokes$: Observable<Joke[]>;
  dislikedJokes$: Observable<Joke[]>;
  archivedJokes$: Observable<Joke[]>;

  constructor(private jokeService: ChuckNorrisJokeService) {
  }

  ngOnInit(): void {
    // this.allJokes$ = this.jokeService.getAllJokes();
    this.likedJokes$ = this.jokeService.getAllLikedJokes();
    this.dislikedJokes$ = this.jokeService.getAllDisLikedJokes();
    this.archivedJokes$ = this.jokeService.getAllArchivedJokes();
  }

  onJokeLiked(joke: Joke): void {
    this.jokeService.likeJoke(joke);
  }

  onJokeDisliked(joke: Joke): void {
    this.jokeService.dislikeJoke(joke);
  }

  onJokeArchived(joke: Joke): void {
    this.jokeService.archive(joke);
  }

  onJokeDeleted(joke: Joke): void {
    this.jokeService.delete(joke);
  }
}
