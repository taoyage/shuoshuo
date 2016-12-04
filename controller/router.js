/*
 * @Author: taoyage
 * @FileName: router.js                            
 * @Date:   2016-11-29 17:22:53                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-04 17:57:00        
 */

'use strict';

const account = require('./users');
const home = require('./home');
const showPage = require('./showPage');

module.exports = (router) => {

    /***********************请求路由配置*************************/

    router.post('/doLogin', account.doLogin);
    router.post('/doRegister', account.doRegister);
    router.post('/doPersonal', account.doPersonal);
    router.post('/comment', home.comment);
    router.post('/getComment/:page', home.getComment);
    router.post('/getUsers', home.getUsers);

    /***********************视图渲染路由*************************/
    
    router.get('/', showPage.showIndex);
    router.get('/register', showPage.showRegister);
    router.get('/login', showPage.showLogin);
    router.get('/personal', showPage.showPersonal);
    router.get("/user/:user",showPage.showUser);

}
