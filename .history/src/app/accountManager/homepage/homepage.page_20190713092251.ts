import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
login() {
this.router.navigateByUrl("/login")
}

register() {
  this.router.navigateByUrl("/signup")

}
}
