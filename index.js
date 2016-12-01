"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(clientid, secretkey, remoteauth){
    return {
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, cb) {   
            request(URL, (error, response, body) => { 
                if(body)
                    body = JSON.parse(body);
                
                cb(error, body); 
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
                
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @see https://developers.cityads.com/api/dev/webmaster/statistics?lang=en
         * @param string typereport 
         * statistics-offers - Retrieves stats data for offers, This method retrieves the list of offers with the data and efficiency for each of them. The list contains offers that showed conversions within the set period of time (from date_from to date_to).
         * statistics-segments - Retrieves stats data for offer types and business categories. This method retrieves the list of offer types, verticals, categories or sub-categories (depending on the param in the group_field).
         * statistics-actions - Retrieves stats for conversion types (leads and sales), or for payment methods (depending on the group_field param).
         * statistics-rate - Retrieves data for intensity of conversions for various time periods, seasons, day times, week days or weekends and business days (depending on group_field param).
         * statistics-tools - Retrieves data for the stats of the used tools – by type, category of creative, code formats, link types, banner size types or banner sizes (depending on group_field param).
         * statistics-entrypoints - Retrieves data for the stats of the used tools – by type, category of creative, code formats, link types, banner size types or banner sizes (depending on group_field param).
         * statistics-sources - Retrieves stats for traffic sources – by traffic type, referrers, sub-accounts or keywords (depending on group_field param).
         * statistics-geo - Retrieves stats by geographical location – language, country, region, time zones (depending on group_field param).
         * statistics-behaviour - Retrieves data for user behavior – new and returning users.
         * statistics-technologies - Retrieves stats for technology – browsers, browser versions, OS, OS versions, screen resolutions or colours (depending on group_field param).
         * statistics-devices - Retrieves stats for user devices – types or models (depending on group_field param).
         * @param string groupfield The groupfield will depend on the type of report you want
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        report: function(typereport, groupfield, datestart, dateend, cb){
            this.getinapi("http://api.cityads.com/api/rest/webmaster/json/" + typereport + "/" + groupfield + "/" + datestart + "/" + dateend + "?remote_auth=" + remoteauth, cb);
        },
        
        /**
         * Create tracking links
         * 
         * @param string url
         * @param integer progid
         * @return void
         */
        deeplink: function(url, storeid, cb){
            var _this = this;
            
            request("http://api.cityads.com/api/rest/webmaster/json/offer-links/" + storeid + "?remote_auth=" + remoteauth, (error, response, body) => { 
                if(error){
                    cb(error, null);
                }
                else{                    
                    var contentsJSON = JSON.parse(body);
                            
                    if(contentsJSON.status == 200){
                        var p = false;
                        
                        for(var key2 in contentsJSON.data.items){
                            if(contentsJSON.data.items[key2].is_default){
                                p = true;
                                cb(false, contentsJSON.data.items[key2].deep_link+"?url="+_this.urlencode(url));
                                break;
                            }
                        }        
                        
                        if(!p)
                            cb({"msg": "Invalid link to this program."}, null);
                    }
                    else if(contentsJSON.status == 403){
                        cb({"msg": "No authorization in the program."}, null);
                    }
                    else{                        
                        cb({"msg": "Invalid link to this program."}, null);
                    }
                }
            });
        }
    }
}
