import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { getStadioane } from "./Controlere/StadiumController";
import './Weather.css';

const api = {
    key: "d243bb24ed6dcb8392f78eb6a6690bee",
    base: "https://api.openweathermap.org/data/2.5/",
}

export function Weather() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});

    const searchPressed = () => {
        console.log(getStadioane());
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                console.log(result);
            });
    };

    const searchPressedForecast = () => {
        fetch(`${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                //console.log(result);
                let filteredResult = result.list.filter(
                    obj => obj.dt_txt.endsWith("21:00:00")
                )[0];
                filteredResult.name = result.city.name;
                setWeather(filteredResult);
                console.log(filteredResult);
            });
    };

    return (
        <div className="weather">
            <header>
            <Typography variant="h3">
                Weather API
            </Typography>

                <div>
                    <div className="inputOras">
                        <TextField placeholder="Enter city/town..." variant="outlined" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="butonInput">
                        <Button variant="outlined" onClick={searchPressed}>Search</Button>
                        </div>
                </div>

                <Typography variant="body1">
                    {weather?.name}
                </Typography>

                <div>
                    {typeof weather.main === 'undefined' 
                        ? null 
                        :   <Typography variant="body1">
                                {Math.round(weather?.main?.temp)}°C
                            </Typography>
                    }
                </div>

                <div>
                    <div>
                        {typeof weather.main === 'undefined' 
                            ? null 
                            :   <Typography variant="body1">
                                    {weather?.weather[0]?.main}
                                </Typography>
                        }
                    </div>
                    <div>
                        {typeof weather.main === 'undefined' 
                            ? null 
                            :   <Typography variant="body1">
                                    {weather?.weather[0]?.description}
                                </Typography>
                        }
                    </div>
                </div>
            </header>
        </div>
    );
}