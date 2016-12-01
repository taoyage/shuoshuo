/*
 * @Author: taoyage
 * @FileName: app.js 						   
 * @Date:   2016-11-29 17:12:24 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-01 14:33:00 	   
 */

'use strict';

const express = require('express');
const path = require('path');
const router = require('./controller/router');
const session = require('express-session');
const users = require('./controller/users');
const app = express();

/***********************session设置*************************/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


/***********************设置模版*************************/
app.set("view engine", "ejs");


/***********************设置静态文件目录*************************/
app.use(express.static(path.join(__dirname, './public')));


/***********************渲染页面路由*************************/
app.get('/', router.showIndex);
app.get('/register', router.showRegister);
app.get('/login',router.showLogin);


/***********************处理请求陆游*************************/
app.post('/doRegister', users.doRegister);
app.post('/doLogin',users.doLogin);


// =========================================================================== //
// ============================== 启动应用 开始 ============================== //
// =========================================================================== //

app.listen(3000, () => {
    console.log('listen in 3000 port success');
});
