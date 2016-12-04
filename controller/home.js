/*
 * @Author: taoyage
 * @FileName: home.js 						   
 * @Date:   2016-12-04 14:12:02 						   
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-04 17:56:26        
 */

'use strict';

const formidable = require('formidable');
const db = require('../models/db');

exports.comment = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let comment = fields.comment;
        let username = req.session.username;
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        db.insert('posts', {
            "username": username,
            'date': date,
            'comment': comment
        }, (err, result) => {
            if (err) {
                return res.send({ err: '发布失败' });
            } else {
                res.send(result);
            }
        });
    });
}

exports.getComment = (req, res, next) => {
    let page = req.params.page;
    db.find('posts', {},{"pageamount":15,"page":page}, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            res.send(result);
        }
    });
};

exports.getUsers = (req, res, next) => {
    db.find('users', {}, (err, result) => {
        if (err) {
            return res.send({ err: err });
        } else {
            res.send(result);
        }
    });
};
