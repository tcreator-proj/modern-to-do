import Id from './Id';

export class ToDoItem {
  protected _id: Id;
  protected edited: boolean;
  protected _mark: boolean;
  protected _text: string;

  constructor(text: string) {
    this._id = new Id();
    this.edited = false;
    this._mark = false;
    this._text = text;    
  }

  public getId(): Id {
    return this._id;
  }

  public changeText(newText: string):void {
    if(this._text === newText) return;

    this.edited = true;
    this._text = newText;
  }

  public getEdited(): boolean {
    return this.edited;
  }

  public getText(): string {
    return this._text;
  }

  public toggleMark(): void {
    this._mark = !this._mark;
  }

  public toMark(): void {
    this._mark = true;
  }

  public toUnmark(): void {
    this._mark = false;
  }

  public getMark(): boolean {
    return this._mark;
  }


}