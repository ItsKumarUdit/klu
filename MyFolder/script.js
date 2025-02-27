function getWeather() {
    const location = document.getElementById("location").value;
    if (!location) {
        alert("Please enter a location");
        return;
    }

    document.getElementById("loading").style.display = "block";

    fetch(`http://api.weatherapi.com/v1/current.json?key=1bb518df6395448593b170805252602&q=${location}&aqi=yes`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loading").style.display = "none";

            if (data.error) {
                document.getElementById("weather-result").innerHTML = "Location not found!";
            } else {
                document.getElementById("city-name").innerText = `${data.location.name}, ${data.location.country}`;
                
                const currentDate = new Date();
                document.getElementById("date-time").innerText = `Date & Time: ${currentDate.toLocaleString()}`;

                document.getElementById("temperature").innerText = `Temperature: ${data.current.temp_c}°C`;
                document.getElementById("weather-condition").innerText = `Condition: ${data.current.condition.text}`;
                document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;
                document.getElementById("wind-speed").innerText = `Wind Speed: ${data.current.wind_kph} km/h`;

                const iconUrl = `https:${data.current.condition.icon}`;
                document.getElementById("weather-icon").src = iconUrl;
                document.getElementById("weather-icon").style.display = "block";
            }
        })
        .catch(error => {
            document.getElementById("loading").style.display = "none";
            console.error("Error fetching weather data:", error);
        });
}
