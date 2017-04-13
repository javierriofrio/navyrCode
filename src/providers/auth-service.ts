import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  private userList : FirebaseListObservable<any>;

  constructor(public auth$: AngularFireAuth, private database: AngularFireDatabase) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
    this.userList = this.database.list("/development/private/users");
    
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.auth$.login({
      email: newEmail,
      password: newPassword
    });
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signOut(): void {
    console.log("entro aqui");
    this.auth$.logout();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    
    
    return this.auth$.createUser({ email: newEmail, password: newPassword });
  }


  createUser(uid: string, newEmail: string, nombre: string, apellido: string, cedula: string, telefono: string, fechaNacimiento: string){
    const userInfo = {
      apellido: apellido,
      nombre: nombre,
      cedula: cedula,
      email: newEmail,
      telefono: telefono,
      fechaNacimiento: fechaNacimiento,
      habilitado: true
    }
    this.userList.$ref.ref.child(uid).set(userInfo);
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }


  displayUID(): string{
    if (this.authState != null) {
      return this.authState.uid;
    } else {
      return '';
    }
  }
}
