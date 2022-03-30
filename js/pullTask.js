const amqp = require('amqplib/callback_api');
const checkRedirects = require("../js/checkRedirects");
function pullFromQueue() {
    try {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'logs';
                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });
                var queue = 'rpc_queue';
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.bindQueue(queue, exchange, '');
                channel.prefetch(1);
                channel.consume(queue, async function reply(msg) {
                    channel.ack(msg);
                    try {
                        var r = await checkRedirects.checkRedirects(msg.content.toString());
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.responseURL.toString()), {
                            headers: {"msgFrom": "check-redirect"},
                            correlationId: msg.properties.correlationId
                        });
                    }
                    catch (e) {
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(e.responseURL.toString()), {
                            headers: {"msgFrom": "check-redirect"},
                            correlationId: msg.properties.correlationId
                        });
                    }
                });
            });
        });
    }
    catch(e){
        console.log(e);

    }
}

pullFromQueue();