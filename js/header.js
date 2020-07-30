/**
 * 获取用户登录状态
 */
var status = localStorage.getItem("state");
if (status == null) {
    window.location.href = '../html/login.html';
}
/**
 * 退出
 */
function logout() {
    var jsonData = {}
    ajax("/member/home/ajaxLeave", 'post', JSON.stringify(jsonData)).then(function (data) {
        localStorage.setItem('state', false)
        window.location.href = '../html/login.html'
    })
}

(function () {
    getUser();
    // locationShow('');
    // startTime();
})()

/**
 * 获取当前用户
 */
function getUser() {
    ajax("/member/user/getLoginUser", 'get', JSON.stringify()).then(function (data) {
        // console.log(data)
        var Ip = data.obj.user.name;
        var IpName = `<label>${Ip}</label>`
        $('#userName').html(IpName);
    })

}

// 返回首页
function firstPage() {
    window.location.href = '../html/home.html';
}

//解决方案
function homeDetails() {
    window.location.href = '../html/homeDetails.html';
}

//方案详情
function scheme() {
    window.location.href = '../html/customizescheme.html';
}