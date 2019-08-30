// import { Firebase } from '@ionic-native/firebase/ngx';
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import  * as firebase from 'firebase/app';
import { Component, NgModule, ViewChild,ElementRef, Output } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import {Event} from '../../Models/Event'
import { AngularFireAuth } from '@angular/fire/auth';
import {iconDict} from './../../Models/CategoryIconsDictionary'
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { AlertController , Platform} from '@ionic/angular';
import * as moment from 'moment';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage  {

  @ViewChild('myInput') myInput: ElementRef;
  result;

  
resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px' ;
}
  iconsMatch = iconDict;
  description;
  starttime: Date;
  endtime: Date ;
  date;
  invited;
  location ;
  selected;
  selectedCategory ;
  selectedLocation ;
  title ;
  other = "custom field";
  user: any;
  createEventForm: FormGroup;
  imageUploaded: Boolean = false; 
  imageURI: string; 
  viewMode = false;
   event: Event;
  
   imageResponse: any;
  options: any;
 
  constructor(private imagePicker: ImagePicker,public platform: Platform ,public alertController: AlertController, private camera: Camera, private file: File,private fireauth: AngularFireAuth, private fStore: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController, private FirebaseDatabase: FirebaseDatabaseService) {
   
    this.createEventForm = this.formBuilder.group({
      'event_title' : [null, Validators.required],
      'event_location' : [null, Validators.required], 
      'event_students' : [null, Validators.required], 
      'event_date' : [null, Validators.required],
      'event_startTime' : [null, Validators.required],
      'event_endTime' : [null, Validators.required],
      'event_description' : [null, Validators.required],
      'event_category' : [null, Validators.required],
      "event_creation_timeStamp" : [ firebase.firestore.FieldValue.serverTimestamp()]
     
    });

    

  }
  
  ionViewDidEnter() {
    this.myInput.nativeElement.style.height = "130px";

    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    })
  }

  showToast(msg) {
    this.toastCtrl.create({
      position: 'top',
      message: msg, 
      duration: 4000
    }).then(toast => toast.present());
  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Disclaimer',
      message: "Be mindful that people can see who you are. Your account is subject to disqualification if you post any inappropriate content. "
      ,
      buttons: [
        {
          text: 'Edit',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Show Preview',
          handler: () => {
            var preview: string = "preview"
            var some= {'detail': {'value': preview}}
            console.log(some)
            this.segmentChanged(some) 
              this.alertController.dismiss()

                   }, 
          
        },
        {
          text: 'Create Event',
          handler: () => {
          
          this.createEvent()
          
          
          }, 
          
        }
      ]
    });

    await alert.present();
  }

  filterTime(){
var newHour = moment(this.starttime).hour()


    var hour = newHour
    if (hour >= 6 && hour < 12 ) {
      return "morning"
    } else if( hour >= 12 && hour< 17) {
      return "afternoon"
    } else if (hour >= 17 && hour< 20) {
      return "evening"
    } else if (hour >= 20 && hour<= 24) {
      return "night"
    }
  }

  createEvent() {
    //  this.date = moment(this.date).format("YYYY-MM-DD")

    // this.date = new Date(this.date)

    // this.starttime = new Date(this.starttime)
    // this.endtime = new Date(this.endtime)


    // this.starttime.setDate(this.date.getDate())
    // this.endtime.setDate( this.date.getDate());

  
    this.event = {  
    event_title: this.createEventForm.controls["event_title"].value,
    event_location: this.createEventForm.controls["event_location"].value,  
    event_students: this.createEventForm.controls["event_students"].value, 
    event_category: this.createEventForm.controls["event_category"].value, 
    event_date: this.createEventForm.controls["event_date"].value, 
    event_startTime: this.createEventForm.controls["event_startTime"].value, 
    event_endTime: this.createEventForm.controls["event_endTime"].value  , 
    event_creation_timeStamp: this.createEventForm.controls["event_creation_timeStamp"].value,
    event_description: this.createEventForm.controls["event_description"].value,
    event_pictureURL: "", 
    event_chatNumber: 0, 
    event_goingCounter: [], 
    event_maybeGoingCounter: 0,
    createdBy: [this.user.uid, this.user.displayName],
    time: this.filterTime()
  }
  
  this.FirebaseDatabase.createEvent(this.event, this.user.uid)
    // this.alertController.dismiss()

    //  this.clearFields()
    this.showToast("Event has been created. Please head to the profile section to make any edits to your event.");
    
  //  this.router.navigateByUrl("tabs/tab4")

  }

  segmentChanged(ev: any) {
    if (ev['detail']['value'] == "edit") {
      this.viewMode = false

    } else if (ev['detail']['value'] == "preview") {
      this.viewMode = true


    }
   
  }
  clearFields() {
    this.description = "";
    // this.starttime= "";
    // this.endtime= "";
    // this.date= "";
    this.invited= "";
    this.location= "";
    this.selected= "";
    this.selectedCategory= "";
    this.selectedLocation= "";
    this.title= ""; 
  }


  

  takePhoto(sourceType:number) {
if (this.platform.is(
'ios'
)){
  const options: CameraOptions = {
    quality: 100,
    allowEdit: true,
    targetWidth: 100,
targetHeight: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: sourceType,
  }
  this.camera.getPicture(options).then((imageData) => {
    console.log('i am ios')
    console.log("Image Data will print in a bit")
    console.log(imageData, "imagedata ")
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.imageURI = base64Image
     this.imageUploaded = true;

    this.uploadImage(base64Image)

    }
  , (err) => {
    console.log(err, "err")
    // Handle error
  });

} else if (this.platform.is('android')) {
  const options: CameraOptions = {
    quality: 50,
    allowEdit: true,
    targetWidth: 100,
targetHeight: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType:sourceType,
  }
  this.camera.getPicture(options).then((imageData) => {
    this.imageUploaded = true;
    console.log("Image Data will print in a bit")
    console.log(imageData, "imagedata ")
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.imageURI = base64Image
    
    this.uploadImage(base64Image)
  }, (err) => {
    console.log(err, "err")
    // Handle error
  });
}   

   
  }
  removePic() {
    this.imageUploaded = false; 
    this.imageURI = "";
    this.camera.cleanup()
  }



  uploadImage(imageURI){
    console.log("uplaoding Image Now")
    // return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().refFromURL('gs://wesleyaneventsapp.appspot.com');
      console.log("storage")
      // let imageRef = storageRef.child('image').child('imageName');

      // console.log(imageRef, "imageRef")
      // //  this.encodeImageUri(imageURI, function(image64){
      //   imageRef.putString(imageURI, 'data_url')
      //   .then(snapshot => {
      //     console.log(snapshot.downloadURL, "download")
      //     // cons÷(snapshot.downloadURL)
      //   }, err => {
      //     console.log("error", err)
      //     // reject(err);
      //   })
      // })
    //  })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
  /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    // console.log(this.imageURI, "imageURI")

    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref("images/" + _imageBlobInfo.fileName);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      //maximumImagesCount: 3,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 200,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 25,

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }
}
