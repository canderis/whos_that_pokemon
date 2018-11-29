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
  correct = '';
  reveal = false;

  totalCorrect = 0;
  totalMissed = 0;
  settings = {
    gens: [true, false, false, false, false, true, true, ],
    revealed: false
};

  constructor(private controlService: ControlService) {}

   shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    chose(choice) {
        if (choice === this.correct) {
            this.totalCorrect++;
        } else {
            this.totalMissed++;
        }
        this.options = [];
        this.reveal = true;
    }

    nextPokemon() {
        this.controlService.nextPokemon();
    }

    toggle(i) {
        this.settings.gens[i] = !this.settings.gens[i];
    }

    ngOnInit(): void {
        this.controlService.getSubject().subscribe(data => {
            this.reveal = false;
            this.options = data.data.map( pokemon => pokemon.species.name);
            this.correct = this.options[0];
            this.options = this.shuffle(this.options);
        });

        this.settings = this.controlService.getSettings();
    }
}
