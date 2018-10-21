

export class Comment {
    creationDate: Date;
    public id: string;
    constructor(public comment: string) {
      this.creationDate = new Date();
    }
  }
