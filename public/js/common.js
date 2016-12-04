/*
 * @Author: taoyage
 * @FileName: common.js 						   
 * @Date:   2016-12-03 15:11:23 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2016-12-04 00:55:45        
 */

'use strict';

((window) => {
    const comment = document.getElementById('comment');
    const textarea = comment.getElementsByTagName('textarea')[0];
    const publish = document.getElementById('publish');
    let data = {}
    publish.onclick = () => {
        data.comment = textarea.value;
        $.post('/comment', data, (result) => {
            console.log(result);
        });
    };
})(window);
