// 返回首页
function firstPage() {
    window.location.href = '../html/home.html';
}

// 获取URL地址
(function GetUrlPara() {
    var url = document.location.toString();
    var arrUrl = url.split("?");
    var para = arrUrl[1];
    stuationShow(para);
    echarsShow();
    wrdqData(para);
})()

// 检测点基本情况
function stuationShow(id) {
    var data = {
        "current": 1,
        "size": 50,
    }
    ajax("/neo4j/jcbaseinfo/list?" + id, 'post', JSON.stringify(data)).then(function (data) {
        newData = data.obj.records;
        var basicData;
        newData.map(data => {
            // console.log(data);
            basicData = `<table class="layui-table table-form">
                    <colgroup>
                    <col width="3" style="background-color: #a13312;">
                    <col width="2">
                    </colgroup>
                    <div id="stuationShowList">
                    <tbody>
                    <tr>
                        <td>省(区、市)名</td>
                        <td>${data.sm}</td>
                    </tr>
                    <tr>
                        <td>县(辖、市、区)名</td>
                        <td>${data.xm}</td>
                    </tr>
                    <tr>
                        <td>村名</td>
                        <td>${data.cm}</td>
                    </tr>
                    <tr>
                        <td>县代码</td>
                        <td>${data.xdm}</td>
                    </tr>
                    <tr>
                        <td>纬度（° '‘’）</td>
                        <td>${data.wd}</td>
                    </tr>
                    <tr>
                        <td>常年有效积温（℃）</td>
                        <td>${data.cnyxjw}</td>
                    </tr>
                    <tr>
                        <td>地形部位</td>
                        <td>${data.dxbw}</td>
                    </tr>
                    <tr>
                        <td>海拔高度（m）</td>
                        <td>${data.hbgd}</td>
                    </tr>
                    <tr>
                        <td>障碍因素</td>
                        <td>${data.zays}</td>
                    </tr>
                    <tr>
                        <td>灌溉能力</td>
                        <td>${data.ggnl}</td>
                    </tr>
                    <tr>
                        <td>地域分区</td>
                        <td>${data.dyfq}</td>
                    </tr>
                    <tr>
                        <td>典型种植制度</td>
                        <td>${data.dxzd}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>地（市、州、盟）名</td>
                        <td>${data.dm}</td>
                    </tr>
                    <tr>
                        <td>乡（镇）名</td>
                        <td>${data.xzm}</td>
                    </tr>
                    <tr>
                        <td>农户（地块）名</td>
                        <td>${data.nhm}</td>
                    </tr>
                    <tr>
                        <td>经度（° '‘’）</td>
                        <td>${data.jd}</td>
                    </tr>
                    <tr>
                        <td>常年降水量（mm ）</td>
                        <td>${data.cnjsl}</td>
                    </tr>
                    <tr>
                        <td>典型种植制度</td>
                        <td>${data.dxzd}</td>
                    </tr>
                    <tr>
                        <td>常年无霜期（天）</td>
                        <td>${data.cnwsq}</td>
                    </tr>
                    <tr>
                        <td>坡度（°）</td>
                        <td>${data.pd}</td>
                    </tr>
                    <tr>
                        <td>潜水埋深（m）</td>
                        <td>${data.qsms}</td>
                    </tr>
                    <tr>
                        <td>地力水平（高中低）</td>
                        <td>${data.dlsp}</td>
                    </tr>
                    <tr>
                        <td>排水能力</td>
                        <td>${data.psnl}</td>
                    </tr>
                    <tr>
                        <td>熟制分区</td>
                        <td>${data.szfq}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>产量水平</td>
                        <td>${data.clsp}</td>
                    </tr>
                    <tr>
                        <td>常年施肥(kg/ha)化肥</td>
                        <td>${data.cnsf}</td>
                    </tr>
                    <tr>
                        <td>常年施肥(kg/ha)有机肥</td>
                        <td>${data.yjf}</td>
                    </tr>
                    <tr>
                        <td>田块面积（ha）</td>
                        <td>${data.tkmj}</td>
                    </tr>
                    <tr>
                        <td>土壤代码</td>
                        <td>${data.trdm}</td>
                    </tr>
                    <tr>
                        <td>土类</td>
                        <td>${data.tl}</td>
                    </tr>
                    <tr>
                        <td>土属</td>
                        <td>${data.ts}</td>
                    </tr>
                    <tr>
                        <td>代表面积（ha）</td>
                        <td>${data.dbmj}</td>
                    </tr>
                    <tr>
                        <td>成土母质</td>
                        <td>${data.ctmz}</td>
                    </tr>
                    <tr>
                        <td>亚类</td>
                        <td>${data.yl}</td>
                    </tr>
                    <tr>
                        <td>土种</td>
                        <td>${data.tz}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>土壤质量</td>
                        <td>${data.trzl}</td>
                    </tr>
                    <tr>
                        <td>污染物数量</td>
                        <td>${data.wrwsl}</td>
                    </tr>
                    <tr>
                        <td>污染物浓度</td>
                        <td>${data.wrwnd}</td>
                    </tr>
                    <tr>
                        <td>污染物类型</td>
                        <td>${data.wrwlx}</td>
                    </tr>
                    <tr>
                        <td>污染物分布</td>
                        <td>${data.wrwfb}</td>
                    </tr>
                    <tr>
                        <td>地下水质量</td>
                        <td>${data.dxszl}</td>
                    </tr>
                    <tr>
                        <td>地下水位</td>
                        <td>${data.dxsw}</td>
                    </tr>
                    <tr>
                        <td>含水层厚度</td>
                        <td>${data.hschd}</td>
                    </tr>
                    <tr>
                        <td>修复难度</td>
                        <td>${data.xfnd}</td>
                    </tr>
                    <tr>
                        <td>渗透系数</td>
                        <td>${data.stxs}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                    </div>
                </table>`;
            $("#stuationShowList").html(basicData);
        });
    })
}

