import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";

import axios from "axios";
import _ from "lodash";

import WeatherCard from "./weatherCard";
import Map from "./map";

const path = "https://geocode-maps.yandex.ru/1.x/";

function Cards() {
  const [APIData, setAPIData] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [latitude, setlLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Вызываем данные с апи погоды при получении данных с геокодера
  useEffect(() => {
    if ((latitude != null) & (longitude != null) & (address != null)) {
      getWeather(latitude, longitude);
    }
  }, [address]);

  // Функция запрашивает даныне с openMeteo по долготе и широте
  let getWeather = (lat, long) => {
    try {
      // Получаем данные с бэка
      axios
        .get("http://localhost:4000/weather/daily", {
          params: {
            latitude: lat,
            longitude: long,
          },
        })
        .then((res) => {
          // Преобразуем данные с апи в объект
          //   Сшиваем массивы
          let data = _.zip(
            res.data.daily.time,
            res.data.daily.temperature_2m_max,
            res.data.daily.temperature_2m_min,
            res.data.daily.apparent_temperature_max,
            res.data.daily.apparent_temperature_min,
            res.data.daily.precipitation_sum,
            res.data.daily.weathercode,
            res.data.daily.sunrise,
            res.data.daily.sunset,
            res.data.daily.windspeed_10m_max,
            res.data.daily.winddirection_10m_dominant,
            res.data.daily.shortwave_radiation_sum
          );
          let objData = [];
          data.map((w) => {
            let d = {
              time: w[0],
              temperature_2m_max: w[1],
              temperature_2m_min: w[2],
              apparent_temperature_max: w[3],
              apparent_temperature_min: w[4],
              precipitation_sum: w[5],
              weathercode: w[6],
              sunrise: w[7],
              sunset: w[8],
              windspeed_10m_max: w[9],
              winddirection_10m_dominant: w[10],
              shortwave_radiation_sum: w[11],
            };
            objData.push(d);
          });
          setAPIData(objData);
        });
    } catch (error) {
      setError(error);
      console.log({ error });
    }
  };

  // Функция для получения данных геокодера
  let handleAddress = (addressMap) => {
    axios
      .get(path, {
        params: {
          // Это портфолио проект, так бы я это убрал, конечно.
          apikey: "649cfb7f-8ab9-4221-86d1-5e0d22312ef9",
          geocode: addressMap,
        },
      })
      .then((res) => {
        // API возвращает XML. Парсим в JSON
        let resJSON = new XMLParser().parseFromString(res.data);
        let point =
          resJSON.children[0].children[1].children[0].children[4].children[0]
            .value;
        point = point.split(" ");
        setLongitude(point[0]);
        setlLatitude(point[1]);
        setAddress(
          resJSON.children[0].children[1].children[0].children[2].value
        );
      })
      .catch((error) => {
        setError("Что-то пошло не так!");
      });
  };

  // При загрузке данных с сервера рендерим карточки с погодой
  let cards = APIData
    ? APIData.map((data, key) => {
        return <WeatherCard data={APIData[key]} address={address} />;
      })
    : null;

  return (
    <div className="container">
      {error ? JSON.stringify(error) : null}
      <Map handleAddress={handleAddress} />
      {address ? (
        <h4 className="text-center">{address}. Погода на неделю</h4>
      ) : null}
      <div className="row row-cols-1  g-5">{cards}</div>
    </div>
  );
}

export default Cards;
