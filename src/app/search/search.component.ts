import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../services/weather.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  searchResults;
  query;
  notFound = false;
  geoService;
  position;

  constructor(private weatherService: WeatherService) {
    this.geoService = new Geolocation();
    this.geoService.getCurrentPosition().then(pos => (this.position = pos));
  }

  ngOnInit() {}

  searchCity() {
    this.notFound = false;
    this.weatherService.searchCity(this.query).subscribe(
      results => (this.searchResults = results),
      err => {
        console.dir(err);
        if (err.status === 404) {
          this.notFound = true;
        }
      }
    );
  }

  getCityByGeo() {
    while (!this.position.coords) {
      console.log("please wait");
    }
    this.weatherService
      .getCityByPosition(
        this.position.coords.latitude,
        this.position.coords.longitude
      )
      .subscribe(city => (this.searchResults = city));
  }
}
