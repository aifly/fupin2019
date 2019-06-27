<template>
	<div class="lt-full zmiti-main-ui" :class="{'active':show}">
		<div class="zmiti-input-C">
			<div class='zmiti-search-C' :class="{'hide':hideSearchBox}">
				<div class='zmiti-input-main'>
					 
				</div>
			</div>

			<div id='container' class='lt-full'></div>

			<div class='zmiti-mark-list lt-full' :style="{width:viewW+'px',height:viewH+'px'}" v-swipeup='swipeup' v-swipedown='swipedown'  >
				<ul :style="{transform:'translateY('+-(markIndex*viewH)+'px)',height:viewH*markList.length+'px'}">
					<li  v-for='(mark,i) in markList' :key="i" :style="{width:viewW+'px',height:viewH+'px',background:'url('+mark+') no-repeat center 80%',backgroundSize:'cover'}">
						<img style='bottom:10px' :src="imgs.info" alt="">				
					</li>
				</ul>
			</div>
			<transition name='tip'>
				<div :style="{background:'url('+imgs.bg+') no-repeat center center',backgroundSize:'cover'}" :class="{'active':tipActive}" class='zmiti-tip lt-full' v-if='showTip' v-swipeup='hideTip'>
					<img :src="imgs.tip" alt="">
					<img :src="imgs.info" alt="" class="info">
				</div>
			</transition>

			<div class='zmiti-wish-list lt-full' :class="{'active':!showTip}" :style="{background:'url('+imgs.wishBg+') no-repeat center top',backgroundSize:'cover'}">
				<div class='zmiti-wish-text'>
					<img :src="imgs.text" alt="">
				</div>
				<ul>
					<li v-tap='[changeWishItem,i]' :class="{'active':currentWishIndex === i}" v-for='(wish,i) in wishes' :key="i">
						<img :src='wish.icon' />
					</li>
				</ul>
				<div  class='zmiti-wish-btn' v-press>
					<div v-tap='[createWish]'>确定</div>
				</div>
			</div>
			 
			<div class='zmiti-share-ui lt-full' v-if="showShare" :class='{"hide":createImg}'>
				<Share :pv='pv' :obserable='obserable'  :isPage='true' :province='myPositionData.addressComponent.province' :city='myPositionData.addressComponent.city||myPositionData.addressComponent.district'  :index='currentWishIndex'></Share>
			</div>
		 
			<div class='zmiti-createimg-C lt-full'  :style="{background:'url('+imgs.bg+') no-repeat center center',backgroundSize:'cover'}" v-show='showShare'>
				<transition name='create'>
					<div :class="{'opacity':isOpacity}" class='zmiti-createimg' v-if='showCreateImg' :style="{transform:'scale('+scale+')'}">
						<img :src="lastImg" alt="">
						<span>长按保存图片</span>
					</div>
				</transition>
				<div class='zmiti-wish-btns'>
					<div v-press v-tap='[changeWish]'>
						换一张贺卡
					</div>
					<div v-press v-tap='[showMaskPage]'>
						发送祝福
					</div>
				</div>
			</div>

			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask=false'>
				<img :src="imgs.arrow" alt="">
			</div>
		</div>
		
		<Toast :errorMsg='errorMsg' ></Toast>
		 
  	</div>
</template>

<style lang='scss' scoped>
@import "./index.scss";

.zmiti-createimg{
	-webkit-transition:.5s;
	transition:.5s;
}
</style>


