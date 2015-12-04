'use strict';

require('habitat').load();

var async = require('async');
var hatchet = require('hatchet');
var Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var charges = require('./charges');

async.eachSeries(charges, (id, done) => {
  Stripe.charges.retrieve(id, {
    expand: ['customer']
  }).then((charge) => {
    if (!charge.invoice || !charge.paid || charge.refunded) {
      return done();
    }

    charge.customer_object = charge.customer;

    hatchet.send('stripe_charge_succeeded', charge, function(err, data) {
      if (err) {
        console.error(`failed to queue data for charge ${charge.id}`, err);
        done(err);
        return;
      }

      console.info(`queued charge ${charge.id} - message id: ${data.MessageId}`);
    });
  }).catch((charge_error) => {
    throw charge_error;
  });
});
