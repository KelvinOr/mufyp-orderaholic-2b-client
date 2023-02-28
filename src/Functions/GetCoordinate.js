// Description: Get coordinate from google map

import { OpenStreetMapProvider } from 'leaflet-geosearch';

// export default async function GetCoordinate(location){
//     var wz = `https://www.google.com/maps/place/${location.toString().replace(" ", "+")}`;
//     var returnval;
//     var strHtml = "";
    
//     //get wz in https funciton 
//     // https({
//     //     host: 'www.google.com',
//     //     path: '/maps/place/' + location,
//     //     method: 'GET',
//     //     headers: {
//     //         'Content-Type': 'text/html',
//     //     }
//     // }, function(res){
//     //     res.on('data', function(data){
//     //         strHtml += data;
//     //     });
//     //     res.on('end', function(){
//     //         var initial_pos = strHtml.indexOf(";window.APP_INITIALIZATION_STATE");
//     //         var result = strHtml.slice(initial_pos+35, initial_pos+80);
//     //         returnval =  STR_to_NUM(result);

//     //     });
//     // });

//     //Allow-Control-Allow-Origin
//     // fetch(wz, {
//     //     method: 'GET',
//     //     headers: {
//     //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.62',
//     //         'Content-Type': 'text/html',
//     //     },
//     //     mode: 'no-cors',
//     // })
//     // .then(response => console.log(response))
//     // .then(data => {
//     //     var initial_pos = data.indexOf(";window.APP_INITIALIZATION_STATE");
//     //     var result = data.slice(initial_pos+35, initial_pos+80);
//     //     returnval =  STR_to_NUM(result);
//     // }).catch(err => {
//     //     console.log(err);
//     // });

//     return returnval;

// }

// // export default async function GetCoordinate(location){
// //     console.log("location: " + location);
// //     var wz = "https://www.google.com/maps/place/" + location.toString().replace(" ", "+");
// //     var strHtml = "";
// //     var returnval;

// //     //get wz in https funciton 
// //     return new Promise((resolve, reject) => {
// //         // https.get(wz, function(res){
// //         //     res.on('data', function(data){
// //         //         strHtml += data;
// //         //     });
// //         //     res.on('end', function(){
// //         //         var initial_pos = strHtml.indexOf(";window.APP_INITIALIZATION_STATE");
// //         //         var result = strHtml.slice(initial_pos+35, initial_pos+80);
// //         //         returnval =  STR_to_NUM(result);
// //         //         resolve(returnval); //return value when data is received
// //         //     });
// //         // }).on('error', function(err) {
// //         //     reject(err); //handle error
// //         // });
// //         fetch(wz, {
// //             method: 'GET',
// //             headers: {
// //                 'Content-Type': 'text/html',
// //             },
// //             mode: 'no-cors',
// //         })
// //         .then(response => response.text())
// //         .then(data => {
// //             console.log("data: " + data);
// //             var initial_pos = data.indexOf(";window.APP_INITIALIZATION_STATE");
// //             var result = data.slice(initial_pos+35, initial_pos+80);
// //             returnval =  STR_to_NUM(result);
// //             console.log("returnval: " + returnval);
// //             resolve(returnval); //return value when data is received
// //         }).catch(err => {
// //             reject(err); //handle error
// //         });
// //     });
// // }

export default async function GetCoordinate(location){
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: location });
    return {
        lng: results[0].x,
        lat: results[0].y
    };
}


function STR_to_NUM(data){
    var line = []
    for (var i = 0; i < data.length; i++){
        if (data[i] == ','){
            line.push(data.slice(0,i));
            data = data.slice(i+1);
            i = 0;
        }
    }
    var num1 = Number.parseFloat(line[1]);
    var num2 = Number.parseFloat(line[2]);
    return {
        lng: num1,
        lat: num2
    }
}

