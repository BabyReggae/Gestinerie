import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { rejects } from 'assert';



@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(' fake redirection , on auth == true || current value => ' , this.authService.isAuth );
    
    if( this.authService.isAuth == true  ) this.router.navigate([ "dashboard" ]);

  }

  onSignIn(){
    console.log('click event is up');

    let res = this.authService.signIn();

    res.then( () => {
      if( this.authService.isAuth == true  ) 
        this.router.navigate([ "dashboard" ]);
      else
        console.log( "la valeur de auth est tjrs a false :s" );

    })

  }


}
