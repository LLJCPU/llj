//登录
function user_login() {
    var html = '';
    var username = $("#username").val();
    if (!username) {
        layer.alert('请输入用户！');
        return false;
    }
    var password = $("#password").val();
    if (!password) {
        layer.alert('请输入密码！');
        return false;
    }
    var rememberMe = $('#rememberMe').is(':checked');
    var code = $('#imgcode').val();
    if (!code) {
        layer.alert('请输入验证码！');
        return;
    }
    var data = {
        "code": code,
        "name": username,
        "passWord": password,
        "rememberMe": true
    }
    ajax("/member/home/backAjaxLogin", 'post', JSON.stringify(data)).then(function (data) {
        if(data.status != 200){
            alert(data.msg);
        }else{
            window.location.href="home.html";
        }
    })
}

// 获取验证码
function changeImg() {
    return new Promise(function (resovle) {
        $("#verifyCodeImg").attr("src", `${com.jnetdata.url_prefix}/member/home/imgCode?t=${new Date().getTime()}`);
        resovle(1);
        getCode();
    })
}

// 获取验证码
function getCode() {
    ajax("/member/home/getCode", 'get', JSON.stringify()).then(function (data) {
        $("#imgcode").val(data.obj.code);
    })
}

$(function () {
    changeImg().then(function (res) {
        getCode();
    })
});

(function(){
    changeImg();
})()