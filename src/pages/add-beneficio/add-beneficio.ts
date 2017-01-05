import { Component ,Inject,EventEmitter} from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import {AngularFireDatabase, FirebaseListObservable, FirebaseApp,AngularFire} from 'angularfire2';

import { Camera ,CameraOptions} from 'ionic-native';
import * as fetch from 'whatwg-fetch';
import 'rxjs/Rx';
declare var window: any;
/*
  Generated class for the AddBeneficio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-beneficio',
  templateUrl: 'add-beneficio.html'
})

export class AddBeneficioPage {
    storageref;
  storage;
  path;
  assetCollection: any;
  base64Image: any;
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  image: string;
  storageRef2: any;
  mensaje: string;
  firebase:any;
  rubros = [{ "name":"Red" ,"color":"Green"},{ "name":"green" ,"color":"verde"},{ "name":"naranja" ,"color":"ocre"}];
  beneficios: FirebaseListObservable<any>;
  myPhotos: string[];
  percentage:number;
  imageuploaded="notSet";
  url:boolean=false;
  interval;
  displaypic;
  selected:boolean=false;
  prog;
  reset:boolean=true;
  urlList:FirebaseListObservable<any[]>;
  constructor(public af:AngularFire,public platform: Platform,@Inject(FirebaseApp) firebaseApp: any,public navCtrl: NavController, public navParams: NavParams,public database: AngularFireDatabase) {
    this.percentage=0;
    this.beneficios = database.list('/beneficios');
    this.firebase = firebaseApp;
    this.storage =firebase.storage().ref()
   
    // const storageRef = firebaseApp.storage().ref().child('foto.jpeg');
  //   storageRef.getDownloadURL().then(url => this.image = url);
    this.storageRef2 = firebaseApp.storage().ref();
    this.mensaje = "Hola";

    this.urlList=af.database.list('/images');

  }

   ionViewDidEnter() {
      this.getPhotos();
   }


  doGetPicture() {
    // TODO:
    // get picture from camera


    Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true  // Corrects Android orientation quirks
    }).then((_imagePath) => {
      alert('got image path ' + _imagePath);
      // convert picture to blob
      //return this.dataURItoBlob(_imagePath);
      this.base64Image = 'data:image/jpeg;base64,' + _imagePath;
    });


  }

  uploadToFirebase(_imageBlob) {
    var fileName = 'sample-' + new Date().getTime() + '.jpg';

    return new Promise((resolve, reject) => {
      var fileRef = this.firebase.storage().ref('images/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        alert(_error);
      }, () => {
        // completion...
        this.getPhotos();
        resolve(uploadTask.snapshot);
      });
    });
  }

  filebuttoni(event){
    this.imageuploaded="notSet";
    let files = event.srcElement.files[0];
    let uploader=document.getElementById("uploader");
    let date= new Date();
    this.path="images/"+files.name+"("+date+")";
    let fileRef = this.firebase.storage().ref(this.path);
    let task= fileRef.put(files);
    alert(task);
    let imageuploaded;
    let percentage;
    let set=false;
    task.on('state_changed',
      function progress(snapshot){
        percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        document.getElementById("percentageprog").innerHTML=percentage;
        console.log(percentage);
      },
     // this.chk()
    );
   }



  cargafoto(){
    this.uploadPic(this.base64Image);
  }



   uploadPic(data: any): Promise<any> {
        return new Promise((resolve, reject) => {

            const path = 'users/diego' ;
            let key = this.firebase.database().ref(path).child('imgs').key;
            this.firebase.database().ref(path).child('imgs').push(data)
                .then((res) => {
                    console.log('successfully uploaded photo');
                    console.log(res);
                    resolve();
                }).catch((er) => {
                    console.error(er);
                    reject(er);
                });
        });
    }



    private getPicture(opts: CameraOptions): void {
        Camera.getPicture(opts)
            .then((imgData) => {
                this.base64Image = 'data:image/jpeg;base64,' + imgData;
            }, (er) => {
                console.error(er);
            });
    }



  getPics(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        var starCountRef = firebase.database().ref('users/diego/imgs').orderByKey();
        let pics = [];

        starCountRef.on("value",(snapshot) => {
            
            snapshot.forEach((childSnapshot) => {
            
                pics.push(childSnapshot.val());
                return false; 
            });
            resolve(pics);
          });
    });

  }


    getPhotos(): Promise<any> {
    // todo 6: get the photos from firebase
      return new Promise((resolve, reject) => {
          this.getPics()
              .then((pics: string[]) => {
                  console.log(`Got ${pics.length} pics`);
                  // console.log('Got ' + pics.length + ' pics');
                  this.myPhotos = [];
                  this.myPhotos = pics;
                  resolve();
              }).catch((er) => {
                  console.error(er);
                  reject(er);
              });
      });
    }
}
  



