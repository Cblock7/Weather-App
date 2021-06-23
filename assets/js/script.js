var searchBtn = $(".searchBtn");

var apiKey = "793f49d7a21e05410771db1b1c242748";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-weather").addClass("list-weather-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

searchBtn.click(function () {

    var searchInput = $(".searchInput").val();

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
  
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
        
            var cityName = $(".list-weather").addClass("list-weather-item");
            cityName.append("<li>" + response.name + "</li>");
       
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            var weatherCard = $(".weatherCard").append("<div>").addClass("card-body");
            weatherCard.empty();
            var currentLocation = weatherCard.append("<p>");
          
            weatherCard.append(currentLocation);

       
            var timeUTC = new Date(response.dt * 1000);
            currentLocation.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentLocation.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
       
            var currentTemp = currentLocation.append("<p>");
          
            currentLocation.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");

            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {
                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
            });

        });
 
        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayDisp = $(".fiveDayDisp").addClass("card-body");
            var fiveDaySect = $(".fiveDayOne").addClass("card-text");
            fiveDaySect.empty();
           
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDaySect.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
            })
        });
    }
});