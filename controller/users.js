/*
 * @Author: taoyage
 * @FileName: users.js                         
 * @Date:   2016-12-01 14:22:48                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-04 15:54:10        
 */

'use strict';

const formidable = require('formidable');
const db = require('../models/db');
const md5 = require('../models/md5');
const path = require("path");
const fs = require("fs");

exports.doRegister = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let username = fields.username;
        let password = md5(fields.password);
        let avatar = username + '.jpg';

        db.find('users', { 'username': username }, (err, result) => {
            if (err) {
                return res.send({ err: err });
            } else if (result.length != 0) {
                return res.send({ err: '用户已存在' });
            } else {
                fs.readFile('./public/images/avatar/moren.jpg', (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        fs.writeFile('./public/images/avatar/' + avatar, data, (err) => {
                            if (err) throw err;
                            console.log('It\'s saved!');
                        });
                    }
                });
                db.insert('users', { 'username': username, 'password': password, 'avatar': avatar }, (err, result) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        req.session.login = '1';
                        req.session.username = username;
                        req.session.avatar = 'moren.jpg';
                        return res.send(result);
                    }
                });
            }
        });
    });
};


exports.doLogin = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let username = fields.username;
        let password = md5(fields.password);

        db.find('users', { 'username': username, 'password': password }, (err, result) => {
            if (result.length === 0) {
                res.send({ err: '用户名不存在或密码错误' });
            } else if (result[0].username === username && result[0].password === password) {
                req.session.login = '1';
                req.session.username = username;
                res.send(result);
            } else {
                res.send({ err: err });
            }
        });
    });
};

exports.doPersonal = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize("./public/images/avatar");
    form.parse(req, (err, fields, files) => {
        let oldpath = files.avatar.path;
        let newpath = path.normalize("./public/images/avatar/") + req.session.username + ".jpg";
        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                return res.send({ err: '设置头像失败' });
            } else {
                req.session.avatar = req.session.username + '.jpg';
                db.updata('users', { 'username': req.session.username }, {
                    $set: { 'avatar': req.session.avatar }
                }, (err, result) => {
                    if (err) {
                        return res.send({ err: err });
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });
};
