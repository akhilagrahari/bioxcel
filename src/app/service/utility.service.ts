import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  getAvatarImageUrl(userid: number, iscache: boolean = false) {
    if (iscache) {
      return environment.apiBaseUrl + 'img/' + userid + '&t=' + this.randomise(10, 100);
    } else {
      return environment.apiBaseUrl + 'img/' + userid;
    }
  }
  getUserName(userInfo) {
    return userInfo.name ? userInfo.name : userInfo.handle;
  }
  randomise(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  jsUcfirst(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  base64_decode(encodedData) {
    // eslint-disable-line camelcase
    // tslint:disable-next-line:prefer-const
    const b64 =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1;
    let o2;
    let o3;
    let h1;
    let h2;
    let h3;
    let h4;
    let bits;
    let i = 0;
    let ac = 0;
    let dec = '';
    const tmpArr = [];

    if (!encodedData) {
      return encodedData;
    }

    encodedData += '';

    do {
      // unpack four hexets into three octets using index points in b64
      h1 = b64.indexOf(encodedData.charAt(i++));
      h2 = b64.indexOf(encodedData.charAt(i++));
      h3 = b64.indexOf(encodedData.charAt(i++));
      h4 = b64.indexOf(encodedData.charAt(i++));

      bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

      o1 = (bits >> 16) & 0xff;
      o2 = (bits >> 8) & 0xff;
      o3 = bits & 0xff;

      if (h3 === 64) {
        tmpArr[ac++] = String.fromCharCode(o1);
      } else if (h4 === 64) {
        tmpArr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < encodedData.length);

    dec = tmpArr.join('');

    return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
  }
}
