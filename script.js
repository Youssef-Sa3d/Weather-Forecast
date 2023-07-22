const apikey = '01ed8cfd60bed82dbf1760a68fe39db4';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';

async function waether_latlon(lat, lon) {
    const resp = await fetch(apiurl + 'lat=' + lat + '&lon=' + lon + '&appid=' + apikey);
    var data = await resp.json();

    console.log(data);

    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("city").innerHTML = data.sys.country + ", " + data.name;
    document.getElementById("mycity-card").innerHTML = data.name;
    document.getElementById("feels").innerHTML = "Feels like " + data.main.feels_like;
    document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity;
    document.getElementById("min-max").innerHTML = "Temp:  " + data.main.temp_max + "° " + " / " + data.main.temp_min + "°";
    document.getElementById("weather").innerHTML = "Weather: " + data.weather[0].description;
    document.getElementById("winddeg").innerHTML = "Wind deg: " + data.wind.deg + "°";
    document.getElementById("windspeed").innerHTML = "Wind speed: " + data.wind.speed + " km/h";
    document.getElementById("windgust").innerHTML = "Wind gust: " + data.wind.gust + " km/h";
    document.getElementById("pressure").innerHTML = "Pressure: " + data.main.pressure;
    document.getElementById("sea").innerHTML = "Sea level: " + data.main.sea_level;
    document.getElementById("grnd").innerHTML = "Ground level: " + data.main.grnd_level;
    
    
    
}





async function waether(t) {
    const resp = await fetch(apiurl + 'q=' + t + '&appid=' + apikey);
    var data = await resp.json();
    
    console.log(data);
    
    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("city").innerHTML = data.sys.country + ", " + data.name;
    document.getElementById("feels").innerHTML = "Feels like " + data.main.feels_like;
    document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity;
    document.getElementById("min-max").innerHTML = "Temp:  " + data.main.temp_max + "° " + " / " + data.main.temp_min + "°";
    document.getElementById("weather").innerHTML = "Weather: " + data.weather[0].description;
    document.getElementById("winddeg").innerHTML = "Wind deg: " + data.wind.deg + "°";
    document.getElementById("windspeed").innerHTML = "Wind speed: " + data.wind.speed + " km/h";
    document.getElementById("windgust").innerHTML = "Wind gust: " + data.wind.gust + " km/h";
    document.getElementById("pressure").innerHTML = "Pressure: " + data.main.pressure;
    document.getElementById("sea").innerHTML = "Sea level: " + data.main.sea_level;
    document.getElementById("grnd").innerHTML = "Ground level: " + data.main.grnd_level;

}



// --------------------------------------------------------------------------------------------------------------------------


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const mylat = position.coords.latitude;
            const mylng = position.coords.longitude;

            console.log(`Latitude: ${mylat}, longitude: ${mylng}`);
            waether_latlon(mylat, mylng);

        },
        (error) => {
            console.error("Bn3rfo amakn regala bs sorry:", error);
        }
    );
} else {
    console.error("Bn3rfo amakn regala bs sorry");
}



// --------------------------------------------------------------------------------------------------------------------------


function citysrch() {
    var element = document.getElementById("txtsrch");
    var city = element.value;
    waether(city);
    // document.getElementById("cityname").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    // document.getElementById("landing_txt2").innerHTML = "";
    element.value = '';
}

function citysrch2() { 
    var element2 = document.getElementById("txtsrch2");
    var city2 = element2.value;
    waether(city2);
    element2.value = '';
}

// --------------------------------------------------------------------------------------------------------------------------


let date = new Date().toLocaleDateString();
document.getElementById("D").innerHTML = date;



let test = false;
function add() {
    if (test === false) {

        document.querySelector(".add-box").style.visibility = "visible";
        test = true
    }
    else if (test === true) {

        document.querySelector(".add-box").style.visibility = "hidden";
        test = false
    }

}


// --------------------------------------------------------------------------------------------------------------------------

function add_cont() {
    var element = document.getElementById("txtadd");
    var city = element.value;
    var list = document.querySelector(".cities");
    if (city === '' || city === ' ') {
        element.placeholder = "Sorry!";
        return;
    } else {
        var newdiv = document.createElement("li");
        list.appendChild(newdiv);
        newdiv.className = "city";
        
        var newbtn = document.createElement("button");
        newbtn.setAttribute('type', 'button');
        newdiv.appendChild(newbtn);
        newbtn.className = 'cbtn';
        newbtn.addEventListener("click", favcity);
        
        var newtxt = document.createElement("p");
        var txt = document.createTextNode(city.charAt(0).toUpperCase() + city.slice(1));
        newtxt.appendChild(txt);
        newdiv.appendChild(newtxt);
        newtxt.className = 'cp';
        element.value = '';
        document.querySelector(".add-box").style.visibility = "hidden";

        var newx = document.createElement("button");
        var del = document.createTextNode("x");
        newx.appendChild(del);
        newx.setAttribute('type', 'button');
        newdiv.appendChild(newx);
        newx.className = 'delete';
        newx.addEventListener("click", dele);

    }
    savedata();
}


function favcity() {
    var element = this.parentNode;
    var city = element.childNodes[1].innerHTML;
    waether(city);
    document.getElementById("cityname").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById("landing_txt2").innerHTML = "";
    savedata();
}

function maincity() {
    var city = document.getElementById("mycity-card").innerHTML;
    waether(city);
    document.getElementById("cityname").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById("landing_txt2").innerHTML = "";
}

function dele() {
    var ele = this.parentNode;
    ele.remove();
    savedata();
}


// function savedata() {
//     var list = document.querySelector(".cities");
//     localStorage.setItem("city", list.innerHTML);
// }

// function getdata() {
//     var list = document.querySelector(".cities");
//     list.innerHTML = localStorage.getItem("city");
// }
// getdata();