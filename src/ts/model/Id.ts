import {nanoid} from 'nanoid';
export default class Id {
  protected _id: string;
  constructor() {
    this._id = nanoid();
  }

  public get id(): string {
    return this._id;
  }

  public toEqual(nextId: Id): boolean {
    return this._id === nextId.id;
  } 
}