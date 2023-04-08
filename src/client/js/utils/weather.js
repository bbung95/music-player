// const weatherCode = {
//     Clouds: "구름",
//     Clear: "맑음",
//     Snow: "눈",
//     Rain: "비",
//     Drizzle: "이슬비",
//     Thunderstorm: "천둥번개",
// };

// const getLocationDate = async () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//             console.log(pos.coords.latitude);
//             console.log(pos.coords.longitude);

//             getWheatherData(pos.coords.latitude, pos.coords.longitude);
//         });
//     }
// };

// const getWheatherData = async (lat, lon) => {
//     const key = "84fe0b8aa8311333127ea2050db3704e";

//     const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${key}`);
//     const code = res.data.weather[0].main;

//     console.log(weatherCode[code]);
// };

// getLocationDate();
