import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettleIt } from '../../services/SettleIt'
import { MainData } from '../../services/mainData.service';
import { StatementComponent } from './statement/statement.component';
import { ChildrenComponent } from './children/children.component';

@Component({
    selector: 'edit',
    template: require('./edit.component.html'),
    styles: [require('./edit.component.css')]
})
export class EditComponent implements OnInit {

    jsonTextArea: string

    constructor(
        private route: ActivatedRoute,
        public mainData: MainData
    ) { }

        ngOnInit() {

        this.route.params.forEach((params: Params) => {
            if (params['url']) {
                var url = params['url'];
                this.getData("http://" + url);
            }
        });

        if (this.route.snapshot.url[0].path == "Is-the-Legal-System-in-The-United-States-of-America-Racist-original")
            this.getData("https://gist.githubusercontent.com/BentleyDavis/294e1b522637a53dd695d55a032a6606/raw");

        if (this.route.snapshot.url[0].path == "Is-the-Black-Lives-Matter-movement-a-net-detriment-to-society-original")
            this.getData("https://gist.githubusercontent.com/BentleyDavis/08905162e55d93c84b5ec2ee364a49e1/raw");

    }

    getData(url) {
        url = url.replace(/\*/g, '.'); //convert * to periods to get around .net routing period issue
        this.mainData.getData(url)
            .subscribe(data => {
                if (data.version == undefined) data.version = this.mainData.version;
                this.mainData.data = data;
                this.mainData.si.calculate(this.mainData.data.mainStatement);
                this.jsonTextArea = JSON.stringify(this.mainData.data, null, 2);
            });
    }

    updateFromJsonTextArea(value) {
        try {
            var tempData = JSON.parse(value);
            this.mainData.si.calculate(tempData.mainStatement);
            this.mainData.data = tempData;
        } catch (error) {
            //ignore since manual errors will be frequent
        }

    }
}

