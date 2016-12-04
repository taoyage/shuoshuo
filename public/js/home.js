/*
 * @Author: taoyage
 * @FileName: home.js                          
 * @Date:   2016-12-02 23:35:16                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-04 18:19:12        
 */

'use strict';
((window) => {
    const content = document.getElementById('content');
    let html = '';
    let page = 0;
    let count = 0;
    getComment(page);
    window.onscroll = () => {
        let winH = $(window).height();
        let scrollT = document.body.scrollTop;
        let pageH = document.body.offsetHeight;
        let aa = (pageH - winH - scrollT) / winH;
        if (aa < 0.02) {
            if (count >= 15) {
                getComment(++page);
            }
            return;
        }
    };

    function getComment(page) {
        $.ajax({
            url: '/getComment/' + page,
            type: 'POST',
            success: (result) => {
                count = result.length;
                result.forEach((data, index) => {
                    let li = document.createElement('li');
                    li.setAttribute('class', 'list-group-item');
                    html += `<div>`;
                    html += `<img class="list-avatar" src="./images/avatar/${data.username}.jpg">`;
                    html += `</div>`;
                    html += `<div class="content">`;
                    html += `<strong class="username">${data.username}</strong>`;
                    html += `<span class="date">${data.date}</span>`;
                    html += `<p class="comment">${data.comment}</p> `;
                    html += `</div>`;
                    li.innerHTML = html;
                    content.prepend(li);
                    html = '';
                });
            }
        });
    };

})(window);


((window) => {
    const userWarp = document.getElementById('userWarp');
    let html = '';
    $.ajax({
        url: '/getUsers',
        type: "POST",
        success: (resutl) => {
            resutl.forEach((data) => {
                html += `<li>`;
                html += `<img src="images/avatar/${data.avatar}">`;
                html += `<p class="users">${data.username}</p>`;
                html += `</li>`;
            });
            userWarp.innerHTML = html;
        }
    });
})(window);
