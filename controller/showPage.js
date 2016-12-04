/*
 * @Author: taoyage
 * @FileName: showPage.js                          
 * @Date:   2016-12-04 14:37:50                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-04 17:35:39        
 */

'use strict';

const db = require('../models/db');

exports.showIndex = (req, res, next) => {
    let login;
    let username;
    let avatar;
    if (req.session.login == '1') {
        username = req.session.username;
        login = true;
    } else {
        username = '';
        login = false;
        return res.redirect('/login');
    }
    db.find('users', { username: username }, (err, result) => {
        if (result[0].avatar) {
            avatar = result[0].avatar;
        } else {
            avatar = 'moren.jpg';
        }
        res.render('index', {
            'login': login,
            'username': username,
            'avatar': avatar,
            'active': '首页'
        });
    });
};

exports.showRegister = (req, res, next) => {
    res.render('register', {
        'login': req.session.login == '1' ? ture : false,
        'username': req.session.login == '1' ? req.session.username : '',
        'active' : '注册'
    });
};

exports.showLogin = (req, res, next) => {
    if (req.session.login == '1') {
        res.redirect('/index');
    } else {
        res.render('login', {
            'login': false,
            'username': '',
            'active':'登陆'
        });
    }
};

exports.showPersonal = (req, res, next) => {
    if (req.session.login != '1') {
        return res.redirect("/login");
    } else {
        res.render('personal', {
            'login': true,
            'username': req.session.username
        });
    }
}

exports.showUser = function(req, res, next) {
    var user = req.params.user;
    db.find("posts", { "username": user }, function(err, result) {
        db.find("users", { "username": user }, function(err, result2) {
            if (req.session.login != '1') {
                return res.redirect('/login');
            } else {
                res.render("myHomePage", {
                    "login": true,
                    "username": req.session.username,
                    "user": user,
                    "active": "我的说说",
                    "data": result,
                    "avatar": result2[0].avatar
                });
            }
        });
    });
}
