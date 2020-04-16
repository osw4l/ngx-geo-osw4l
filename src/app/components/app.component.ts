import {Component} from '@angular/core';
import {YELLOW_MARKER_URL, TARKGET_MARKET_URL} from './constants';
import {environment} from '../../environments/environment';
import {ApiService} from '../services/api.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geo-osw4l';
  public latitude = 4.703867;
  public longitude = -74.0724951;
  public lat = 4.703867;
  public lng = -74.0724951;
  public mapTypeId = 'satelite';
  public zoom: 13;
  public data = [];
  public progress = 100;
  public requestLoading = false;
  public marketIcon = TARKGET_MARKET_URL;
  public requestDoneSuccess = null;
  public requestFail = null;
  public testers = [
    {id: 1, name: 'Banners', url: 'banners/'},
    {id: 2, name: 'Business', url: 'business/all/'},
  ];
  public location = {latitude: null, longitude: null, radius: null};
  public currentUrl: null;
  public radius = null;
  polygon: any;

  constructor(private api: ApiService) {
    this.radius = 200;
  }

  addMarker(lat: number, lng: number) {
    this.longitude = lng;
    this.latitude = lat;
  }

  clickLocation(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;
    this.lat = lat;
    this.lng = lng;
    this.location.latitude = lat;
    this.location.longitude = lng;
    // tslint:disable-next-line:radix
    this.location.radius = parseInt(this.radius);
  }

  changeCenter(event: any) {
    const lat = event.lat;
    const lng = event.lng;
    this.lat = lat;
    this.lng = lng;
    this.location.latitude = lat;
    this.location.longitude = lng;
    // tslint:disable-next-line:radix
    this.location.radius = parseInt(this.radius);
  }

  onChangeSelect(endpoint) {
    this.currentUrl = endpoint;
    if (endpoint !== null) {
      console.log(endpoint);
      this.getData();
    }
  }

  getData() {
    this.requestLoading = true;
    this.requestDoneSuccess = null;
    this.requestFail = false;
    this.data = [];
    setTimeout(() => {
      this.api.get(`${environment.http_server}/${this.currentUrl}`, this.location).subscribe(
        data => {
          this.data = data;
          this.requestLoading = false;
          this.requestDoneSuccess = true;
          console.log(data);
        }, res => {
          console.log(res.error.message);
          setTimeout(() => {
            this.requestLoading = false;
            this.requestFail = true;
          }, 5000);
        });
    }, 2500);
  }

  changeRadius(radius) {
    this.radius = radius;
    // tslint:disable-next-line:radix
    this.location.radius = parseInt(radius);
    this.getData();
  }

  clearMap() {
    this.data = [];
  }

  parseDistance(distance) {
    const d = distance.replace(' ', '');
    let newDistance: any = parseInt(d.replace('m', ''));
    if (newDistance < 1000) {
      newDistance = `${parseInt(newDistance)} m`;
    } else {
      const kmDistance = parseFloat(newDistance) / 1000;
      newDistance = `${kmDistance.toFixed(1)} km`;
    }
    return newDistance;
  }

}
