/*
 * @Author: taoyage
 * @FileName: db.js                            
 * @Date:   2016-11-29 20:58:35                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-11-30 22:36:58        
 */

'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('./config');


// =========================================================================== 
// ============================== 连接数据库 ================================== 
// =========================================================================== 

function connectDB(callback) {
    const url = config.url;
    MongoClient.connect(url, (err, db) => {
        console.log("连接成功");
        callback(err, db);
    });
};

// =========================================================================== 
// ============================== 插入数据库 ================================== 
// =========================================================================== 

exports.insert = (collectionName, json, callback) => {
    connectDB((err, db) => {
        if (err) {
            return callback(err, db);
        } else {
            db.collection(collectionName).insertOne(json, (err, result) => {
                callback(err, result);
                db.close();
            });
        }
    });
};

// =========================================================================== 
// ============================== 查找数据库 ================================== 
// =========================================================================== 

exports.find = (collectionName, json, ...values) => {
    let result = [];
    let callback;
    let skipnumber;
    let limit;
    let args;
    if (values.length == 1) {
        callback = values[0];
        skipnumber = 0;
        limit = 0;
    } else if (values.length == 2) {
        callback = values[1];
        args = values[0];
        skipnumber = args.pageamount * args.page;
        limit = args.pageamount;
    } else {
        return 'arguments is collectionName,json,callback';
    }
    connectDB((err, db) => {
        let cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit);
        cursor.each(function(err, doc) {
            if (err) {
                return callback(err, null);
            } else if (doc != null) {
                result.push(doc);
            } else {
                callback(null, result);
                db.close();
            }
        });
    });
};

// =========================================================================== 
// ============================== 删除数据 ==================================== 
// =========================================================================== 

exports.delete = (collectionName, json, callback) => {
    connectDB((err, db) => {
        if (json == {}) {
            db.collection(collectionName).deleteMany(json, (err, results) => {
                callback(err, results);
                db.close();
            });
        } else {
            db.collection(collectionName).deleteOne(json, (err, results) => {
                callback(err, results);
                db.close();
            });
        }
    });
};

// =========================================================================== 
// ============================== 修改数据 ==================================== 
// =========================================================================== 

exports.updata = (collectionName, json1, json2, callback) => {
    connectDB((err, db) => {
        db.collection(collectionName).updateOne(json1, json2, (err, results) => {
            callback(err, results);
            db.close();
        });
    });
};
