import { switchMap, tap, combineAll, startWith } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, QueryDocumentSnapshot } from 'angularfire2/firestore';
import { Comment } from '../message/message.model';
import { DataSource } from '@angular/cdk/table';
import { Observable, from, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';

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
  @ViewChild(MatSort) sort: MatSort;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.dataSource = new CommentDataSource(this.db, this.paginator, this.sort);
  }
}

export class CommentDataSource extends DataSource<Comment> {

  pageSize = 10;
  last: any = {};

  constructor(private db: AngularFirestore, private paginator: MatPaginator, private sort: MatSort) {
    super();
  }
  connect(): Observable<Comment[]> {
    const itemCollection = this.db.collection<Comment>('/comments');
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.last = {};
    });
    this.sort.sortChange.subscribe(() => console.log('change!',
      this.paginator.pageIndex * this.pageSize, this.sort.direction === 'asc' ? 'asc' : 'desc'));

    return merge(this.paginator.page, this.sort.sortChange)
      .pipe(startWith({}),
        switchMap(() => from(itemCollection.ref.orderBy(this.sort.active,
          this.sort.direction === 'asc' ? 'asc' : 'desc') // .startAt(this.last)
          .limit(this.paginator.pageSize).get()
          .then(querySnapshot => querySnapshot.docs.map(doc => {
            this.last = doc;
            const c = doc.data() as Comment;
            c.id = doc.id;
            return c;
          })))));
  }

  disconnect() { }

}
