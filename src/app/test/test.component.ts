import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public items: Observable<any[]>;
  public newComment: string;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('/items').valueChanges();
   }

  ngOnInit() {
  }

  onEnter() {
    this.db.collection('items').add(
      {comment: this.newComment, date: new Date()});
    this.newComment = '';
  }

}
