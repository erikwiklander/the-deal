import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Comment } from '../message/message.model';
import { DataSource } from '@angular/cdk/table';
import { Observable, from } from 'rxjs';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})

export class MessageTableComponent implements OnInit {

  public itemCollection: AngularFirestoreCollection<Comment>;

  displayedColumns: string[] = ['comment', 'creationDate'];
  dataSource: CommentDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private db: AngularFirestore) {
    this.dataSource = new CommentDataSource(db, this.paginator);
  }

  ngOnInit() {
  }
}

export class CommentDataSource extends DataSource<Comment> {
  constructor(private db: AngularFirestore, private paginator: MatPaginator) {
    super();
  }
  connect(): Observable<Comment[]> {
    const itemCollection = this.db.collection<Comment>('/comments');
    return from(itemCollection.ref.orderBy('creationDate', 'asc').get()
      .then(querySnapshot => querySnapshot.docs.map(doc => {
        const c = doc.data() as Comment;
        c.id = doc.id;
        return c;
      })));
  }

  disconnect() {}

}
