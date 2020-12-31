import { TestBed } from '@angular/core/testing';

import { CuckNorrisJokeService } from './cuck-norris-joke.service';

describe('CuckNorrisJokeService', () => {
  let service: CuckNorrisJokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuckNorrisJokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
