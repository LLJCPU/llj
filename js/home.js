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
    locationShow('');
    startTime();
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

// 污染介质下拉框
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    form.on('submit(chooseList)', function (data) {
        searchStr = '?wrjz=' + data.field.interest;
        locationShow(searchStr);
    })
})

// 污染地点土壤参数
function locationShow(searchStr) {
    var html = '';
    var data = {
        "current": 1,
        "size": 5,
    }
    ajax("/neo4j/pollute/list"+ searchStr, 'post', JSON.stringify(data)).then(function (data) {
            newData = data.obj.records;
            newData.map(data => {
                // console.log(data.id);
                html += `<li onclick="theLocation(${data.jd}, ${data.wd}, '${data.trzhiliang}', '${data.underwaterzl}', '${data.wrwsl}', '${data.dxsw}',
                '${data.wrwnd}', '${data.hschd}', '${data.wrwfb}', '${data.xfnd}', '${data.polluteplace}', '${data.id}')">${data.polluteplace}</li>`;
                $("#locationList").html(html);
            })
            // console.log(data)
        })
}


function homeDetails(id) {
    var newId = '?wrdid=' + id;
    window.location.href = '../html/homeDetails.html' + newId;
}

// 百度地图API功能
var map = new BMap.Map("waterRepair");
map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
map.enableScrollWheelZoom(true);
var sContent = "天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...";
var point = new BMap.Point(116.417854, 39.921988);
// 用经纬度设置地图中心点
function theLocation(x, y, trzhiliang, underwaterzl, wrwsl, dxsw, wrwnd, hschd, wrwfb, xfnd, title, id) {
    map.clearOverlays();
    console.log(id);
    var new_point = new BMap.Point(x, y);
    var new_sContent = `${title}<br /><div class="newsContentStyle" onclick="homeDetails(${id})">查看详情数据</div>`;
    var marker = new BMap.Marker(new_point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.panTo(new_point);
    var newList = `<div class="box-show">
                <div class="list-show">
                    <li>土壤质量</li>
                    <li>${trzhiliang ? trzhiliang : '-'}</li>
                </div>
                <div class="list-show">
                    <li>地下水质量</li>
                    <li>${underwaterzl ? underwaterzl : '-'}</li>
                </div>
                <div class="list-show">
                    <li>污染物数量</li>
                    <li>${wrwsl ? wrwsl : '-'}</li>
                </div>
                <div class="list-show">
                    <li>地下水位</li>
                    <li>${dxsw ? dxsw : '-'}</li>
                </div>
                <div class="list-show">
                    <li>污染物浓度</li>
                    <li>${wrwnd ? wrwnd : '-'}</li>
                </div>
                <div class="list-show">
                    <li>含水层厚度</li>
                    <li>${hschd ? hschd : '-'}</li>
                </div>
                <div class="list-show">
                    <li>污染物分布</li>
                    <li>${wrwfb ? wrwfb : '-'}</li>
                </div>
                <div class="list-show">
                    <li>修复难度</li>
                    <li>${xfnd ? xfnd : '-'}</li>
                </div>
            </div>`
    $(".show-parameter").html(newList);
    var infoWindow = new BMap.InfoWindow(new_sContent); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, new_point); //开启信息窗口
    marker.addEventListener("click", function(){
        var infoWindow = new BMap.InfoWindow(new_sContent); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, new_point); //开启信息窗口
    })
}

// 时间表
function startTime() {
    var timePage = ''
    var today = new Date();
    var y = today.getFullYear();
    var M = today.getMonth();
    var d = today.getDate();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    M = checkTime(M + 1);
    d = checkTime(d);
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    var timePage = `${y}-${M}-${d} ${h}:${m}:${s}`
    // document.getElementById("hearder-time").innerHTML = h + ":" + m + ":" + s;
    $("#hearder-time").html(timePage);
    t = setTimeout(function () {
        startTime();
    }, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}