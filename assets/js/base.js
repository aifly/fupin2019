﻿window.imgs = {
  logo: "./assets/images/logo1.png",
  main:'./assets/images/main-bg.jpg',
  play: "./assets/images/play.png",
  arrow: "./assets/images/arrow.png",
  tip:'./assets/images/tip2.png',
  title:'./assets/images/title1.png',
  video:"./assets/images/video.png",
  qrcode:"./assets/images/qrcode.png",
  text1:"./assets/images/text_1_1.png",
  text2:"./assets/images/text_2_1.png",
  text3:"./assets/images/text_3_1.png",
  text4:"./assets/images/text_4_1.png",
  text5:"./assets/images/text_5_1.png",
  text6:"./assets/images/text_6_1.png",
  text7:"./assets/images/text_7_1.png",
  text8:"./assets/images/text_8_1.png",
  text9:"./assets/images/text_9_1.png",
  shareBg:'./assets/images/share-bg.jpg',
  
  shareBg1: './assets/images/bg1-2.jpg',
  shareBg2: './assets/images/bg2-2.jpg',
  shareBg3: './assets/images/bg3-2.jpg',
  shareBg4: './assets/images/bg4-2.jpg',
  shareBg5: './assets/images/bg5-2.jpg',
  shareBg6: './assets/images/bg6-2.jpg',
  shareBg7: './assets/images/bg7-2.jpg',
  shareBg8: './assets/images/bg8-2.jpg',
  shareBg9: './assets/images/bg9-2.jpg',
  
  loadingGif:'./assets/images/loading.gif',
  share:'./assets/images/share.jpg',
  
  

};

 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/index1.mp4',
   baseUrl: "https://testxlive.xinhuaapp.com",

	 host:"https://testactivity.xhsxmt.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
	 anm:'2019扶贫贺卡',
	 get_weixinConfig: 'https://testopen.xinhuaapp.com/xhs-security-wechat/wx/getWXConfig',
   wishes:[
	   {
		   text: "扶贫路上你最美",
		   img:imgs.text1,
		   bg:imgs.shareBg1
	   },
	   {
		   text: "我理解你的每一滴眼泪每一个脚印谢谢你的付出",
		   img:imgs.text2,
		   bg:imgs.shareBg2
	   },{
		   text: "你是凡人亦是英雄",
		   img:imgs.text3,
		   bg:imgs.shareBg3
	   },{
		   text: "因为你在那片土地每天都有新变化",
		   img:imgs.text4,
		   bg:imgs.shareBg4
	   },{
		   text: "希望你能平安健康一切顺利",
		   img:imgs.text5,
		   bg:imgs.shareBg5
	   },{
		   text: "我知道在这个世界上有人比我更需要你",
		   img:imgs.text6,
		   bg:imgs.shareBg6
	   },{
		   text: "不忘初心不负荣光",
		   img:imgs.text7,
		   bg:imgs.shareBg7
	   },{
		   text: "既然选择远方就注定风雨兼程加油！",
		   img:imgs.text8,
		   bg:imgs.shareBg8
	   },  {
		   text: "你说过的话你做过的事有人一辈子记得",
		   img: imgs.text9,
		   bg: imgs.shareBg9
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