var stripeKeys = {
  publishableKey: process.env.STRIPE_PUBLIC_KEY,
  // This is just a test key right now, nothing secret about it.
  secretKey: process.env.STRIPE_SECRET_KEY
};

var stripe = require('stripe')(stripeKeys.secretKey);

module.exports = {
  single: function(transaction, callback) {
    stripe.customers.create({
      email: transaction.email,
      metadata: transaction.metadata,
      source: transaction.stripeToken
    }, function(err, customer) {
      var charge = {};
      if (err) {
        return callback(err);
      }
      charge = {
        amount: transaction.amount,
        currency: transaction.currency,
        customer: customer.id,
        description: transaction.description,
        metadata: transaction.metadata
      };
      stripe.charges.create(charge, callback);
    });
  },
  recurring: function(transaction, callback) {
    stripe.customers.create({
      email: transaction.email,
      metadata: transaction.metadata,
      source: transaction.stripeToken
    }, function(err, customer) {
      var subscription = {};
      if (err) {
        return callback(err);
      }
      subscription = {
        plan: transaction.currency,
        quantity: transaction.quantity,
        metadata: transaction.metadata
      };
      stripe.customers.createSubscription(customer.id, subscription, callback);
    });
  }
};
