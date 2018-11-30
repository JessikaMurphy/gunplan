import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, merge } from 'rxjs/operators';

import { Kit } from '../kit';

interface User{
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  kitList?: Observable<Kit[]>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  item: Observable<any[]>;
   
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        }else{
          return of(null)
        }
      })
    )
  }
  googleLogin(){
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    console.log('clicked the button');
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      kitList: user.kitList
    }
    return userRef.set(data, { merge: true });
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
  updateUserColor(){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`);
    console.log(this.afAuth.auth.currentUser.uid);
    const data= {
      favoriteColor: 'pink',
    }
    userRef.update(data);
  }
  addKitToKitList(kit){
    const thisKit: Kit = {
      image: kit.image,
      title: kit.title,
      info_text: kit.info_text,
      link: kit.link,
      release_date: kit.release_date,
      series: kit.series
    }

    console.log(kit.title,'clicked');
  }
  
  


}


