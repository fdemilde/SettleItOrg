import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SettleIt } from './SettleIt'

@Injectable()
export class MainData implements OnInit {
    public version: "0.3.0"
    public data: { mainStatement: Statement, settings: Settings, version: string }
    public si: SettleIt
    public selected: Statement

    constructor(private _http: Http) {
    }

    ngOnInit() {
        this.data = {
            mainStatement: <Statement>{},
            settings: <Settings>{},
            version: this.version
        };

        this.si = new SettleIt();
        this.si.calculate(this.data.mainStatement);
    }

    calculateAll() {
        this.si.calculate(this.data.mainStatement);
    }

    getData(url: string) {
        return this._http.get(url)
            .map(
            (response: Response) =>
                response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}