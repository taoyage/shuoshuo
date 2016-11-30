/*
 * @Author: taoyage
 * @FileName: router.js                            
 * @Date:   2016-11-29 17:22:53                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-11-30 23:04:21        
 */

'use strict';

const formidable = require('formidable');
const MongoClient = require('mongodb').MongoClient;
const db = require('../models/db');
const md5 = require('../models/md5');

exports.showIndex = (req, res, next) => {
    res.render('index');
};

exports.showRegister = (req, res, next) => {
    res.render('register');
};

exports.doRegister = (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        let username = fields.username;
        let password = md5(fields.password);

        db.find('users', { 'username': username }, (err, result) => {
            if (err) {
                return res.send({err:err});
            } else if (result.length != 0) {
                return res.send({err:'用户已存在'});
            } else {
                db.insert('users', { 'username': username, 'password': password }, (err, result) => {
                    if (err) {
                        return res.send(err);
                    } else {
                        return res.send(result);
                    }
                });
            }
        });
    });
}
