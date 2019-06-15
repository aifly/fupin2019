﻿window.imgs = {
  logo: "./assets/images/logo1.png",
  main:'./assets/images/main-bg.jpg',
  play: "./assets/images/play.png",
  arrow: "./assets/images/arrow.png",
  play1:'./assets/images/play1.png',
  tip:'./assets/images/tip.png',
  title:'./assets/images/title.png',
  marker:"./assets/images/marker.png",
  search:"./assets/images/search.png",
  drag:"./assets/images/drag.png",
  subtitle:"./assets/images/subtitle.png",
  refresh:"./assets/images/refresh.png",
  heart:"./assets/images/heart.png",
  qrcode:"./assets/images/qrcode.png",
  text1:"./assets/images/text1.png",
  text2:"./assets/images/text2.png",
  text3:"./assets/images/text3.png",
  text4:"./assets/images/text4.png",
  text5:"./assets/images/text5.png",
  text6:"./assets/images/text6.png",
  text7:"./assets/images/text7.png",
  text8:"./assets/images/text8.png",
  shareBg:'./assets/images/share-bg.jpg',
  share:'./assets/images/share.jpg',
  

};

 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/1.mp4',
   baseUrl: "https://testxlive.xinhuaapp.com",

   host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
	 anm:'2019扶贫贺卡',
	 get_weixinConfig: 'https://testopen.xinhuaapp.com/xhs-security-wechat/wx/getWXConfig',
   wishes:[
	   {
		   text:"奋斗在一线的你，用生命书写时代赞歌",
		   img:imgs.text1
	   },
	   {
		   text: "扶贫路上你最美",
		   img:imgs.text2
	   },{
		   text: "扶贫路上感谢有你",
		   img:imgs.text3
	   },{
		   text: "平凡之中透出伟大，细节之处彰显精神",
		   img:imgs.text4
	   },{
		   text: "在平凡工作岗位上，展现出自己光彩的人生价值",
		   img:imgs.text5
	   },{
		   text: "书写无愧于时代的新荣光，不负人民，不负时代！",
		   img:imgs.text6
	   },{
		   text: "翻过一山又一山，山山水水脚量勘",
		   img:imgs.text7
	   },{
		   text: "帮穷济困解民难，风雨兼程多少累，扶贫事业驻心间，几多辛苦几多甜",
		   img:imgs.text8
	   }
   ],
   points:[
	   {
		   "slgt": "116.401969", //
		   "slat": "39.929101", // 
		   "rlgt": "116.558346", //
		   "rlat": "39.995021" // 
	   }, {
		   "slgt": "117.057948", //
		   "slat": "39.697209", // 
		   "rlgt": "118.233075", //
		   "rlat": "40.340822" // 
	   }, {
		   "slgt": "116.239268", //
		   "slat": "38.588702", // 
		   "rlgt": "114.643303", //
		   "rlat": "36.812731" // 
	   },
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