'use strict';

const promise = require('arrowjs').Promise;

module.exports = function (controller, component, application) {

    let redis = application.redisClient;
    let adminPrefix = application.getConfig('admin_prefix') || 'admin';
    let redisPrefix = application.getConfig('redis_prefix') || 'arrowCMS_';
    let itemOfPage = application.getConfig('pagination').numberItem || 10;

    controller.list = function (req, res) {
        let page = req.params.page || 1;

        promise.all(
            [
                application.models.product.findAndCountAll({
                    limit: itemOfPage,
                    offset: (page - 1) * itemOfPage,
                    order: 'id DESC'
                }),
                application.models.product.findAll({
                    where: {
                        price_sale: {
                            $gt: 0
                        }
                    },
                    limit: 3,
                    order: 'id DESC'
                })
            ]
        ).then(function (results) {
                if (results[0]) {
                    let totalPage = Math.ceil(results[0].count / itemOfPage);
                    res.frontend.render('products', {
                        products: results[0].rows,
                        recommended: results[1],
                        totalPage: totalPage,
                        currentPage: page
                    })
                } else {
                    res.frontend.render404(req, res);
                }
            }).catch(function (err) {
                console.log(err);
                res.frontend.render('_404');
            });
    };

    controller.listByCategorycb = function (item, cb) {
        application.models.product.findAll({
            where: {
                categories: {
                    $ilike: '%:' + item.id + ':%',
                }
            },
            limit: 8,
            order: 'id DESC',
            raw: true
        })
            .then(function (results) {
                item['products'] = results;
                cb(null, item)
            }).catch(function (err) {
                item['products'] = {};
                cb(null, item)
            });
    };

    controller.add_cart = function (req, res) {
        let sess = req.session;
        let products_ids = {};
        let exists = true;
        if (sess.cart) {
            products_ids = sess.cart;
            // products_ids.forEach(function (value) {
            //     if (products_ids[req.params.pid] > 0) {
            //         exists = false;
            //         return;
            //     }
            // })
            if (products_ids[req.params.pid] > 0) {
                exists = false;
            }
        }
        if (exists) {
            products_ids[req.params.pid] = 1;
            sess.cart = products_ids;
            res.send(products_ids);
        } else {
            res.send('exists');
        }
    };

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

};