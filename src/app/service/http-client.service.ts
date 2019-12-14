import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
export class RequestData {
  constructor(
    public data: any,
    public token?: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements OnInit {
  private sendData: RequestData = new RequestData({}, '');
  tokenInfo: any;
  constructor(private http: HttpClient, private auth: AuthService,
    private Utility: UtilityService) {
  }
  ngOnInit() {
    this.tokenInfo = this.auth.getAuthToken();
  }
  postRequest(method: string, params: any) {
    return new Promise((resolve, reject) => {
      const headers: any = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('source', 'web-app');
      this.tokenInfo = this.auth.getAuthToken();
      params = params || {};
      this.sendData.data = params;
      if (this.tokenInfo) {
        this.sendData.token = this.tokenInfo.token;
      }
      this.http
        .post(environment.apiBaseUrl + method, JSON.stringify(this.sendData), {})
        .subscribe(
          data => {
            const respData: any = data;
            const jsondata = this.Utility.base64_decode(respData.response);
            resolve(JSON.parse(jsondata));
          },
          err => {
            if (err.status === 401) {
              console.log(err);
            } else {
              reject(err);
            }
          }
        );
    });


  }

  getRequest(method: string, rparams: any) {
    return new Promise((resolve, reject) => {
      const headers: any = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("source", "app");
      rparams = rparams || {};
      this.http
        .get(environment.apiBaseUrl + method, { params: rparams })
        .subscribe(
          data => {
            let res: any = data;
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

}
