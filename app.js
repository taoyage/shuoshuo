/*
 * @Author: taoyage
 * @FileName: app.js 						   
 * @Date:   2016-11-29 17:12:24 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-04 14:44:33 	   
 */

'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const router = require('./controller/router');

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


/***********************路由配置*************************/
router(app);


// =========================================================================== //
// ============================== 启动应用 开始 ============================== //
// =========================================================================== //

app.listen(3000, () => {
    console.log('listen in 3000 port success');
});
