const express = require('express');
const GeotabApi = require('mg-api-js');
// const authenticate = require('./authenticate')
const app = express();

const authentication = {
    credentials: {
        database: '',
        userName: '',
        password: ''
    },
    path: ''
};


const api = new GeotabApi(authentication)
api.authenticate( success => {
    console.log('Successful authentication');
}, (message, error) => {
    console.log('Something went wrong',error);
});

app.get('/',((req,res)=>{
    res.redirect('/test');
}))

app.get('/test', async (req, res) => {
    try {
        const devices = await api.call('Get', { typeName: 'Device', resultsLimit: 100});
        res.json(devices);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

// latitude	38.7128334
// longitude	-121.303268
// speed	74
// dateTime	"2018-02-14T01:06:55.000Z"
// device	
// id	"b4105"
// id	"bDA88171C"
// Test Devices
// Vin: 3HAEUMML5ML812730
//Serial Number: G9DE210C699E 
// 3HSDZAPR0PN464738
app.get('/test2', async (req,res)=>{
    try{
        const device = await api.call("Get", {
            "typeName": "Device",
            "resultsLimit": 1, 
            "search": {
                "vehicleIdentificationNumber": "3HSDZAPR0PN464738"  
            },
            // "propertySelector": {
            //     "fields": ["id", "name"]  
            // }
        });;
        res.json(device)
    }catch{
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

app.get('/test3', async (req,res)=>{
    try{
        const device = await api.call("Get", {
            "typeName": "Device",
            "resultsLimit": 1, 
            "search": {
                "vehicleIdentificationNumber": "3HSDZAPR0PN464738"  
            },
            // "propertySelector": {
            //     "fields": ["id", "name"]  
            // }
        });;
        res.json(device)
    }catch{
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})
app.get('/test3', async (req, res) => {
    try {
        const deviceId = "bD25D"; // Replace with the ID of the device you're querying
        const request = {
            "typeName": "RequestLocation",
            "resultsLimit": 1, 
            "search": {
                "id": deviceId  
            }
        };
        const device = await api.call("Get", request);
        res.json(device);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});



//3AKJHLDVXPSNS9899
// app.get('/device', async (req, res) => {
//     try {
//         let fromVersion = null;
//         api.call("GetFeed", {
//             "typeName": "StatusData",
//             "resultsLimit": 1,
//             "fromVersion": fromVersion,
//             "search": {
//                 "vehicleIdentificationNumber": "3HAEUMML5ML812730"  
//             }
//         }, result => {
//             fromVersion = result.toVersion;
//             res.json(result.data);
//         }, error => {
//             console.error('Error:', error);
//             res.status(500).json({ error: 'Server Error' });
//         });
//     } catch (error) {
//         console.error('Err', error);
//         res.status(500).json({ error: 'Server Err' });
//     }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

