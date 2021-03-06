import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ControlService  {

    private settings = {
        gens: [true, false, false, false, false, true, true, ],
        revealed: false
    };

    private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  nextPokemon() {
      const promises = [];
      while (promises.length < 4) {
          let gen = -1;
          let choice = 0;

          do {
              gen = Math.floor((Math.random() * 7));
          }while (!this.settings.gens[gen]);

          const range = function (min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
          };

          switch (gen + 1) {
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
                choice = range(722, 802);
                break;
          }

          promises.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${choice}/`).toPromise());

      }

      Promise.all(promises).then(data => {
          this.subject.next({data: data, settings: this.settings});
      });

  }

  getSettings() {
      return this.settings;
  }

  getSubject() {
      return this.subject.asObservable();
  }

}
