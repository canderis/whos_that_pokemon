import { Component } from '@angular/core';
import { ControlService } from './control.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'whosthatpokemon';

  options = [];
  correct = "";
  reveal = false;

  constructor(private controlService: ControlService){

  }

   shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
    chose(choice){
        console.log(choice);
        if(choice === this.correct){
            console.log("Correct!");
        }
        this.reveal = true;

    }
    nextPokemon(){
        this.controlService.nextPokemon();
    }

  ngOnInit(): void {
      this.controlService.getSubject().subscribe(data => {
          this.reveal = false;
          this.options = data.data.map( pokemon => pokemon.name);
          this.correct = this.options[0];
          this.options = this.shuffle(this.options);

      });
   }
}
