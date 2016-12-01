/*
 * @Author: taoyage
 * @FileName: users.js 						   
 * @Date:   2016-12-01 14:22:48 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-01 15:20:13 	   
 */

'use strict';

const formidable = require('formidable');
const MongoClient = require('mongodb').MongoClient;
const db = require('../models/db');
const md5 = require('../models/md5');

exports.doRegister = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        let username = fields.username;
        let password = md5(fields.password);

        db.find('users', { 'username': username }, (err, result) => {
            if (err) {
                return res.send({ err: err });
            } else if (result.length != 0) {
                return res.send({ err: '用户已存在' });
            } else {
                db.insert('users', { 'username': username, 'password': password }, (err, result) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        req.session.login = '1';
                        req.session.username = username;
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