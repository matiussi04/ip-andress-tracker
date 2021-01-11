const input = document.querySelector("#ip-andress");
const button = document.querySelector(".search button");
const map = L.map('mapid', {
    center: [0,0],
    zoom: 13
});

const showIpAndress = ip => document.querySelector("#ip .info").innerText = ip;

const showLocation = (country,city) => document.querySelector("#location .info").innerText = `${city}, ${country}`;

const showTimezone = timezone => document.querySelector("#timezone .info").innerText = `UTC ${timezone}`;

const showISP = isp => document.querySelector('#isp .info').innerText = isp;

function showInfos({ip,isp,location: {country, city,timezone}}){
    showIpAndress(ip);
    showLocation(country,city);
    showTimezone(timezone);
    showISP(isp);
}

function createMap({lat,lng}){
    const token = 'YOUR TOKEN';
    const icon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [26,30]
    });
    
    map.setView([lat,lng],13)
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: token
    }).addTo(map);
    L.marker([lat, lng], {icon}).addTo(map);
}

function search (){
    const key = "at_u7JpqeesZ7nZIefeWMOBVS0xGggZ5";
    const ip = input.value;
    const url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        showInfos(data);
        createMap(data.location);
    })
    .catch(erro => console.log(erro))

}

button.addEventListener("click",search);