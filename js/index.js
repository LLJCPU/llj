//图片切换
function slide() {
	carousel.render({
		elem: '#carouselList',
		interval: 1800
			//,full: true
			,
		anim: 'fade',
		height: '360px'
	});
}
//最新政策
function policyList() {
	var jsonData = {
		"current": 1,
		"size": 10,
		"sortProps": {
			key: "releasetime",
			value: false
		}
	};
	ajax('/neo4j/policydocument/list', 'post', JSON.stringify(jsonData)).then(function(data) {
		if(data.success) {
			getData(data.obj.records, '#policyTemplate', '#policyView');
			var policyView = $("#policyView").find("a");
			for(i = 0; i < policyView.length; i++) {
				policyView.eq(i).click(function(e) {
					window.open("DocumentDetails.html?columnid=" + this.id);
				})
			}
		} else {
			console.log('数据错误');
		}
	})

}

policyList();

//标准公告
function noticeList() {
	var cols = [
		{ field: 'documentno', title: '公告号', width: 300 }, { field: 'coursename', title: '公告名称', toolbar: '#standardsBulletin' }, { field: 'builddate', title: '公告日期', width: 140 }
	];
	var jsonData = {
		"current": 1,
		"size": 10,
		"sortProps": {
			key: "builddate",
			value: false
		}
	};
	ajax('/neo4j/policydocument/list?docstatus=0&columnid=1268802103925555201', 'post', JSON.stringify(jsonData)).then(function(data) {
		table.render({
			elem: '#notice1',
			data: data.obj.records,
			limit: 6,
			cols: [cols]
		});
		table.on('row(test)', function(obj) {
			console.log(obj)
			//					window.open("DocumentDetails.html?id=" + obj.data.id);
		});

	})
}
noticeList();

//图片轮播
function carouselList() {
	var jsonData = {
		"current": 1,
		"size": 5
	};
	ajax('/neo4j/picturerotation/list', 'post', JSON.stringify(jsonData)).then(function(data) {
		if(data.success) {
			getData(data.obj.records, '#carouselTemplate', '#carouselView');
			slide();
		} else {
			console.log('数据错误');
		}
	})
}
carouselList();

//标准动态
function standardNews() {
	var elemId;
	var url = '/neo4j/jmetacbs/list';
	var typeData1, typeData2, typeData3 = [];
	var cols = [
		{ field: 'code', title: '标准号', width: 300 }, { field: 'nameCn', title: '标准名称', toolbar: '#standardsTemplate'}, { field: 'standardOf', title: '代替如下标准', width: 300 }, { field: 'releaseTime', title: '发布日期', width: 140 ,toolbar: '#standardsData'}
	];
	var cols1 = [
		{ field: 'code', title: '标准号', width: 300 }, { field: 'nameCn', title: '标准名称', toolbar: '#standardsTemplate' }, { field: 'standardOf', title: '代替如下标准', width: 300 }, { field: 'releaseTime', title: '实施日期', width: 140 ,toolbar: '#standardsData'}
	];
	//渲染数据到table
	function setTableData(data, elem, cols) {
		table.render({
			elem: '#' + elem,
			data: data.records,
			limit: 6,
			cols: [cols]
		});
	};
	function setTableData1(data, elem, cols) {
		table.render({
			elem: '#' + elem,
			data: data.records,
			limit: 6,
			cols: [cols1]
		});
	};
	var jsonData = {
		"current": 1,
		"size": 6
	};
	$('.standardGb li').click(function() {
		$(this).addClass('layui-this').siblings().removeClass('layui-this');
		standtype = $(".standardGb .layui-this").attr('type');
		type = $('.active').attr('type');
		console.log(type)
		ajax(url + '?levelName=' + standtype + '&classes=' + type, 'post', JSON.stringify(jsonData)).then(function(data) {
			if(type == "新发布"){
				setTableData(data.obj, 'standardNews', cols);
			}else{
				setTableData1(data.obj, 'standardNews', cols);
			}

		})
	});
	$('.tabs_title_sub ul li').click(function() {
		standtype = $(".standardGb .layui-this").attr('type');
		$(this).addClass('active').siblings().removeClass('active');
		var type = $(this).attr('type');
		// elemId = 'standard'+type;
		ajax(url + '?levelName=' + standtype + '&classes=' + type, 'post', JSON.stringify(jsonData)).then(function(data) {
			if(type == "新发布"){
				setTableData(data.obj, 'standardNews', cols);
			}else{
				setTableData1(data.obj, 'standardNews', cols);
			}
		})
	});
	var jsonDataP = {
		"current": 1,
		"size": 6
	}
	var standtype = $(".standardGb .layui-this").attr('type');
	var type = $('.active').attr('type');
	ajax(url + '?levelName=' + standtype + '&classes=' + type, 'post', JSON.stringify(jsonDataP)).then(function(data) {
		setTableData(data.obj, 'standardNews', cols);
	})
}
standardNews();


//热门标准
function hotStandardList() {
	var cols = [
		{ type: 'numbers', title: '序', width: 50 },
		{ field: 'code', title: '标准号', width: 180 },
		{ field: 'nameCn', title: '标准名' ,toolbar: '#barHotName'},
		{ field: 'implTime', title: '实施时间', width: 130 ,toolbar: '#barHotDate'},
	];
	var jsonData = {
		"current": 1,
		"size": 10,
		"sortProps": {
			key: "visitsno",
			value: false
		}
	}

	ajax('/neo4j/cbsstdb/list' + '?levelName=国家标准', 'post', JSON.stringify(jsonData)).then(function(data) {
		table.render({
			elem: '#hotStandard',
			data: data.obj.records,
			limit: 6,
			cols: [cols]
		});
	})

	$('.hotStandard .tabs_title li').click(function() {
		$(this).addClass('layui-this').siblings().removeClass('layui-this');
		var type = $(this).attr('pType');
		elemId = 'hotStandard' + type;
		console.log('hotStandardtype', type);
		ajax('/neo4j/cbsstdb/list' + '?levelName=' + type, 'post', JSON.stringify(jsonData)).then(function(data) {
			table.render({
				elem: '#hotStandard',
				data: data.obj.records,
				limit: 6,
				cols: [cols]
			});
			table.on('row(test)', function(obj) {
				console.log(obj);
				
			});
		})
	});

}
hotStandardList();
