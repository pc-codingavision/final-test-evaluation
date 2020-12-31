/* tslint:disable:variable-name */
export class Joke {
  constructor(
    private _id: number,
    private _joke: string,
    private _categories: Array<string>,
    private _isLiked = false,
    private _isDisliked = false,
    private _isArchived = false
  ) {}

  get isLiked(): boolean {
    return this._isLiked;
  }

  set isLiked(value: boolean) {
    this._isLiked = value;
  }

  get isDisliked(): boolean {
    return this._isDisliked;
  }

  set isDisliked(value: boolean) {
    this._isDisliked = value;
  }

  get isArchived(): boolean {
    return this._isArchived;
  }

  set isArchived(value: boolean) {
    this._isArchived = value;
  }

  get id(): number {
    return this._id;
  }

  get joke(): string {
    return this._joke;
  }

  get categories(): Array<string> {
    return this._categories;
  }
}

export enum CardContainerType {
  LIKED, DISLIKED, ARCHIVED
}

