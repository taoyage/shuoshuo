/*
 * @Author: taoyage
 * @FileName: register.js                          
 * @Date:   2016-11-29 19:58:17                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-11-30 23:16:45        
 */

'use strict';

((window) => {
    const register = document.getElementById('register');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const hint = document.getElementById('hint');
    const data = {};

    register.onclick = () => {
        data.username = username.value;
        data.password = password.value;
        $.post('/doRegister', data, (data, status) => {
            if (data.err) {
                hint.style.display = 'block';
                hint.innerHTML = data.err;
                return;
            } else {
                console.log(status);
                window.location = '/';
            }
        })
        return false;
    };
})(window);
