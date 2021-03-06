import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { NavyrPage } from '../navyr/navyr';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm;
  loading;

  constructor(public navCtrl: NavController, public authData: AuthService, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password:['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      
      cedula: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
      apellidos: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      nombres: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      telefono: ['', Validators.compose([Validators.minLength(7), Validators.required])],
      nacimiento: ['', Validators.compose([Validators.required])]
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.authData.createUser(this.authData.displayUID(), this.signupForm.value.email,this.signupForm.value.nombres,this.signupForm.value.apellidos,this.signupForm.value.cedula,
        this.signupForm.value.telefono, this.signupForm.value.nacimiento)
        this.navCtrl.setRoot(NavyrPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToRoot(){
    this.navCtrl.setRoot(NavyrPage);
  }
}
