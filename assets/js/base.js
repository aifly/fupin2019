﻿window.imgs = {
  logo: "./assets/images/logo1.png",
  logo2: "./assets/images/logo2.png",
  point: "./assets/images/point.png",
  play: "./assets/images/play.png",
  arrow: "./assets/images/arrow.png",
  play1:'./assets/images/play1.png',
  get:'./assets/images/get.png',
  time:'./assets/images/time5.png',
  title:'./assets/images/title3.png',
  right:'./assets/images/right.png',
  error:'./assets/images/error.png',
  share:'./assets/images/share.png',
  begin:'./assets/images/begin.png',
  passed:'./assets/images/passed.png',
  result:'./assets/images/result1.png',
  star:'./assets/images/star.png',
  restart:'./assets/images/restart.png',
  teamBtn:'./assets/images/team-btn.png',
  waiting:'./assets/images/waiting.png',
  //entry:'./assets/images/entry.png',
  zipcode:'./assets/images/zipcode.png',
  index:'./assets/images/index.jpg',
  loading:'./assets/images/loading1.jpg',
  main:'./assets/images/main-bg.jpg',

  team:'./assets/images/team1.jpg',
  
  wangjiaqi:'./assets/images/wangjiaqi.jpg',
  hejianhua:'./assets/images/hejianhua.jpg',
  hukeyi:'./assets/images/hukeyi.jpg',
  wangjianyu:'./assets/images/wangjianyu.jpg',
  wuguanghui:'./assets/images/wuguanghui.jpg',
  luojun:'./assets/images/luojun.jpg',

  _luojun:'./assets/images/_luojun.jpg',
  _wangjiaqi:'./assets/images/_wangjiaqi.jpg',
  _hejianhua:'./assets/images/_hejianhua.jpg',
  _hukeyi:'./assets/images/_hukeyi.jpg',
  _wangjianyu:'./assets/images/_wangjianyu.jpg',
  _wuguanghui:'./assets/images/_wuguanghui.jpg',
  xinmeiti:'./assets/images/xinmeiti.jpg',

};


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/index3.mp4',
   indexvideo1: './assets/video/index3.mp4',
   baseUrl: "https://testxlive.xinhuaapp.com",
   host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
   questionList:[
      {
        name:"新华社客户端",
        position:'国家通讯社实时发布、国内外重大新闻平台',
        img:imgs.xinmeiti,
        headimgurl:imgs.logo,
        qTitle:"最近特别流行的一部科幻电影是什么？",
        answers:[
          {name:'《流浪地球》',isRight:true},
          {name:'《流浪月球》',isRight:false},
          {name:'《流浪太阳》',isRight:false}
        ],
        rAnswer:0,
        remark:'你以为我们的题目这么简单吗？那只是测试！现在正式开始！本测试只有6关！' 
      },
      {
        name:"何建华",
        position:'全国政协委员、“上海光源”二期总工程师',
        img:imgs._hejianhua,
        headimgurl:imgs.hejianhua,
        qTitle:"照亮原子分子的世界，需要用什么光？",
        answers:[{name:'可见光',isRight:false},{name:'红外激光',isRight:false},{name:'X光',isRight:true}],
        rAnswer:2,
        remark:'由于原子分子的大小在纳米尺度，能看清原子分子结构的光波长需要小于1纳米，这是X光才能达到的波长。'
      },
      {
        name:"王建宇",
        position:'全国人大代表、“墨子号”量子科学实验卫星总指挥、中国科学院院士',
        img:imgs._wangjianyu ,
        headimgurl:imgs.wangjianyu ,
        qTitle:"在地球上看月球背面，多久能看到一次？",
        answers:[
          {name:'每月能看到一次',isRight:false},
          {name:'每天能看到一次',isRight:false},
          {name:'永远也看不到',isRight:true}
        ],
        rAnswer:2,
        remark:'由于月球绕地球公转和月球自转的周期一致，所以从地球上永远看不到月球背面。'
      },
      {
        name:"吴光辉",
        position:'全国人大代表、国产大型客机C919总设计师、中国工程院院士',
        img:imgs._wuguanghui,
        headimgurl:imgs.wuguanghui,
        qTitle:"国产大型客机C919的零部件数是什么量级？",
        answers:[
          {name:'数百万 ',isRight:true},
          {name:'数千万',isRight:false},
          {name:'数十万',isRight:false}
        ],
        rAnswer:0,
        remark:'我国国产大型客机C919有数百万个零部件。'
      },
      {
        name:"胡可一",
        position:'全国政协委员、中船集团江南造船总工程师',
        img:imgs._hukeyi,
        headimgurl:imgs.hukeyi,
        qTitle:"以下以哪种动物命名的船舶能够破冰？",
        answers:[{name:'雪龙',isRight:true},{name:'雪豹',isRight:false},{name:'雪蛤',isRight:false}],
        rAnswer:0,
        remark:'“雪龙2”号是我国首艘自主建造的极地科学考察破冰船，已于2018年下水。'
      },{
        name:"王家骐",
        position:'全国人大代表、中科院长春光机所研究员、中国科学院院士',
        img:imgs._wangjiaqi,
        headimgurl:imgs.wangjiaqi,
        qTitle:"高分六号卫星可实现大幅宽观测，一次拍下的图片最大宽度能超过多少公里？",
        answers:[{name:'30公里',isRight:false},{name:'100公里',isRight:false},{name:'800公里',isRight:true}],
        rAnswer:2,
        remark:'高分六号卫星一次可观测地面最大宽度超过800公里。'
      },{
        name:"罗俊",
        position:'全国人大代表、“天琴计划”首席科学家、中国科学院院士',
        img:imgs._luojun,
        headimgurl:imgs.luojun,
        qTitle:"如果万有引力常数G突然变小，地球会？",
        answers:[{name:'奔向太阳 ',isRight:false},{name:'远离太阳、甚至开启流浪模式',isRight:true},{name:'原轨道不变',isRight:false}],
        rAnswer:1,
        remark:'地球围绕太阳运动存在离心力，万有引力常数G突然变小时，地球和太阳之间的万有引力也随之变小，离心力会使地球远离太阳，直到离心力与万有引力重新达到平衡。'
      }
   ]
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg2.mp3',
		autoplay: false,
		name: 'bg2',
		loop: true
	},
  alert: {
    src: './assets/music/alert.mp3',
    autoplay: true,
    name: 'alert',
  },
  error: {
    src: './assets/music/error.mp3',
    autoplay: true,
    name: 'error',
  },
  right: {
    src: './assets/music/right.mp3',
    autoplay: true,
    name: 'right',
  }
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();