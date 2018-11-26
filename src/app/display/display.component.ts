import { Component, OnInit, Input } from '@angular/core';
import { ControlService } from '../control.service';


@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
    url="";
    @Input() revealed = false;
    revealedOverride = false;
    get display() {return this.revealedOverride || this.revealed};

    getStyle() {
        if(!this.display) return {filter:"brightness(0%)"};
        return {};
    }

  constructor(private controlService: ControlService) { }

  ngOnInit() {
      this.controlService.getSubject().subscribe(data => {
          console.log('here',data);
          this.url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +  this.pad(data.data[0].id, 3) + ".png";
          this.revealed = false;
          if(data.settings.revealed)
            this.revealedOverride = true;
      });
  }
   pad(n, width, z=null) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

}
