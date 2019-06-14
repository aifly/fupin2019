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
  refresh:"./assets/images/refresh.png",
  heart:"./assets/images/heart.png",
  

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
   wishes:[
	   {
		   text:"奋斗在一线的你，用生命书写时代赞歌。",
	   },
	   {
		   text: "扶贫路上你最美。"
	   },{
		   text: "扶贫路上感谢有你。"
	   },{
		   text: "平凡之中透出伟大，细节之处彰显精神。"
	   },{
		   text: "在平凡工作岗位上，展现出自己光彩的人生价值。"
	   },{
		   text: "书写无愧于时代的新荣光，不负人民，不负时代！"
	   },{
		   text: "翻过一山又一山，山山水水脚量勘。"
	   },{
		   text: "帮穷济困解民难，风雨兼程多少累，扶贫事业驻心间，几多辛苦几多甜。"
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