/*
 * @Author: taoyage
 * @FileName: router.js                            
 * @Date:   2016-11-29 17:22:53                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-02 20:22:34        
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
            'avatar': avatar
        });
    });
};

exports.showRegister = (req, res, next) => {
    res.render('register', {
        'login': req.session.login == '1' ? ture : false,
        'username': req.session.login == '1' ? req.session.username : ''
    });
};

exports.showLogin = (req, res, next) => {
    if (req.session.login == '1') {
        res.redirect('/index');
    } else {
        res.render('login', {
            'login': false,
            'username': ''
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
