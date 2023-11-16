export default class WeatherService {
  static getWeather(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
    // fetch() itself returns a promise in form of Response object (has prop of ok, status, statusText, .json etc). but almost never rejects a promise
      .then(function(response) {
        if (!response.ok) {
          // console.log(response);
          return response.json()  //response.json is asynch and returns a promise itself, so need to call .then() to handle response
            .then(function(apiErrorMessage) {
              const errorMessage = `${response.status} ${response.statusText} ${apiErrorMessage.message}`;
              throw new Error(errorMessage);
            });
        } else {
          // console.log(response);
          return response.json();  //this specifically parses json. data retrieved Now, transfer complete Later
        }
      })
      .catch(function(error) {
        return error;
      });
    //FETCH REPLACES THIS:   
    /*  request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, city]);
        } else {
          reject([this, response, city]);
        }
      });
      request.open("GET", url, true);
      request.send();
    }); */
  }
}
