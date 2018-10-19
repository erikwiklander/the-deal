import { Comment } from './test.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  public itemCollection: AngularFirestoreCollection<Comment>;
  public newComment: string;
  public comments: Comment[] = [];

  constructor(private db: AngularFirestore) {
    this.itemCollection = db.collection<Comment>('/items');
    this.itemCollection.ref.orderBy('creationDate', 'desc').onSnapshot(
      querySnapshot => {
        this.comments = [];
        querySnapshot.forEach(
          queryDocumentSnapshot => this.comments.push(queryDocumentSnapshot.data() as Comment));
      });
   }

  ngOnInit() {
  }

  onEnter() {
    const comment = new Comment(this.newComment);
    this.itemCollection.add({...comment});
    this.newComment = '';
  }

}
