import { Component, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'redirect',
    template: require('./redirect.component.html'),
    styles: [require('./redirect.component.css')]
})
export class RedirectComponent implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (isBrowser) {
            if (this.route.snapshot.url[0].path == "RoddenberryPrizeVideo")
                window.location.replace("https://youtu.be/kg2U_go4RLk");
        }
    }
}

