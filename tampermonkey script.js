

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
    console.log("--------------------------------------------------");
    console.log("Loaded IP grabber");
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
                text.innerText = "TEST TEXT " + fields[4];
                list.appendChild(text);
            }
            return pc.oaddIceCandidate(iceCandidate, ...rest)
        }
        return pc
    }
})();

