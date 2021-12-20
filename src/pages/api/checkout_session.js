const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map(item => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: 'cad',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image]
      },
    }
  }))

  if (req.method === 'POST'){
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ['shr_1K8o6nCpD2qEtcNVGptZWVDc'],
        shipping_address_collection: {
           allowed_countries: ['US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          email,
          images: JSON.stringify(items.map(item => item.image))
        }
      });

      res.status(200).json({id: session.id})
    } catch (err) {
      console.log(err)
    }
  }
}