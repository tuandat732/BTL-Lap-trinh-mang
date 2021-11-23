export class Model {
  _id: string | number;
  created_at?: string;
  updated_at?: string;

  constructor(args: Partial<Model>) {
    this.doInit(args);
  }

  protected doInit(args: Partial<Model>) {
    Object.assign(this, args);
  }
}
