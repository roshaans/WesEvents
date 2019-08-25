import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private fireauth: AngularFireAuth, private router: Router,private popoverController:PopoverController) { }

  ngOnInit() {}

 openAbout() {
   this.router.navigateByUrl('/about')
   this.popoverController.dismiss()

 }
  openWesleyanAcademic() {
     window.open('https://catalog.wesleyan.edu/calendar/', '_blank')
     this.popoverController.dismiss()
  }
  openWesleying() {
    window.open('http://wesleying.org/category/events/', '_blank')
    this.popoverController.dismiss()
 }
 openWesleyanArgus() {
  window.open('http://wesleyanargus.com/', '_blank')
  this.popoverController.dismiss()
}
openWesleyanAtheletics() {
  window.open('https://athletics.wesleyan.edu/composite', '_blank')
  this.popoverController.dismiss()
}
openMovieCalendar() {
  window.open('https://www.wesleyan.edu/cfilm/Film%20Series%20Poster%20.html', '_blank')
  this.popoverController.dismiss()
}

openFacebookEvents() {
  window.open('https://m.facebook.com/pg/wesleyan.university/events/', '_blank')
  this.popoverController.dismiss()
}
openWesleyanMasterCalendar() {
  window.open('https://eaglet.wesleyan.edu/MasterCalendar/MasterCalendar.aspx?data=cr7N8e0fDWPjflNju05m7FowpKvBf0sH2RbSv0rjROOoovq7Pr9MEBmVA3QuoEqCcKQ1jbx7UfT6RNDBaJ5K3PsOkPpuYN3hhcqTbZfePMLOTE34W9ov3Sf0b8atB56noetvC5YrfzfuWbQONmQj81T2YPf6SP6apfP8dQRdftFafPUhoA9pKkUnNndn0W16qTyaRYV0qNS03BkBaMfI1bQLstULrY4tulyCyCTRHXOqR9Dv9dfTIw==', '_blank')
  this.popoverController.dismiss()
}


  close () {
    this.popoverController.dismiss()
  }
  signout() {
    this.fireauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
    this.popoverController.dismiss()

  }

}
