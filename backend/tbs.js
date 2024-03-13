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

// route to react front when done 
// app.use(express.static(path.join(__dirname, ''))); // 

app.get('/test', async (req, res) => {
    try {
        const devices = await api.call('Get', { typeName: 'Device', resultsLimit: 100});
        res.json(devices);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

app.get('/test2', async (req,res)=>{
    try{
        const device = await api.call("Get", {
            "typeName": "Device",
            "resultsLimit": 1, 
            "search": {
                "vehicleIdentificationNumber": "3HSDZAPR0PN464738"  
            },
        });
        res.json(device)
    }catch(error){
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
        });
        res.json(device)
    }catch(error){
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

app.get('/test4', async (req, res) => {
    try {
        const deviceId = "bD25D";
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


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
