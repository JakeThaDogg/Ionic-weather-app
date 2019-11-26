import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  searchCity(query) {
    return this.http.get(`${environment.apiUrl}q=${query}`);
  }

  getCityByPosition(lattitude, longitude) {
    return this.http.get(
      `${environment.apiUrl}lat=${lattitude}&lon=${longitude}`
    );
  }
}
