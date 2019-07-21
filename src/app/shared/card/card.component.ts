import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
// import { ActivityFilterComponent } from './../../filters/Activity/activity-filter.component'
import { UserService } from '../../services/user/user.service'
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Event } from '../../Models/Event';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Firebase from 'firebase/app';
import { Database } from '@firebase/database';
import 'firebase/database';
import { iconDict } from '../../Models/CategoryIconsDictionary';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id?;
  iconsMatch = iconDict
  event: Event;
  colorScheme = { "Sports": ["#FF0000", "#195DF7"], "Party": "#36454f" }
  startTime?;
  endTime?;



  constructor(private tab1: Tab1Page, private userService: UserService, private route: ActivatedRoute, private router: Router, private firebaseDatabase: FirebaseDatabaseService) {
    // console.log(this.colorScheme["Sports"][0].valueOf(), "priting value")
    // console.log(this.colorScheme["Sports"][0], "priting sports")

  }


  ngOnInit() {
    this.fetchEvent()


  }
  seeMore() {
    this.router.navigateByUrl('/card/' + this.id)
  }

  categoryClicked(event_category) {
this.tab1.categoryPressed(event_category);
this.router.navigateByUrl("/tabs/tab1")
  }
  showGoingList() {
    this.fetchEvent()
    this.router.navigateByUrl("show-going/" + this.id)

  }
  fetchEvent() {
    if (this.id) {
      this.firebaseDatabase.getEvent(this.id).subscribe(res => {
        this.event = res
        this.startTime = new Date(this.event.event_startTime)
        this.endTime = new Date(this.event.event_endTime)
      })
    }
  }

  // categoryClicked(category) {
  //   this.activity.categoryPressed(category)
  // }

}
