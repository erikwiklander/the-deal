import * as firebase from 'firebase/app';

export class Comment {
    public id: string;
    constructor(public comment: string, public creationDate: firebase.firestore.FieldValue) {
    }
  }
