/**
 * CityAds API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see Client_id, Secret_key, Remote_auth - https://developers.cityads.com/api/dev/auth?lang=en
 */

"use strict";

let Cityads = require("./index.js"),
    cityads = new Cityads("Client_id", "Secret_key", "Remote_Auth");
        
cityads.report("statistics-rate", "event_time_day", "2016-10-01", "2016-11-18", function(err, result){
    console.log(result.data);
});
    
cityads.deeplink("https://www.amomuito.com/", 8065, (err, url) => {
    console.log(url);//http://cityadspix.com/click-DQFB8U6A-PNLJQTEF?url=https%3A%2F%2Fwww.amomuito.com%2F
});

