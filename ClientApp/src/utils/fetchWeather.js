
class FetchWeather {
    GetWeather() {
        const cityInput = document.getElementById("city");
        var city = cityInput.value.trim();

        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=ec2870611b1a5011e09492842b353545';

        fetch(weatherUrl, {
            cache: 'reload',
        })
            .then(function (response) {
                if (!response.ok) {
                    alert("Error: " + response.statusText);
                } else {
                    return response.json().then(function (latLon) {
                    
                            var lat = latLon.coord.lat
                            var lon = latLon.coord.lon
                            // Get the weather using onecall
                            var newWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&lang=en&appid=ec2870611b1a5011e09492842b353545';
                    
                            fetch(newWeatherUrl, {
                                method: 'get',
                                credentials: 'same-origin',
                                redirect: 'follow',
                                cache: 'reload',
                            })
                                .then(function (response) {
                                    if (!response.ok) {
                                        alert("OHSHIT: " + response.statusText);
                                    } else {
                                       return response.json().then(function (data) {
                                            console.log(data);
                                            return data;
                                            
                                        } );
                                    }
                                })
                                .catch(function (error) {
                                    alert(error)
                                })
                        
                    });
                }
            })
            .catch(function (error) {
                alert(error)
            })
    }


}

export default new FetchWeather();
