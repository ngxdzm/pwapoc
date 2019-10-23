// server.js
const express = require('express');
const cors = require('cors')
const webPush = require('web-push');
const bodyParser = require('body-parser');
const app = express();
let userSubscription;

app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = 'BPGI3vdAMxuO6nlXQs6_8peiA-ZtWcqaxk2CqTTd6sTKyEsTQ6NjrlGs-Iahvt0BEcxk9ahiHvhrF73mwFxIlR4';
const privateVapidKey = 'NfeBHvyfbINJu0I4GNw9CHG6DcwvRU5Tb6de8L0v-rs';

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

app.post('/notifications', (req, res) => {
    userSubscription = req.body.notification;
    console.log(`Register`);
    console.log(JSON.stringify(userSubscription));

    res.status(201).json({}); 
});

app.post('/notify', (req, res) => {
    const message = req.body;
    console.log(`Subscription received`);
    console.log(JSON.stringify(message));

    res.status(201).json({});

    if (userSubscription) {
    console.log(`Send`);
        webPush.sendNotification(userSubscription, JSON.stringify(message))
            .catch(error => console.error(error));
    }
});

const server = app.listen(5000,'0.0.0.0', () => {
    console.log(`Express running → PORT ${server.address().port}`);
});