<script>
import zmitiUtil from "../lib/util";
import Share from './share';
import Toast from '../toast/toast';
export default {
  props: ["obserable"],
  name: "zmiti-index-page",
  data() {
    return {
		showForm:false,
		isPage:true,
		errorMsg:"",
		imgs: window.imgs,
		showCreateImg:false,
		showShare:false,
		pv:12023,
		isOpacity:false,
		lastImg:'',
		secretKey: "e9469538b0623783f38c585821459454",
		host: window.config.host,
		viewH: window.innerHeight,
		viewW: window.innerWidth,
		showTip:true,
		showMask:false,
		scale:1,
		currentWishIndex:0,
		hideSearchBox:true,
		show:false,
		showTip1:false,
		markIndex:0,
		markList:[
			window.imgs.mark4,
			window.imgs.mark1,
			window.imgs.mark2,
			window.imgs.mark3,
		],
				
		wishes:window.config.wishes,
		showDrag:false,
		fresh:false,
		province:"",
		city:'',
		tipActive:false,
		createMarkers:[],
		createImg:"",
		formUser: {
			username: "",
			pos: "",
			pos1:"请选择收信人的位置",
		},
		sPositionData:{
			addressComponent:{}
		},
		myPositionData:{
			addressComponent:{}
		},
		isFocus:true,

    };
  },
  components: {
	  Share,
	  Toast
  },
  watch:{
	  showShare(val){
		  if(val){
			  setTimeout(() => {
				  this.showCreateImg = true;
			  }, 100);
			  setTimeout(() => {
			  	 this.scale =  .7;
			  }, 2002);
		  }else{
			  this.scale =  1;
			  this.showCreateImg = false;
		  }
	  }
  },

  methods: {
	swipeup(){
		if(this.markIndex>=this.markList.length-1){
			this.markerIndex = this.markList.length -1;
			setTimeout(() => {
				this.tipActive = true;
			}, 400);
		}
		this.markIndex++;
	},
	swipedown(){
		if(this.markIndex <= 0 ){
			return;
		}
		this.markIndex--;
	},
	changeWishItem(index){
		this.currentWishIndex = index;
	},
	changeWish(){
		this.createImg = this.lastImg = '';
		this.showShare = false;
		return;
		this.currentWishIndex++;
		this.currentWishIndex %= this.wishes.length;

		this.showCreateImg = false;
		this.createWish();
	},
	createWish(){
		
		this.showForm = false;
		this.showShare = true;
		this.showCreateImg = true;
		
		setTimeout(() => {
			
			this.obserable.trigger({
				type:'createImg'
			});

			setTimeout(() => {
				if(this.createImg){
					this.isOpacity = true;
					setTimeout(() => {
						this.isOpacity = false;
					}, 500);
				}
			}, 800);
		}, 100);
	},
	
	init(){
		this.formUser ={
			username: "",
			pos: "",
			pos1:"请选择收信人的位置",
		};
		this.showShare = false;
		this.rName = '';
		this.myName = '';
		this.createImg = '';

	},
	showMaskPage(){
		this.showMask = true;
	},
	search(time= 500){
		
	},
	closeTip1(){
		this.showTip1 = false;
	},
	hideTip(){
		this.showTip = false;
		
		return;
		this.createWish();
 
	},
	next(){
		this.showForm = true;
	},
	saveGiftCard(){
		var s = this;
		var {myName,rName,province,wishes,currentWishIndex,sPositionData,myPositionData,createImg} = this;
		var base64 = createImg;
		axios({
		  headers:{
			  'content-type': 'application/json'
		  },
		  method:'post',
		  url:s.host+'/xhs-security-activity/activity/giftcard/saveGiftCard',
		  data:JSON.stringify({
				secretKey: s.secretKey, // 请求秘钥
				anm: window.config.anm,// 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
				source:zmitiUtil.isWeiXin()?0:1,
				sender:myName,
				swnm:"",//微信昵称
				swid:'',
				imgData:base64.replace('data:image/png;base64,',''),
				sLongitudes:myPositionData.position.lng,
				sLatitudes:myPositionData.position.lat,
				sProvince:myPositionData.addressComponent.province,
				sCity:myPositionData.addressComponent.city || myPositionData.addressComponent.district,
				sDistrict:myPositionData.addressComponent.district,
				sStreet:myPositionData.addressComponent.street,
				blessingWords:wishes[currentWishIndex].text,
				gcnm:wishes[currentWishIndex].text,

				/* receiver:rName,
				rwnm:"",
				rLongitudes:myPositionData.position.lng,
				rLatitudes:myPositionData.position.lat,
				rProvince:myPositionData.addressComponent.province,
				rCity:myPositionData.addressComponent.city || myPositionData.addressComponent.district,
				rDistrict:myPositionData.addressComponent.district,
				rStreet:myPositionData.addressComponent.street, */


			})
		  }).then((data)=>{
			  var dt;
			if(typeof data.data === 'string'){
				dt = JSON.parse(data.data);
			}else{
				dt = data.data;
			}
			console.log(dt,'dt....');
			if(dt.rc*1 === 0){
				var cardid = dt.data.id;//获取到的贺卡的id.
				var url = window.location.href.split('#')[0];
				url = zmitiUtil.changeURLPar(url,'id',cardid);
				//
				zmitiUtil.wxConfig('这是发往脱贫一线的第'+s.pv+'份祝福','这这是发往脱贫一线的第'+s.pv+'份祝福',url);
			}
			else{
				console.log(dt,'保存接口出错了');
			}
		  })
		
	},
	getAllPoints(){
		var s = this;
		axios({
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				url: s.host + "/xhs-security-activity/activity/giftcard/getAllGiftCardPoints",
				data: JSON.stringify({
					secretKey: window.config.secretKey,  // 请求秘钥(string, 必填)
					///anm: window.config.anm // 活动标识（string, 必填）
				})
			}).then(data => {
				var dt = data.data;
				if (typeof dt === "string") {
					dt = JSON.parse(dt);
					
					if(dt.rc*1 === 0){
						s.points = dt.data.points.filter(item=>{
							return item.slat && item.slgt && item.rlat &&　item.rlgt;
						});
						console.log(s.points)
						//s.createPoint();
						////console.log(dt.data.points);
					}
					
				}
			});
	},
   
	removePoint(){
		var {map } = this;
		var s = this;

		this.createMarkers.forEach((c,i)=>{
			map.remove(c);
			this.createMarkers.splice(i,1)
		});
		this.searchMarkers.forEach((c,i)=>{
			map.remove(c);
			this.searchMarkers.splice(i,1)
		});
		
	},
	createPoint(){

		
		var {map } = this;
		var s = this;

		
		this.points.forEach((p)=>{
			var pos = {
				P: p.slat*1,
				Q: p.slgt*1,
				lat: p.slat*1,
				lng: p.slgt*1
			};
			var pos1 = {
				P: p.rlat*1,
				Q: p.rlgt*1,
				lat: p.rlat*1,
				lng: p.rlgt*1
			};

			this.createMarkers.push(new AMap.Marker({
                position: pos,
				map: map,
				icon:new AMap.Icon({            
		            image: s.imgs.marker,
		            size: new AMap.Size(52, 52),  //图标大小
		            imageSize: new AMap.Size(26,26)
		        })
			}),new AMap.Marker({
                position: pos1,
				map: map,
				icon:new AMap.Icon({            
		            image: s.imgs.marker,
		            size: new AMap.Size(52, 52),  //图标大小
		            imageSize: new AMap.Size(26,26)
		        })
			}))
		
			
		
			
		})
	},
 
    initPos(c='container') {
		var map = new AMap.Map(c, {
			resizeEnable: true,
			zoom:12
		});
		this.map = map;
		

		var s = this;
		if(c === 'container'){
			map.plugin("AMap.Geolocation", function() {
				var geolocation = new AMap.Geolocation({
				// 是否使用高精度定位，默认：true
				enableHighAccuracy: true,
				// 设置定位超时时间，默认：无穷大
				timeout: 10000,
				// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
				buttonOffset: new AMap.Pixel(10, 20),
				//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				zoomToAccuracy: true,
				//  定位按钮的排放位置,  RB表示右下
				buttonPosition: "RB",
				});
	
				geolocation.getCurrentPosition();
				AMap.event.addListener(geolocation, "complete", data=>{
					 
					 s.myPositionData  = data;
					 
					 s.formUser[c==='container'? 'pos':'pos1'] = data.formattedAddress;
					 var gps = [data.position.lng,data.position.lat];
					 s.p1 = gps;
			 
				});
				AMap.event.addListener(geolocation, "error", data=>{
					console.log("获取位置出错了");	
				});　
			});
		}

		return;
	
		var s = this;

		var {placeSearch} = this;

		var mouse = {
			x:0,
			y:0
		};
		var time = 0;
	  	AMap.event.addListener(map, "touchstart", function(e) {

			mouse = e.pixel;
			time = new Date().getTime();
		});
		

		AMap.event.addListener(map,'touchend',(e)=>{
			var mouse1 = e.pixel;
			var disTime = new Date().getTime() -  time;
			var dis =  Math.sqrt(Math.pow((mouse1.x - mouse.x),2) + Math.pow((mouse1.y - mouse.y),2));
			if(dis < 5 && disTime<= 200){
				time = 0;
				if(s.marker){
					map.remove(s.marker);
				}
				s.marker = new AMap.Marker({
					position: e.lnglat,
					map: map
				})
			
				
				var gps = [e.lnglat.lng,e.lnglat.lat];
				s.showNextBtn = true;
	
				s.searchMarkers.forEach((marker,i)=>{
					map.remove(marker);
					s.searchMarkers.splice(i,1);
				})
				
					
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});
			
				geocoder.getAddress(gps, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						
						s.sPositionData = result.regeocode;
						s.sPositionData.position = e.lnglat;
						var address = result.regeocode.formattedAddress; //返回地址描述
						
							s.formUser.pos1 = address;
							s.keyword = address;
					}
				});

			}

		})
	},
	getPv(){
		var s = this;
		var data = {
			secretKey: s.secretKey, // 请求秘钥
			nm: window.config.anm // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口
		};

		axios({
			headers: {
				'content-type': 'application/json'
			},
			method: 'post',
			url: s.host + "/xhs-security-activity/activity/num/getNum",
			data: JSON.stringify(data)
		}).then(data => {
			var dt = data.data;
			if (typeof dt === "string") {
				dt = JSON.parse(dt);
				if(typeof data.data === 'string'){
					var res = JSON.parse(data.data);
					s.pv = res.data.num;
					zmitiUtil.wxConfig(document.title,'这是发往脱贫战场的第'+s.pv+'份祝福');
				}
			}
		});
	}
	
	
  },
  mounted() { 
	  this.getPv();
	  this.initPos();
	  this.getAllPoints();
	  var {obserable} = this;
	  obserable.on('getCreateImg',data=>{
		  this.createImg = data;
		  this.lastImg = data;
		  this.saveGiftCard();
	  });

	  obserable.on('showMain',()=>{
		  this.show = true;
		  
		 
	  });
	 
  }
};
</script>