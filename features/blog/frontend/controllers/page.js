'use strict';
const nodemailer = require('nodemailer');
const async = require('async');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thanhdat21293@gmail.com',
        pass: 'password'
    }
});

module.exports = function (controller, component, app) {

    controller.pageIndex = function (req, res) {

        app.feature.blog.actions.find({
            include: [
                {
                    model: app.models.user,
                    attributes: ['id', 'display_name', 'user_email', 'user_image_url']
                }
            ],
            where: {
                alias: req.params.alias,
                type: 'page',
                published: 1
            }
        }).then(function (results) {
            if (results) {
                // Render view
                res.frontend.render('page', {
                    item: results.dataValues,
                    postTitle: results.dataValues.title,
                    layout: results.dataValues.title
                });
            } else {
                // Redirect to 404 if page not exist
                res.frontend.render('_404');
            }
        });
    };

    controller.pageSubmit = function (req, res) {

        let name = req.body.name;
        let email = req.body.email;
        let title = req.body.title;
        let message = req.body.message;

        let mailOptions = {
            from: name + '<' + email + '>', // sender address
            to: 'thanhdat21293@gmail.com', // list of receivers
            subject: title, // Subject line
            //text: 'Hello world ?', // plain text body
            html: message // html body
        };

        let checkSendMail = '';
        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {
                checkSendMail = 'Thư của bạn chưa được gửi';
            }else{
                checkSendMail = 'Thư của bạn đã được gửi';
            }

            app.feature.blog.actions.find({
                include: [
                    {
                        model: app.models.user,
                        attributes: ['id', 'display_name', 'user_email', 'user_image_url']
                    }
                ],
                where: {
                    alias: req.params.alias,
                    type: 'page',
                    published: 1
                }
            }).then(function (results) {
                if (results) {
                    // Render view
                    res.frontend.render('page', {
                        item: results.dataValues,
                        postTitle: results.dataValues.title,
                        layout: results.dataValues.title,
                        checkSendMail: checkSendMail
                    });
                } else {
                    // Redirect to 404 if page not exist
                    res.frontend.render('_404');
                }
            });


        });


    };


};