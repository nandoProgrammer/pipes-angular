const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const data = [
    {
        "payload": [
            { 
                "number": 225
            },
            { 
                "number": 718
            },
            { 
                "number": 800.000
            }
        ]
    }
]

app.use(cors());
app.use(bodyParser.json());

app.get('/list', (req, res) => {
    return res.status(200).json(data);
});

app.get('/search', (req, res) => {
    let search = req.query.search;
    
    if(search){
        let filterSearch = data[0].payload.filter(item => {
            return item.number == search
        });

        console.log(filterSearch)

        return res.status(200).json(filterSearch);
    }

    return res.status(200).json(data[0].payload);
})

app.listen('3000');