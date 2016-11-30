/*
 * @Author: taoyage
 * @FileName: md5.js 						   
 * @Date:   2016-11-30 22:31:38 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-11-30 22:32:15 	   
 */

'use strict';

const crypto = require("crypto");
module.exports = (mima) => {
    let md5 = crypto.createHash('md5');
    let password = md5.update(mima).digest('base64');
    return password;
}
