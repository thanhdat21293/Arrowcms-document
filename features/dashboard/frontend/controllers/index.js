'use strict';

module.exports = function (controller, component, application) {

    controller.index = function (req, res) {

        let page = req.params.page || 1;
        let itemOfPage = application.getConfig('pagination').frontNumberItem || 5;
        let totalPage = 1;

        application.feature.blog.actions.findAndCountAll({
            where : {
                published: 1,
                type: 'post'
            },
            include: [{
                model: application.models.user
            }],
            limit: itemOfPage,
            offset: (page - 1) * itemOfPage
        })
            .then(data => {
                console.log(data.rows)
                totalPage = Math.ceil(data.count/itemOfPage);
                res.frontend.render('index', {
                    postTitle: 'Blog page',
                    posts: data.rows,
                    page: page,
                    itemOfPage: itemOfPage,
                    totalPage: totalPage
                })
            })

    };
};