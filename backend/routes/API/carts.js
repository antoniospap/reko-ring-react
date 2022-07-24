const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart');

//Getting all
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find().sort({"dealingDate": 1});
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 = error on server/database
  }
});

//Creating one
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save(); //save in database
    res.status(201).json(newCart); // automaticlly sends 200 which means successfull but 201 means you created something successfull
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 = users input misstake
  }
});

//Getting one
router.get('/:id', getCart, (req, res) => {
  res.send(res.cart);
});

router.get('/articleID/:id', async (req, res) => {
  let cart;
  try {
    cart = await Cart.find({ articleID: req.params.id }).sort({"orderStatus": -1});
    if (cart == null) return res.status(404).json({ message: 'Cannot find Cart.' }); // 404 = could not find something, Article
    res.json(cart);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
    let updateCart
  try {
    updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body ,{new: true}); //new:true to get updatedValue and not oldVal.
    if (updateCart == null) return res.status(404).json({ message: 'Cannot find Cart.' });
    res.status(201).json(updateCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id',getCart, async (req,res) => {
  try {
      await Cart.findByIdAndDelete(req.params.id);
      res.json({message: "Article deleted!"})
  } catch (err) {
      res.status(500).json({message: err.message})
  }
})

/*
router.get('/userID',async (req,res) => {
    let cart
    try {
        cart = await Cart.find({userID:req.params.userID})
        if (cart == null) return res.status(404).json({message: 'Cannot find Cart.'}) // 404 = could not find something, Article
        res.json(cart)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})



*/

async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.find({ userID: req.params.id });
    if (cart == null) return res.status(404).json({ message: 'Cannot find Article.' }); // 404 = could not find something, Article
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cart = cart;
  next();
}

module.exports = router; //fix errors
