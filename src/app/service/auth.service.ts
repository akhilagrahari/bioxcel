import { UtilityService } from './utility.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any = null;
  public userinfo: any;
  public zoomUserInfo: any;
  constructor(
    private utility: UtilityService
  ) {
  }
  private checkToken() {
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
    if (token) {
      this.token = token;
    }
  }
  /**
   * checkAuthntication
   */
  async checkAuthntication() {
    const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
    if (token) {
      this.token = token;
    }
    return token;
  }
  public getAuthToken() {
    if (this.token) {
      return this.token;
    } else {
      const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
      if (token) {
        this.token = token;
      }
      return this.token;
    }
  }
  public addAuthToken(token) {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
  }


  public isAuthenticated() {
    if (this.token) {
      return true;
    } else {
      const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
      if (token) {
        return true;
      }
    }
  }
  addUserInfo(userinfo: any) {
    this.userinfo = userinfo;
    this.userinfo.userPic = this.utility.getAvatarImageUrl(this.userinfo.userid, true);
    localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
  }
  getUserInfo() {
    return JSON.parse(localStorage.getItem('userinfo'));
  }


  AddEnterpriseInfo(enpInfo) {
    localStorage.setItem('enpInfo', JSON.stringify(enpInfo));
  }

  getEnterpriseInfo() {
    return JSON.parse(localStorage.getItem('enpInfo'));
  }
  async addZoomUserInfo(userinfo: any) {
    this.zoomUserInfo = userinfo;
    localStorage.setItem('zoomUserInfo', JSON.stringify(this.zoomUserInfo));
  }
  getZoomUserInfo() {
    return JSON.parse(localStorage.getItem('zoomUserInfo'));
  }

}

export function authProviderFactory(provider: AuthService) {
  return () => provider.getAuthToken();
}