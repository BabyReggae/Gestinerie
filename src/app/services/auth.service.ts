import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { promise } from 'protractor';


declare var $:any;

@Injectable()
export class AuthService {

    constructor( 
        private httpClient: HttpClient, 
        private router: Router ,
        // protected alertService: AlertService, 
        // private modalService:ModalService 
    ){}

    isAuth = false;

    signIn( /*loginUser : loginUser*/ ) {
        return new Promise(
            (resolve, reject) => {
                setTimeout( ()=>{
                    this.isAuth = true;
                    console.log('auth component set auth to true')
                    resolve( true );
                } , 1000 )
            //api call to check userinformation validity
            // this.httpClient
            // .post('http://localhost:8080/api/user/log_user', { loginReq :  loginUser } )
            // .subscribe( (data : any) => {
            //     if( data.token ){
            //         this.isAuth = true;
            //         //store token somewhere ?
            //         this.onLoginSuccess();
            //         resolve( data );
            //     }else{
            //         this.isAuth = false;
            //         reject( data );//read error
            //     }

            // });

            }   
        );
    }

    signOut( /*token : string*/  ) {
        this.isAuth = false;
        // return new Promise(
        //     (resolve, reject) => {
        //         console.log( token , "TOKEN BEFORE SEND " );

        //     this.httpClient
        //     .post('http://localhost:8080/api/user/unlog_user', { token :  token } )
        //     .subscribe( (data : any) => {
        //         this.isAuth = false;
        //         console.log( data );
        //         resolve(data);
        //     });

        //     }   
        // );

        
    }

}