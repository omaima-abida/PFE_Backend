
const stripe = require('stripe')('sk_test_51PJ44VRtSxlhOmShVxr80pR38peU3flhsilafRRTIMDh2FjSM8r3PSFYWmnZapKNvRlcDiSPIgwPkfepAXtZNKZt00gp1UT41O'); // Replace with your actual secret key
const router = require("express").Router()

router.post('/', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;

  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (err) {
    console.log(err);
    error = err;
    status = 'Failure';
  }
  
  res.json({ error, status });
});

module.exports = router;