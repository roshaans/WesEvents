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
import * as moment from 'moment';
import { create } from 'domain';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id?;

  sinceDate?:any;
  iconsMatch = iconDict
  event: Event;
  colorScheme = { "Sports": ["#FF0000", "#195DF7"], "Party": "#36454f" }
  startTime?: Date;
  endTime?;
  date?;
  time?;


  constructor(private tab1: Tab1Page, private userService: UserService, private route: ActivatedRoute, private router: Router, private firebaseDatabase: FirebaseDatabaseService) {
    // console.log(this.colorScheme["Sports"][0].valueOf(), "priting value")
    // console.log(this.colorScheme["Sports"][0], "priting sports")

  }
  filterTime(){
    var hour = this.startTime.getHours()
    if (hour >= 6 && hour < 12 ) {
      return "Morning"
    } else if( hour >= 12 && hour< 17) {
      return "Afternoon"
    } else if (hour >= 17 && hour< 20) {
      return "Evening"
    } else if (hour >= 20 && hour<= 24) {
      return "Night"
    }
  }

  fetchEvent() {
    if (this.id) {
      this.firebaseDatabase.getEvent(this.id).subscribe(res => {
        this.event = res
        this.startTime = new Date(this.event.event_startTime)
        this.endTime = new Date(this.event.event_endTime)
        this.date = res.event_creation_timeStamp
        var creationDateObjectInMilliseconds = this.date.seconds * 1000 + this.date.nanoseconds / 1000000
        var createDate = moment.unix(creationDateObjectInMilliseconds/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')      
        this.sinceDate = moment(createDate, 'dddd, MMMM Do, YYYY h:mm:ss A').fromNow(); // 8 years ago
        this.time = this.filterTime() 
      })
    }
  }

  ngOnInit() {
    this.fetchEvent()


  }
  seeMore() {
    this.router.navigateByUrl('/card/' + this.id)
  }

  categoryClicked(event_category) {
// this.tab1.categoryPressed(event_category);
this.router.navigateByUrl("/tabs/tab1")
  }
  showGoingList() {
    this.fetchEvent()
    this.router.navigateByUrl("show-going/" + this.id)

  }


  // categoryClicked(category) {
  //   this.activity.categoryPressed(category)
  // }

}
