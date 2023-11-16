export default class WeatherService {
  static async getWeather(city) {  //make static method async
    try {  //wrap code in try...catch to handle errors b/c async can't resolve/reject promises
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    }
      catch (error) {
      return error;
    }
  }
}
