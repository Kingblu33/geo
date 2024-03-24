const express = require('express');
const GeotabApi = require('mg-api-js');
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
    // const apiKey = api._helper.credentialStore.credentials_key;
    // const sessionId = api._helper.credentialStore.server_key;
    console.log(api)
}, (message, error) => {
    console.log('Something went wrong',error);
    console.log(message)
});

app.get('/',((req,res)=>{
    res.redirect('/test');
}))

app.get('/getdevices', async (req, res) => {
    try {
        const devices = await api.call('Get', 
        { 
            typeName: 'Device',
            resultsLimit: 100
        }
    );
        res.json(devices);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

app.get('/test2/:device', async (req, res) => {
    const device = req.params.device;
    try {
        const result = await api.call("Get", {
            "typeName": "LogRecord",
            "resultsLimit": 1, 
            "deviceSearch": {
                "serialNumber": device
            }
        });
        res.json(result);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

app.get('/test3', async (req,res)=>{
    
    const apiKey = api._helper.credentialStore.credentials_key;
    const sessionId = api._helper.credentialStore.userId;
    try{
        const device = await api.call("LookupDevice", {
            "apiKey":apiKey,
            "sessionId": sessionId,
            "resultsLimit": 1, 
            "serialNo": "G9902108E954",
            
        });
        res.json(device)
    }catch(error){
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

// b1952D
// Note: Log record gets the datetime for the vehicle by the id.
app.get('/test4/:serialNo', async (req, res) => {
    const serialNumber = req.params.serialNo
    try {
        // const deviceId = "bD25D"; 
        
        const device = await api.call("Get", 
        {
            "typeName": "DeviceStatusInfo",
            "resultsLimit": 1, 
            "search": {
                "deviceSearch" : {
                    "serialNumber": serialNumber
                } 
            }
    });
        res.json(device);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

