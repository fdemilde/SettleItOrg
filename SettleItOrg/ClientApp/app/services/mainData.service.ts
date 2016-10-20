import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SettleIt } from '../components/edit/SettleIt'

// export class mainData {
//   constructor(public id: number, public name: string) { }
// }

@Injectable()
export class MainData implements OnInit {

  public data: { mainStatement: Statement, settings: Settings }
  public si: SettleIt
  public selected: Statement

  constructor(private _http: Http) {
    this.data = {
      mainStatement: <Statement>{},
      settings: <Settings>{}
    };

    this.si = new SettleIt();
    this.si.calculate(this.data.mainStatement);
  }

  ngOnInit() {

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