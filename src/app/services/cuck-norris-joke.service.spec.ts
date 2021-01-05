import { TestBed } from '@angular/core/testing';

import { ChuckNorrisJokeService } from './chuck-norris-joke.service';

describe('CuckNorrisJokeService', () => {
  let service: ChuckNorrisJokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckNorrisJokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
