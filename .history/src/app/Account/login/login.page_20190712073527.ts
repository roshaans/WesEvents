import { Component, OnInit } from '@angular/core';

// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import {AngularFireAuth} from '@angular/fire/auth'

// import '@angular/compiler-cli'
// import { FirebaseAuth } from '@angular/fire';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../../services/auto.service'
// ../services/user/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
 
  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,public afAuth: AngularFireAuth) {

      this.loginForm = this.formBuilder.group({
        email: ['',
          Validators.compose([Validators.required, Validators.email])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      });
    
     }

  ngOnInit() {
  }
  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create({
        
    });
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }
}
