import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from '../models';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  constructor(private afAuth: AngularFireAuth,
              private afStore: AngularFirestore){

  }

  setAuth(user: User): void {
    this.currentUserSubject.next(user);
    if(user){
      this.isAuthenticatedSubject.next(true);
    }else{
      this.isAuthenticatedSubject.next(false);
    }
  }


  register(data): Promise<User> {
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result)=> {
        let user = new User();
        user.displayName = result.displayName;
        user.email = result.email,
        user.emailVerified = result.emailVerified;
        user.isAnonymous = result.isAnonymous;
        user.photoURL = result.photoURL;
        user.providerData = result.providerData;
        user.refreshToken = result.refreshToken;
        user.uid = result.uid;
        this.afStore.collection('users').doc(user.uid).set(
          {
            id: user.uid,
            email: user.email
          }
        )
        .then((document)=>{
          resolve(user)
        })
        .catch((error)=>{
          resolve(error);
        });

      },(error) => {
        reject(error);
      });
    });
  }

  login(data): Promise<User> {
    return new Promise((resolve, reject)=> {
      this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then((result)=> {
        let user = new User();
        user.displayName = result.displayName;
        user.email = result.email,
        user.emailVerified = result.emailVerified;
        user.isAnonymous = result.isAnonymous;
        user.photoURL = result.photoURL;
        user.providerData = result.providerData;
        user.refreshToken = result.refreshToken;
        user.uid = result.uid;
        resolve(user);
      }, (error)=> {
        reject(error);
      });
    });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  onAuthStateChanged(): Promise<User> {
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.onAuthStateChanged((result)=> {
        if(result){
          let user = new User();
          user.displayName = result.displayName;
          user.email = result.email,
          user.emailVerified = result.emailVerified;
          user.isAnonymous = result.isAnonymous;
          user.photoURL = result.photoURL;
          user.providerData = result.providerData;
          user.refreshToken = result.refreshToken;
          user.uid = result.uid;
          resolve(user);
        }else{
          resolve(null);
        }
      });
    });
  }

  logOut(): Promise<boolean> {
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signOut().then(()=>{
        localStorage.clear();
        sessionStorage.clear();
        resolve(true);
      },
       (error) => {
         reject(error);
       }
     );
    });
  }
}
