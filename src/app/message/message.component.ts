import { Comment } from './message.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-test',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  public itemCollection: AngularFirestoreCollection<Comment>;
  public newComment = '';
  public comments: Comment[] = [];
  public now: Date;

  constructor(private db: AngularFirestore) {
    this.itemCollection = db.collection<Comment>('/comments');
    this.itemCollection.ref.orderBy('creationDate', 'asc').onSnapshot(
      querySnapshot => {
        querySnapshot.docChanges().forEach(documentChange => {
          if (documentChange.type === 'added') {
            const c = documentChange.doc.data() as Comment;
            c.id = documentChange.doc.id;
            this.comments.unshift(c);
          } else if (documentChange.type === 'removed') {
            this.comments.splice(this.comments.findIndex(c => c.id === documentChange.doc.id), 1);
          }
        });
      });
   }

  ngOnInit() {
  }

  onDeleteClick(comment: Comment) {
    this.itemCollection.doc(comment.id).delete();
  }

  onEnter() {
    this.now = new Date();
    if (this.newComment.length > 0) {
      const comment = new Comment(this.newComment, firebase.firestore.FieldValue.serverTimestamp());
      this.itemCollection.add({...comment});
      this.newComment = '';
    }
  }

}
