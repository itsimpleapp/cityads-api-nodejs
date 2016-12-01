# Cityads API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/cityads-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/cityads-api.svg)](https://badge.fury.io/js/cityads-api)

API integration with Cityads

## Install

```bash
$ npm install cityads-api
```

## Get Api Key

* Create account - https://cityads.com/main/en/start/webmasters/
* Client_id, Secret_key, Remote_auth - https://developers.cityads.com/api/dev/auth?lang=en

## Usage

```js
"use strict";

let Cityads = require("cityads-api"),
    cityads = new Cityads("Client_id", "Secret_key", "Remote_Auth");
        
cityads.report("statistics-rate", "event_time_day", "2016-10-01", "2016-11-18", function(err, result){
    console.log(result.data);
});
    
cityads.deeplink("https://www.amomuito.com/", 8065, (err, url) => {
    console.log(url);//http://cityadspix.com/click-DQFB8U6A-PNLJQTEF?url=https%3A%2F%2Fwww.amomuito.com%2F
});
```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.