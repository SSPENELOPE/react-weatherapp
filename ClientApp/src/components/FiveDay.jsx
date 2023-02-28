import React from "react";

function FiveDay(props) {
    const forecast = props.data.daily.slice(0, 5);
    console.log(forecast)

    return (
        <div className="fiveDayWrapper">
            <h1 className="display-5 font text-end"><u>Your 5 day forcast</u></h1>
            <div className="row neon-row justify-content-around m-1 p-5">
                {forecast.map((item, index) => (
                    <div key={index} className="card bg-transparent neon-card m-5" style={{ width: "13rem" }}>
                        <ul className="list-group bg-dark list-group-flush test bg-transparent">
                            <li className="list-group-item item-1 bg-transparent neon">
                                {new Date(item.dt * 1000).toDateString()}
                            </li>
                            <li className="list-group-item item-2 bg-transparent neon">
                                {item.weather[0].description}
                                <img src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} />
                            </li>
                            <li className="list-group-item item-3 bg-transparent neon">
                                Temp High: {Math.round(item.temp.max)}<span>&#8457;</span>
                            </li>
                            <li className="list-group-item item-4 bg-transparent neon">
                                Sunrise {new Date(item.sunrise * 1000).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </li>
                            <li className="list-group-item item-5 bg-transparent neon">
                                Sunset {new Date(item.sunset * 1000).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                })}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FiveDay;