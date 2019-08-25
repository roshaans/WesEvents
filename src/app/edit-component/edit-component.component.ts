import { PopoverController } from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss'],
})
export class EditComponentComponent implements OnInit {
  id: string;
  constructor(private router: Router, private ActivatedRoute: ActivatedRoute, private alertController: AlertController, private popoverController:PopoverController) { 

    this.id = this.ActivatedRoute.snapshot.paramMap.get('id')

  }

  ngOnInit() {}


  edit() {
    this.router.navigateByUrl("editEvent/"+this.id)
    this.popoverController.dismiss()

  }

  addUpdates() {
    this.router.navigateByUrl("editEvent/"+this.id)
    this.popoverController.dismiss()

  }

  checkGoing() {
    this.router.navigateByUrl("show-going/" + this.id)
    this.popoverController.dismiss()

  }



  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Disclaimer',
      message: "Are you sure you would like to delete this event?"
      ,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.alertController.dismiss()
            this.popoverController.dismiss()

                   }, 
          
        }, 
          
        
      ]
    });

    await alert.present();
  }
}
