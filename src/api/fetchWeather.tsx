import axios from "axios";

const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "0425a8069e3661edfbb680702f88aa75";

interface Coordinates {
  lat: number | undefined;
  lon: number | undefined;
}

interface CoordData {
  data: Coordinates[];
}

//TODO: change the type
export interface Weather {
  main: {
    temp: number;
  };
  name: string;
  sys: {
    country: string;
  };
  weather: [
    {
      icon: string;
      description: string;
    }
  ];
}

const getGeocodingData = async (city: string) => {
  try {
    const data: CoordData = await axios.get(GEO_URL, {
      params: {
        q: city,
        appid: API_KEY,
        limit: 1,
      },
    });

    return { lat: data.data?.at(0)?.lat, lon: data.data?.at(0)?.lon };
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherData = async (city: string): Promise<Weather> => {
  const coordData = await getGeocodingData(city);

  const data = await axios.get(WEATHER_URL, {
    params: {
      ...coordData,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data.data;
};
