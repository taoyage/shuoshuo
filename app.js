/*
 * @Author: taoyage
 * @FileName: app.js 						   
 * @Date:   2016-11-29 17:12:24 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-11-29 20:44:57 	   
 */

'use strict';

const express = require('express');
const path = require('path');
const router = require('./controller/router');

const app = express();


/*模版引擎*/
app.set("view engine", "ejs");


/*静态文件*/
app.use(express.static(path.join(__dirname, './public')));

/*路由*/
app.get('/', router.showIndex);
app.get('/register',router.showRegister);
app.post('/doRegister',router.doRegister);

app.listen(3000, () => {
    console.log('listen in 3000 port success');
});
