/*
 * @Author: taoyage
 * @FileName: personal.js                          
 * @Date:   2016-12-01 20:05:00                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2016-12-02 17:24:51        
 */

'use strict';

((window) => {
    // const avatar = document.getElementById('avatar');
    const submit = document.getElementById('submit');
    let data = {};

    submit.onclick = () => {
        let files = $('#avatar').prop('files');
        data = new FormData();
        data.append('avatar', files[0]);
        $.ajax({
            url: '/doPersonal',
            type: 'POST',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: (result) => {
                console.log(result);
            },
            err: (result) => {
                console.log(result.err);
            }
        });
        $('#avatar').val('');
        return false;
    }
})(window);
