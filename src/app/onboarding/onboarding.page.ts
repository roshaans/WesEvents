import { Component, ViewChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController, IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {


  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }
async finish() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  }
}
