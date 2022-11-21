import React, { useEffect, useState } from "react";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../img", false, /\.(png|jpe?g|svg)$/)
);

function WeatherCard({ data, address }) {
  const [cardBack, setCardBack] = useState("drizzleLight");
  const [weatherName, setWeatherName] = useState(null);
  const [icon, setIcon] = useState(null);

  // Задаем стиль карточки и имя погоды через weatherCode
  useEffect(() => {
    switch (data.weathercode ? data.weathercode : 0) {
      case 0:
        setCardBack("clearSky");
        setWeatherName("Ясно");
        setIcon(images["d.svg"]);
        break;
      case 1:
        setCardBack("mainlyClear");
        setWeatherName("Переменная облачность");
        setIcon(images["d_c1.svg"]);

        break;
      case 2:
        setCardBack("partlyCloudy");
        setWeatherName("Облачно");
        setIcon(images["d_c2.svg"]);
        break;
      case 3:
        setCardBack("overcast");
        setWeatherName("Пасмурно");
        setIcon(images["c3.svg"]);

        break;
      case 45:
        setCardBack("fog");
        setWeatherName("Туман");
        setIcon(images["mist.svg"]);

        break;
      case 48:
        setCardBack("depositingRimeFog");
        setWeatherName("Морозный туман");
        setIcon(images["s1_mist.svg"]);
        break;
      case 51:
        setCardBack("drizzleLight");
        setWeatherName("Легкая изморось");
        setIcon(images["c3_r1.svg"]);
        break;
      case 53:
        setCardBack("drizzleModerate");
        setWeatherName("Средняя изморось");
        setIcon(images["c3_r2.svg"]);
        break;
      case 55:
        setCardBack("drizzleIntensity");
        setWeatherName("Сильная изморось");
        setIcon(images["c3_r3.svg"]);
        break;
      case 56:
        setCardBack("freezingDrizzle");
        setWeatherName("Ледяная  изморось");
        setIcon(images["c3_r1.svg"]);

        break;
      case 57:
        setCardBack("freezingDrizzleDenseIntensity");
        setWeatherName("Сильная леденая изморось");
        setIcon(images["c3_r3.svg"]);

        break;

      case 61:
        setCardBack("rainSlight");
        setWeatherName("Легкий дождь");
        setIcon(images["c3_r1.svg"]);
        break;
      case 63:
        setCardBack("rainModerate");
        setWeatherName("Дождь");
        setIcon(images["c3_r2.svg"]);

        break;
      case 65:
        setCardBack("rainHeavyIntensity");
        setWeatherName("Сильный дождь");
        setIcon(images["c3_r3.svg"]);

        break;

      case 66:
        setCardBack("freezingRainLight");
        setWeatherName("Морозный легкий дождь");
        setIcon(images["c3_rs1.svg"]);
        break;
      case 67:
        setCardBack("freezingRainHeavyIntensity");
        setWeatherName("Морозный сильный дождь");
        setIcon(images["c3_rs3.svg"]);
        break;

      case 71:
        setCardBack("snowFallSlight");
        setWeatherName("Легкий снегопад");
        setIcon(images["c3_s1.svg"]);

        break;
      case 73:
        setCardBack("snowFallModerate");
        setWeatherName("Снегопад");
        setIcon(images["c3_s2.svg"]);

        break;
      case 75:
        setCardBack("snowFallHeavyIntensity");
        setWeatherName("Сильный снегопад");
        setIcon(images["c3_s3.svg"]);

        break;

      case 77:
        setCardBack("snowGrains");
        setWeatherName("Снежные хлопья");
        setIcon(images["c3_s1.svg"]);

        break;

      case 80:
        setCardBack("rainShowersSlight");
        setWeatherName("Легкий ливень");
        setIcon(images["c3_r1.svg"]);
        break;
      case 81:
        setCardBack("rainShowersModerate");
        setWeatherName("Ливень");
        setIcon(images["c3_r2.svg"]);
        break;
      case 82:
        setCardBack("rainShowersViolent");
        setWeatherName("Сильный ливень");
        setIcon(images["c3_r3.svg"]);
        break;

      case 85:
        setCardBack("snowShowersSlight");
        setWeatherName("Легкий снег с дождем");
        setIcon(images["c3_rs1.svg"]);
        break;
      case 86:
        setCardBack("snowShowersViolent");
        setWeatherName("Сильный снег с дождем");
        setIcon(images["c3_rs3.svg"]);
        break;

      case 95:
        setCardBack("thunderstormSlight");
        setWeatherName("Гроза");
        setIcon(images["c3_st.svg"]);
        break;

      case 96:
        setCardBack("thunderstormWithSlightHail");
        setWeatherName("Шторм с легким градом");
        setIcon(images["c3_rs2_st.svg"]);
        break;
      case 99:
        setCardBack("thunderstormWithHeavyHail");
        setWeatherName("Шторм с сильным градом");
        setIcon(images["c3_rs3_st.svg"]);
        break;

      default:
        setCardBack("thunderstormWithHeavyHail");
        setWeatherName("Шторм с сильным градом");
        break;
    }
  }, []);

  return (
    <div className="col">
      <div
        className={"card shadow border-secondary " + cardBack}
        style={{ borderRadius: "30px" }}
      >
        <div className={"card-body"}>
          <div className="row">
            <div className="col-md-3">
              <img src={icon} className="icon" style={{ width: "100%" }} />
            </div>
            <div className="col-md-3">
              <h6>Температура</h6>
              <p>
                Днем: {data.temperature_2m_max} {"\u2103"}
              </p>
              <p>
                Ночью: {data.temperature_2m_min} {"\u2103"}
              </p>
              <hr></hr>
              <h6>Ощущается</h6>
              <p>
                Днем:{data.apparent_temperature_max} {"\u2103"}
              </p>
              <p>
                Ночью:{data.apparent_temperature_min} {"\u2103"}
              </p>
            </div>
            <div className="col-md-3">
              <p>Рассвет: {data.sunrise}</p>
              <p>Закат: {data.sunset}</p>
              <hr></hr>
              <p>Ветер: {data.windspeed_10m_max} км/ч</p>
              <p>
                Направление ветра: {data.winddirection_10m_dominant}
                {"\u00B0"}
              </p>
              <hr></hr>
              <p>Солнечная радиация: {data.shortwave_radiation_sum} MJ/m²</p>
            </div>
            <div className="col-md-3 text-end">
              <h6>{JSON.stringify(address)}</h6>
              <p>{data.time}</p>
              <p>{weatherName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
