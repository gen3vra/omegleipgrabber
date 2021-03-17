// ==UserScript==
// @name         Omegle IP
// @namespace    https://kaaaxcreators.de
// @version      0.1
// @description  lool
// @author       Gen
// @include      https://omegle.com/*
// @include      https://www.omegle.com/*
// @grant        none
// ==/UserScript==

(function () {
    //No refer for ip so it'll work
    var meta = document.createElement('meta');
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.getElementsByTagName('head')[0].appendChild(meta);
    //

    console.log("--------------------------------------------------");
    console.log("Loaded Gen's Omegle IP grabber. Please don't use for evil.");
    console.log("--------------------------------------------------");
    window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection
    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args)
        pc.oaddIceCandidate = pc.addIceCandidate
        pc.addIceCandidate = function (iceCandidate, ...rest) {
            const fields = iceCandidate.candidate.split(' ')
            if (fields[7] === 'srflx') {
                console.log('IP Address:', fields[4]);
                console.log("https://whatismyipaddress.com/ip/" + fields[4]);
                var list = document.getElementsByClassName("logitem")[0]; // finds the first log text
                var text = document.createElement('p');
                text.innerHTML = "IP of connected: <a target='_blank' href='https://whatismyipaddress.com/ip/" + fields[4] + "'>" + fields[4] + "</a>";
                list.appendChild(text);
                var city = "Unknown";
                var continent = "Unkown";
                var country = "Unknown";
                var region = "Unknown";
                getJSON('https://extreme-ip-lookup.com/json/' + fields[4],
                    function (err, data) {
                        if (err !== null) {
                            //alert('Something went wrong: ' + err);
                        } else {
                            //alert('Your query count: ' + data.query.count);
                            console.log(data);
                            city = data["city"];
                            continent = data["continent"];
                            country = data["country"];
                            region = data["region"];
                            console.log(city);
                            console.log(continent);
                            console.log(country);
                            console.log(region);

                            var details = document.createElement('p');
                            details.innerHTML = "<br/><br/><strong>Basic Details Grabbed</strong><br/><p>Continent: " + continent + "<br/>Country: " + country + "<br/>City: " + city + "<br/>Region: " + region + "</p>";
                            list.appendChild(details);
                        }
                    });

            }
            return pc.oaddIceCandidate(iceCandidate, ...rest)
        }
        return pc
    }
})();



var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

