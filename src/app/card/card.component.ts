import { Component, OnInit } from '@angular/core';
import {card} from '../Models/cardDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
   newCard =  new card("My Name is Khan and I ", 
  "", 
   "", 
   "", 
 "Wed, July 20, 2019", 
  "", 
  "", 
   "", 
  0, 
   0, 
   0)
   
   

  constructor(private router: Router) { 
  }

  ngOnInit() {}

  // showCardDetail(id) {
  //   this.router.navigateByUrl('/card/' + id);
  // }
}
