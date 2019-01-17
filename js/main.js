var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/d0QuPvuNnvI:APA91bH0af2BEL9NAElxW7qzMgezOR2BFz8E7vlnka5g0BMYZlX2OkJEiutDAjKtEN_DJVkSKFOQusJXmCDKxEdL8URd1ppd_UUTcBWDc1uFuKax_s8kJsymgQUSG9tliBMgijv45v1o",
    "keys": {
        "p256dh": "BFu3YvO0UNiUfejL15SgfPUrlQi2riztN8CNhFB7Z4i3ZOOxzLE+7dUioiWEMt8JrTZ2Za/1i44KHPK/q9E5ah8=", 
        "auth": "yh1TBM4jnxnDy2T9CIP7PQ=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyClwQpZU6rn6sLFgU4MIVFI7___50VWsks',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);