/*
 * @Author: taoyage
 * @FileName: login.js                         
 * @Date:   2016-12-01 13:48:35                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-01 15:19:01        
 */

'use strict';

((window) => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const login = document.getElementById('login');
    let data = {};

    login.onclick = () => {
        data.username = username.value;
        data.password = password.value;
        console.log(data);
        $.post('doLogin', data, (data) => {
            if (data.err) {
                hint.style.display = 'block';
                hint.innerHTML = data.err;
            } else {
                window.location = '/';
            }
        });
        return false;
    };
})(window)
