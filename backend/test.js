const express = require('express');
const GeotabApi = require('mg-api-js');
// const authenticate = require('./authenticate')
require('dotenv').config()
const app = express();

const authentication = {
    credentials: {
        database: process.env.CRED_DATA_DATABASE,
        userName: process.env.CRED_DATA_USERNAME,
        password: process.env.CRED_DATA_password
    },
    path: process.env.CRED_DATA_SERVER
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
app.get('/test2/:vin', async (req,res)=>{
    const VIN = req.params.vin;
    try{
        const device = await api.call("Get", {
            "typeName": "Device",
            "resultsLimit": 1, 
            "search": {
                "vehicleIdentificationNumber": VIN  
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
                // "vehicleIdentificationNumber": "3HSDZAPR0PN464738"  
            "id": "b1DB88"
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

//b1952D
//Note: Log record gets the datetime for the vehicle by the id.
app.get('/test4', async (req, res) => {
    try {
        // const deviceId = "bD25D"; 
        const request = {
            "typeName": "LookupDevice",
            "resultsLimit": 1, 
            "search": {
                // "id": deviceId 
                //b19B11 ass 3HSDZTZR2PN105383
                //b21497 : associated with 7GZ37TC71MN007764
                //b1DB88 : associated with 3HAEUMML6RL770737
                 "deviceSearch" : {
                    // "id": "b19B11"
                    "serialNumber": "G9URRM7063DX" 
                } 

            }
        };
        const device = await api.call("Get", request);
        res.json(device);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});



// 3AKJHLDVXPSNS9899
app.get('/device', async (req, res) => {
    try {
        let fromVersion = null;
        api.call("Get", {
            "typeName": "LogRecord",
            "resultsLimit": 1,
            // "fromVersion": fromVersion,
            "search": {
                "vehicleIdentificationNumber": "3AKJGED60FDGL6005"  
                // "deviceSearch" : {
                //     "id": "b1DB88"
                // }
            }
        }, result => {
            fromVersion = result.toVersion;
            res.json(result.data);
        }, error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Server Error' });
        });
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