// echars 图
function echarsShow() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('show-point'));
    option = null;
    option = {
        grid: {
            x: 130,
            y: 8,
            x2: 150,
            y2: 180
        },
        xAxis: {
            scale: true
        },
        yAxis: {
            scale: true
        },
        dataZoom: [{
                type: 'slider',
                xAxisIndex: 0,
                bottom: "30%",
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                left: "90%",
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                start: 0,
                end: 100
            }
        ],
        series: [{
                name: 'choosePoint',
                type: 'effectScatter',
                data: [],
                symbolSize: 20,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                    }
                }
            },
            {
                name: 'point',
                data: [],
                type: 'scatter',
                symbolSize: 10,
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

// 污染地区采样点展示数据调用
function wrdqData(id) {
    var myChart = echarts.init(document.getElementById('show-point'));
    var dat = []
    var data = {
        "current": 1,
        "size": 5,
    }
    ajax("/neo4j/wrdqcydzs/list?" + id, 'post', JSON.stringify(data)).then(function (data) {
        var newData = data.obj.records;
        newData.map(data => {
            dat.push([data.x, data.y, data.wrw]);
        })
        // 填入数据
        myChart.setOption({
            series: [{
                // 根据名字对应到相应的系列
                name: 'point',
                data: dat
            }]
        });
    })
}

// 污染介质筛选下拉框
layui.use(['form', 'layer'], function () {
    var url = document.location.toString();
    var arrUrl = url.split("?");
    var para = arrUrl[1];
    var form = layui.form;
    form.on('submit(formSearch)', function (data) {
        conType = '&wrw=' + data.field.interest;
        price_min = '&wrz=' + data.field.price_min;
        price_max = '&wrzBT2=' + data.field.price_max;
        wrdqData2(para, conType, price_min, price_max);
        return false;
    })
})

// 污染地区采样点筛选展示
function wrdqData2(id, conType, price_min, price_max) {
    var myChart = echarts.init(document.getElementById('show-point'));
    var dat2 = []
    var data = {
        "current": 1,
        "size": 5,
    }
    ajax("/neo4j/wrdqcydzs/list?" + id + conType + price_min + price_max, 'post', JSON.stringify(data)).then(function (data) {
        var newData = data.obj.records;
        newData.map(data => {
            dat2.push([data.x, data.y, data.wrw]);
        })
        myChart.setOption({
            series: [{
                name: 'choosePoint',
                data: dat2
            }]
        });
    })
}

// 生成解决方案
$('.show-btn').click(function () {
    var url = document.location.toString();
    var arrUrl = url.split("?");
    var para = arrUrl[1];
    // console.log('../html/home.html?'+para)
    window.location.href = '../html/recommendedscheme.html?' + para;
})