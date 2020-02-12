var User = require("../models/user");
var Product = require("../models/product");
var Order = require("../models/order");
var jwt = require("jsonwebtoken");
var config = require("../config/config");

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    config.jwtSecret,
    {
      expiresIn: 86400 // 86400 expires in 24 hours
    }
  );
}

exports.registerUser = (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res
      .status(400)
      .json({ msg: "You need to send Username and password" });
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(400).json({ msg: "The email already exists" });
    }
    if (err) {
      return res.status(400).json({ msg: err });
    }
    User.findOne({ username: req.body.username }, (err, user) => {
      if (user) {
        return res.status(400).json({ msg: "The username already exists" });
      }
      if (err) {
        return res.status(400).json({ msg: err });
      }

      let newUser = User(req.body);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({ msg: err });
        }
        return res.status(201).json(user);
      });
    });
  });
};

exports.loginUser = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ msg: "You need to give  username and password" });
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: "The username does not exist" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        return res.status(200).json({
          token: createToken(user)
        });
      } else {
        return res
          .status(400)
          .json({ msg: " username and password don't match." });
      }
    });
  });
};


exports.DeleteUser = (req, res) => {
  console.log(req.params.mid);
  Group.deleteOne({ username: { $eq: req.params.mid } }, (err, user) => {
    if (user) {
      return res.status(201).json(users);
    }
  });
};


exports.createProduct = (req, res) => {
  if (!req.body.productimg || !req.body.price|| !req.body.productname ||  !req.body.owner || !req.body.description) {
    return res.status(400).json({ msg: "Product Details  need to be specified" });
  }

    let newProduct = Product(req.body);
    newProduct.save((err, product) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(product);
    });
 
};
exports.GetProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (products) {
      return res.status(201).json(products);
    }
  });
};
exports.GetProduct = (req, res) => {
  if (req.params.pid) {
    pid = req.params.pid;
    query = { _id: { $eq: pid } };
    Product.find(query, (err, product) => {
      if (product) {
        console.log(product);
        return res.status(201).json(product);
      }
    });
  } else {
    return res.status(400).json({ msg: " invalid query attempted" });
  }
};

exports.DeleteProduct = (req, res) => {
  Product.deleteOne({ _id: { $eq: req.params.pid } }, (err, product) => {
    if (product) {
      return res.status(201).json({product,'error' : false});
    }
    return res.status(400).json({'error' : true });
  });
};


exports.createOrder = (req, res) => {
  console.log(req.body);

    let newOrder = Order(req.body);
    newOrder.save((err, order) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(order);
    });
 
};
exports.GetOrders = (req, res) => {
  Order.find({}, (err, orders) => {
    if (orders) {
      return res.status(201).json(orders);
    }
  });
};
exports.GetOrder = (req, res) => {
  if (req.params.oid) {
    oid = req.params.oid;
    query = { _id: { $eq: oid } };
    console.log(query);
    Order.find(query, (err, order) => {
      if (order) {
        console.log(order);
        return res.status(201).json(order);
      }
    });
  } else {
    return res.status(400).json({ msg: " invalid query attempted" });
  }
};

exports.MyOrders = (req, res) => {
  if (req.params.mid) {
    mid = req.params.mid;
    query = { customer: { $eq: mid } };
    Order.find(query, (err, order) => {
      if (order) {
        console.log(order);
        return res.status(201).json(order);
      }
    });
  } else {
    return res.status(400).json({ msg: " invalid query attempted" });
  }
};


exports.DeleteOrder = (req, res) => {
  Order.deleteOne({ _id: { $eq: req.params.pid } }, (err, order) => {
    if (order) {
      return res.status(201).json({order,'error' : false});
    }
    return res.status(400).json({'error' : true });
  });
};
