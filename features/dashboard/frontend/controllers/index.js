'use strict';

const promise = require('arrowjs').Promise;
const async = require('async');

module.exports = function (controller, component, application) {

    let itemOfPage = application.getConfig('pagination').numberItem || 10;

    controller.index = function (req, res) {

        let totalPage = 1;
        let page = req.params.page || 1;
        console.log(req.session.cart)
        promise.all([
                // Find all product

                application.models.product.findAndCountAll({
                    offset: 0,
                    limit: 6,
                    order: 'id DESC'
                }),
                application.models.product.findAll({
                    where: {
                        price_sale: {
                            $ne: 0
                        },
                        quantity: {
                            $gt: 0
                        }
                    },
                    limit: 3,
                    order: 'count_views DESC'
                }),
                // Find all product
                application.models.product.findAll({
                    limit: 4,
                    order: 'id ASC'
                }),
                // Find all product
                application.models.product.findAll({
                    where: {
                        status: 1
                    },
                    limit: 4,
                    order: 'id DESC'
                }),
                application.models.product.findAll({
                    where: {
                        status: 0
                    },
                    limit: 4,
                    order: 'id DESC'
                }),
                application.models.product_category.findAll({
                    order: 'id DESC',
                    raw: true
                })

            ])
            .then(function (results) {
                if (results) {
                    //console.log(results[5])

                    async.mapSeries(results[5], application.feature.products.controllers.frontend.listByCategorycb, (err, result1) => {

                        totalPage = Math.ceil(parseInt(results[0].count) / itemOfPage) || 1;

                        if(err){
                            res.frontend.render('index', {
                                products: results[0].rows,
                                slider: results[2],
                                recommended: results[1],
                                totalPage: totalPage,
                                currentPage: page,
                                olds: results[3],
                                news: results[4],
                                proBycat: ''
                            });
                        }else {

                            // Render view
                            res.frontend.render('index', {
                                products: results[0].rows,
                                slider: results[2],
                                recommended: results[1],
                                totalPage: totalPage,
                                currentPage: page,
                                olds: results[3],
                                news: results[4],
                                proBycat: result1
                            });
                        }
                    });

                } else {
                    // Redirect to 404 if post not exist
                    res.frontend.render('404');
                }
            }).catch(function (err) {
                console.log(err.stack),
                    res.frontend.render('404');
            });

    };
};

