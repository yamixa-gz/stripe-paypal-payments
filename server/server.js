require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_PRIVAT_KEY);

const products = [
  {
    id: 1,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894__480.jpg',
    cardTitle: 'Ice cream',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 1000,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 2,
    imgUrl:
      'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153__480.jpg',
    cardTitle: 'Vegetables basket',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 2000,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 3,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174__480.jpg',
    cardTitle: 'Cookies walnuts',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 1500,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 4,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827__480.jpg',
    cardTitle: 'Macaroons',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 1200,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 5,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056__480.jpg',
    cardTitle: 'Oranges',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 1100,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 6,
    imgUrl:
      'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
    cardTitle: 'Salmon',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 1800,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 7,
    imgUrl:
      'https://cdn.pixabay.com/photo/2017/08/30/17/12/waffle-hearts-2697904__480.jpg',
    cardTitle: 'Waffle',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 5000,
      currency: 'USD',
      symbol: '$',
    },
  },
  {
    id: 8,
    imgUrl:
      'https://cdn.pixabay.com/photo/2016/10/07/13/36/tangerines-1721590__480.jpg',
    cardTitle: 'Tangerines',
    cardDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    price: {
      priceInCents: 2000,
      currency: 'USD',
      symbol: '$',
    },
  },
];

const productsObj = products.reduce((acc, product) => {
  return {
    ...acc,
    [product.id]: product,
  };
}, {});

app.get('/products', async (req, res) => {
  await new Promise(resolve => setTimeout(() => resolve(), 1000));

  try {
    if (!products) {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.json({ data: products });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.post('/create-stripe-session', async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body)) {
      res.status(400).json({ error: 'Bad request' });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.map(({ id, quantity = 1 }) => {
        const itemToBuy = productsObj[id];

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: itemToBuy.cardTitle,
            },
            unit_amount: itemToBuy.price.priceInCents,
          },
          quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5500);
