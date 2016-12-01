/*
 * @Author: taoyage
 * @FileName: router.js 						   
 * @Date:   2016-11-29 17:22:53                            
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-01 15:19:19 	   
 */

'use strict';

exports.showIndex = (req, res, next) => {
    res.render('index', {
        "login": req.session.login == '1' ? true : false,
        "username": req.session.login == '1' ? req.session.username : ''
    });
};

exports.showRegister = (req, res, next) => {
    res.render('register');
};

exports.showLogin = (req, res, next) => {
    res.render('login');
};
