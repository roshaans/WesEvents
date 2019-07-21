import { UserService } from '../services/user/user.service'
import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../services/firebaseDatabase/firebase-database.service'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-show-going',
  templateUrl: './show-going.page.html',
  styleUrls: ['./show-going.page.scss'],
})
export class ShowGoingPage implements OnInit {
  id;
  event;
  goingIDs = [];
  goingUsers = [];
  members = false;
  constructor(private route: ActivatedRoute, private user: UserService, private firebaseDatabase: FirebaseDatabaseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.fetchmembers()
  }
  fetchmembers() {
    this.goingUsers = [];
    this.goingIDs = []
    this.firebaseDatabase.getEvent(this.id).subscribe(res => {
      this.event = res
      if (res["event_goingCounter"]) {
        if (res.event_goingCounter.length > 0) {
          this.members = true


          this.goingIDs = res.event_goingCounter

          this.goingIDs.forEach(element => {
            this.user.getUsername(element).subscribe((snapshot) => {
              this.goingUsers.push(snapshot.payload.data())
            })
          });
        }

      }
    })
  }
  doRefresh(event) {

    this.fetchmembers()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }




}
