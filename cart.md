# View cart

Phần route.js sẽ thêm

```
"/cart": {
    get: {
        handler: comp.view_cart
    }
},
```

Controller cho _view_cart_

```
controller.view_cart = function (req, res) {
        let products_ids = [];
        if (req.session.cart) {
            //products_ids = req.session.cart;
            for(let key in req.session.cart){
                products_ids.push(key);
            }
            // Find post by id
            application.models.product.findAll({
                where: {
                    id: {
                        in: products_ids
                    }
                }
            }).then(function (results) {
                res.frontend.render('cart', {
                    cart_detail: results,
                    sesscart: req.session.cart
                });
            }).catch(function (err) {
                res.frontend.render('cart');
            })
        } else {
            res.frontend.render('cart');
        }
    };
```

Tạo file _cart.twig_ để hiển thị trang cart