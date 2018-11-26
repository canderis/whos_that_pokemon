import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControlService  {

    private settings = {
        gens:{
            1:true,
            2:false,
            3:false,
            4:false,
            5:true,
            6:false,
            7:false,
        },
        revealed: false
    }

    private subject = new Subject<any>();

  constructor(private http: HttpClient) {

  }

  nextPokemon(){
      let promises = [];
      while(promises.length < 4){
          let gen = -1;
          let choice = 0;

          do{
              gen = Math.floor((Math.random() * 7) + 1);
          }while(!this.settings.gens[gen]);

          let range = function (min, max){
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          switch(gen){
              case 1:
                choice = range(1, 151);
                break;
              case 2:
                choice = range(152, 251);
                break;
              case 3:
                choice = range(252, 386);
                break;
              case 4:
                choice = range(387, 493);
                break;
              case 5:
                choice = range(494, 649);
                break;
              case 6:
                choice = range(650, 721);
                break;
              case 7:
                choice = range(722, 807);
                break;
          }

          promises.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${choice}/`).toPromise());

      }

      Promise.all(promises).then(data =>{
          this.subject.next({data:data, settings:this.settings});
      });

  }

  getSubject(){
      return this.subject.asObservable();
  }

}
