import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { NavyrPage } from '../navyr/navyr';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm: any;
  public loading: any;

  constructor(public navCtrl: NavController, public authData: AuthService,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          document.getElementById("usuario").innerHTML = "test";
          document.getElementById("sesion-in").style.display = "none";
          document.getElementById("sesion-out").style.display = "flex";
          document.getElementById("cuenta").style.display = "flex";
          document.getElementById("favoritos").style.display = "flex";
          document.getElementById("puntos").style.display = "flex";
          document.getElementById("reservas").style.display = "flex";
          this.navCtrl.setRoot(NavyrPage);
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
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

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  goToRoot() {
    this.navCtrl.setRoot(NavyrPage);
  }

}
