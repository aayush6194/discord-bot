const fetch = require('node-fetch');
const getAddress = async (addr) => {
    addr = (addr || '').toLowerCase().trim();
    const defaultLocation =  { address: 'Monroe, LA', latitude:  32, longitude: -92}
    if(!addr) return defaultLocation;
    const KEY = `AIzaSyAeJmDi-yAmMJ2N9n7zHDjl8nUcXzDunPM`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${KEY}`;
    if (addr && addr.length > 0)
       return await fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "OK" && res.results && res.results.length > 0) {
                    const result = res.results[0].formatted_address;
                    return {
                        address: result,
                        latitude: res.results[0].geometry.location.lat,
                        longitude: res.results[0].geometry.location.lng,
                    }
                
                } else throw new Error();
            })
            .catch((e) => {       
              return defaultLocation
            });
    else return defaultLocation;
};

module.exports = getAddress
