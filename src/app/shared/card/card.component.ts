import { UserService } from '../../services/user/user.service'
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Event } from '../../Models/Event';
import { Component, OnInit, Input} from '@angular/core';
import {card} from '../../Models/cardDetail';
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
  going: Number = 0;
  event: Event;
  maybe: Number = 0;
  goingIDs;
  goingUserObjects = [];

  colorScheme = {"Sports": "#195DF7", "Party": "#36454f" }
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,private firebaseDatabase: FirebaseDatabaseService) { 
    
  }


  ngOnInit() {
    

    this.refreshGoingButton()


  }
  showGoingList () {
    this.refreshGoingButton()
    this.router.navigateByUrl("show-going/" + this.id)
  
}
  refreshGoingButton() {
    if(this.id) {
    this.firebaseDatabase.getEvent(this.id).subscribe( res => {
      console.log(res, "res")
      this.event = res
      
      console.log("inside refreshGoingButton")

    //   if(res.event_goingCounter){ 
    //     if(res.event_goingCounter.length > 0) {
    //       console.log("inside guard")

    //       this.going = res.event_goingCounter.length
    //      this.goingIDs = res.event_goingCounter
    //    }
   
    // }
    })
  }
  } 
  // showCardDetail(id) {
  //   this.router.navigateByUrl('/card/' + id);
  // }
}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}