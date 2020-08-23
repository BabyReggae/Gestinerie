import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { rejects } from 'assert';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(' fake redirection , on auth == true || current value => ' , this.authService.isAuth );
    
    //set connenxion token
    //localStorage.setItem('token', suc.token );
    //get connexion token 
    let connexionToken:any = localStorage.getItem('token');

    if( this.authService.isAuth == true  ) this.router.navigate([ "dashboard" ]);

  }

  onSignIn( form:NgForm ){
    console.log('data => ' , form.value );

    let res = this.authService.signIn( form.value );

    res.then( () => {
      if( this.authService.isAuth == true  ) 
        this.router.navigate([ "dashboard" ]);
      else
        console.log( "la valeur de auth est tjrs a false :s" );

    })

  }


}
