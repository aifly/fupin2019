﻿window.imgs = {
  logo: "./assets/images/logo1.png",
  main:'./assets/images/main-bg.jpg',
  play: "./assets/images/play.png",
  play1: "./assets/images/play1.png",
  arrow: "./assets/images/arrow.png",
  point: "./assets/images/point.png",
  waiting: "./assets/images/waiting2.png",
  remark1:'./assets/images/remark1.png',
  remark2:'./assets/images/remark2.png',
  remark3:'./assets/images/remark3.png',
  remark4:'./assets/images/remark4.png',
  remark5:'./assets/images/remark5.png',
 
  title:'./assets/images/title1.png',
  video:"./assets/images/video.png",
  subtitle:"./assets/images/subtitle.png",
  info:"./assets/images/info.png",
  copyright:"./assets/images/copyright.png",
  qrcode:"./assets/images/qrcode.jpg",
  text1:"./assets/images/text_1_2.png",
  text2:"./assets/images/text_2_2.png",
  text3:"./assets/images/text_3_2.png",
  text4:"./assets/images/text_4_2.png",
  text5:"./assets/images/text_5_2.png",
  text6:"./assets/images/text_6_2.png",
  text7:"./assets/images/text_7_2.png",
  text8:"./assets/images/text_8_2.png",
  text9:"./assets/images/text_9_2.png",
  shareBg:'./assets/images/share-bg.jpg',

  text:'./assets/images/text2.png',
  wishBg:'./assets/images/wish-bg1.jpg',
  icon1:'./assets/images/icon1-1.png',
  icon2:'./assets/images/icon2-1.png',
  icon3:'./assets/images/icon3-1.png',
  icon4:'./assets/images/icon4-1.png',
  icon5:'./assets/images/icon5-1.png',
  icon6:'./assets/images/icon6-1.png',
  icon7:'./assets/images/icon7-1.png',
  icon8:'./assets/images/icon8-1.png',
  icon9:'./assets/images/icon9-1.png',
  
  mark1:'./assets/images/mask1-3.jpg',
  mark2:'./assets/images/mask2-3.jpg',
  mark3:'./assets/images/mask3-3.jpg',
  mark4:'./assets/images/mask4-3.jpg',
  huangwenxiu:'./assets/images/huangwenxiu.png',
  xieliang:'./assets/images/xieliang.png',
  yuewenqiu:'./assets/images/yuewenqiu.png',
  guanyanping:'./assets/images/guanyanping.png',
  shareBg1: './assets/images/bg1_5.jpg',
  shareBg2: './assets/images/bg2_5.jpg',
  shareBg3: './assets/images/bg3_5.jpg',
  shareBg4: './assets/images/bg4_5.jpg',
  shareBg5: './assets/images/bg5_5.jpg',
  shareBg6: './assets/images/bg6_5-1.jpg',
  shareBg7: './assets/images/bg7_5.jpg',
  shareBg8: './assets/images/bg8_5.jpg',
  shareBg9: './assets/images/bg9_5.jpg',
  
  //loadingGif:'./assets/images/loading.gif',
  bg:'./assets/images/bg1.jpg',
  share:'./assets/images/share.jpg',

};

 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/6.mp4',
   baseUrl: "https://xlive.xinhuaapp.com",

	host:"https://activity.xhsxmt.com", //正式域名：https://xlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
	anm:'2019扶贫贺卡',
	get_weixinConfig: 'https://open.xinhuaapp.com/xhs-security-wechat/wx/getWXConfig',
   wishes:[
	   {
		   text: "我理解在这个世界上 有人比我更需要你",
		   img:imgs.text1,
		   bg:imgs.shareBg1,
		   icon:imgs.icon1
	   },
	   {
		   text: "感谢你无私的付出让我坚信这世界依然美好",
		   img:imgs.text2,
		   bg:imgs.shareBg2,
		   icon:imgs.icon2
	   },{
		   text: "我不认识你但我想谢谢你",
		   img:imgs.text3,
		   bg:imgs.shareBg3,
		   icon:imgs.icon3
	   },{
		   text: "因为你在那片土地每天都有新变化",
		   img:imgs.text4,
		   bg:imgs.shareBg4,
		   icon:imgs.icon4
	   },{
		   text: "不知如何表达只能道一句珍重辛苦！",
		   img:imgs.text5,
		   bg:imgs.shareBg5,
		   icon:imgs.icon5
	   },{
		   text: "你是凡人亦是英雄",
		   img:imgs.text6,
		   bg:imgs.shareBg6,
		   icon:imgs.icon6
	   },{
		   text: "不忘初心不负荣光",
		   img:imgs.text7,
		   bg:imgs.shareBg7,
		   icon:imgs.icon7
	   },{
		   text: "相隔千里万里远方一直有人给你加油！",
		   img:imgs.text8,
		   bg:imgs.shareBg8,
		   icon:imgs.icon8
	   },  {
		   text: "你说过的话你做过的事有人一辈子记得",
		   img: imgs.text9,
		   bg:imgs.shareBg9,
		   icon:imgs.icon9
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
		src: './assets/music/bg_1.mp3',
		autoplay: true,
		name: 'bg2',
		loop: true
	},
  
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