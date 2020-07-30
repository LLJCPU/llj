var carousel = layui.carousel;
var table = layui.table;
var form = layui.form;
/**
 * url_prefix 地址前缀
 * service_prefix 微服务id
 */
var com = com || {};
com.jnetdata = com.jnetdata || {};
com.jnetdata = {
    'url_prefix':'http://39.99.179.142:8083',
};


/**
 * 获取最终提交地址
 * @param {*} serviceId 微服务id(对应地址前缀)
 * @param {*} url 请求地址
 */
function getAjaxUrl(url) {
    return com.jnetdata.url_prefix + url;
}

/** 
 * ajax请求
 * @param {*} url url地址
 * @param {*} type 请求类型 'get', 'post', 'put', 'delete'等
 * @param {*} data 请求数据
 */
function ajax(url,type,data) {
    var index = layer.load();
    return new Promise(function (resovle, reject) {
        $.ajax({
            type: type,
            url: getAjaxUrl(url),
            contentType: 'application/json',
            data: data,
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(res) {
                layer.close(index);
                resovle(res);
            },
            error: function(err) {
                layer.close(index);
                reject(err);
            }
        })
    }).catch(function(e) {
        layer.close(index);
        // console.log(e);
    });
}

/**
 * 渲染分页
 * @param {*} total 数据总数，从服务端得到
 * @param {*} curr 
 * @param {*} size 
 * @param {*} theme 
 * @param {*} fnName 
 */
function page(total,curr,size,theme,fnName,elem) {
    if(!elem) elem = "page";
    layui.laypage.render({
        elem: elem
        ,limit:size
        ,curr:curr
        ,theme:theme
        ,count: total //数据总数，从服务端得到
        ,limits : [15,50,100]
        ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
        ,jump: function(obj, first){
            if(!first){
                defaultPageSize = obj.limit;
                if(fnName){
                    eval(fnName+"("+obj.curr+",{})");
                }else{
                    doList(obj.curr,{});
                }
            }
        }
    });
}

/**
 * 设置列表数据
 * @param {*} url 请求地址
 */
function setListData(url,entity){
	var jsonData = {
		"pager": {
		  "current": 1,
		  "size": 10
		},
		"entity":entity
	};
	ajax(url+'/list','post',JSON.stringify(jsonData)).then(function (data){
		if(data.success){			
			setTableData('#tableData',data.obj,columns);
		}else{
			console.log(data.msg);
		}
	})
}

/**
 * 数据模板
 * @param {*} data 
 * @param {*} domTpl 
 * @param {*} dom 
 */
function getData(data, domTpl, dom) {
    layui.use('laytpl', function() {
        var laytpl = layui.laytpl;
        laytpl($(domTpl).html()).render(data, function (html) {
            $(dom).html(html);
        });
    })
}
// $(function(){
    
// 	$('#header').load('../include/header.html');
// 	$('#footer').load('../include/footer.html');
// })

/** 
 * 头部搜索结果表单事件提交
 * 
 * */
layui.use(['form', 'layedit', 'laydate'], function() {
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;
	form.on('submit(formDemo)', function(data) {
		console.log(data)
		window.open("search.html?count1="+data.field.name);
		return false;
	});
})

// $('.menu ul li').click(function(){
//     $(this).addClass('layui-this').siblings().removeClass('layui-this');
// });
var userName = sessionStorage.getItem("userName");
if(userName!= null && userName != ''){
    $("#login_show").html("您好,"+userName);
    $("#register").css("display","none");
}
function login_show() {
    $('.login_box').show();
}
function loginOut(){
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("passWord");
    location.reload();
}
//登录
function user_login(){
    var username = $("#username").val();
    if(!username){
        layer.alert('请输入用户！');
        return;
    }
    var password = $("#password").val();
    if(!password){
        layer.alert('请输入密码！');
        return;
    }
    var rememberMe = $('#rememberMe').is(':checked');
    // var jsonDate ={
    //     username: username,
    //     password: password,
    //     rememberMe: $('#rememberMe').is(':checked')
    // }

    $.ajax({
        type: 'post',
        url: 'http://39.99.179.142:8068/ajaxLogin?username='+username+'&password='+password+'&rememberMe=false&type=APP',
        contentType: 'application/json',
        // data: data,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            sessionStorage.setItem("userName",username);
            sessionStorage.setItem("passWord",password);
            $('.login_box').css("display","none");
            $("#login_show").html("您好,"+username);
            $("#register").css("display","none");
            // layer.close(index);
            // resovle(res);
        },
        error: function(err) {
            layer.alert("用户账户密码不正确，请重新再输入！");
        }
    })
}

function numberCenter() {
    //src="http://39.99.179.142:8068/member_center"
    if(!userName){
        return;
    }
    $(".chabz").css("display","none");
    $("#w1200").css("display","none");
    var height = document.documentElement.clientHeight+550;
    $(".footer_box").html('<iframe  name="iFrame1" width="100%" style="margin-top: -60px;" height="'+height+'" hspace="-100" vspace="-150" frameborder="0" scrolling="no" onload="this.height=iFrame1.document.body.scrollHeight"  src="http://39.99.179.142:8068/member_center"></iframe>');
}

// $("#shoppingNum").on("click",function(){
//     if(!userName){
//         return;
//     }
//     $(".chabz").css("display","none");
//     $("#w1200").css("display","none");
//     var height = document.documentElement.clientHeight+46;
//     $(".footer_box").html('<iframe  name="iFrame1" width="100%" style="margin-top: -60px;" height="'+height+'" hspace="-100" vspace="-150" frameborder="0" scrolling="no" onload="this.height=iFrame1.document.body.scrollHeight"  src="http://39.99.179.142:8068/shoppingcartByNankeda"></iframe>');
// })


// $(".login_close").on("click",function(){
//     $('.login_box').css("display","none");
// })
