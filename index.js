const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const fixtures = require('./fixtures').makeFixture;

const __DATABASE__ = fixtures(30, 40, 10);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    return res.status(200).json(__DATABASE__);
});

app.get('/trajets', (req, res, next) => {
    const queries = req.query;
    let error = null;
    if (Object.entries(queries).length === 0) {
        return res.status(200).json(__DATABASE__.trajets);
    } else {
        const selected = __DATABASE__.trajets.filter(el => {
            let condition = true;
            for (let attr in queries) {
                if (!el.hasOwnProperty(attr)) {
                    error = 'The request query is not correctly formed ...';
                    condition = false;
                } else {
                    if (el[attr] != queries[attr]) {
                        condition = false;
                    }
                }
            }
            return condition;
        });
        if (error) {
            return res.status(400).json({ error });
        } else {
            return res.status(200).json(selected);
        }
    }
});

app.get('/trajets/:id', (req, res, next) => {
    let data = __DATABASE__.trajets.find(el => el.id == req.params.id);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ error: 'Resource not found !' });
    }
});

const server = http.createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server started on ' + PORT + ' ...');
});
