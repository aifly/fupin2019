<template>
	<div class="lt-full zmiti-main-ui" :class="{'active':show}">
		<div class="zmiti-input-C">
			<div class='zmiti-search-C' :class="{'hide':hideSearchBox}">
				<div class='zmiti-input-main'>
					<input ref='search' placeholder="搜索扶贫位置" class="zmiti-input" @change='search' v-model="keyword">
					<div v-tap='[search,0]'>
						<img :src="imgs.search" alt="">
					</div>
				</div>
			</div>

			<div id='container' class='lt-full'></div>

			<div class='zmiti-tip lt-full' v-if='showTip' v-tap='[hideTip]'>
				<img :src="imgs.tip" alt="">
			</div>
			<div class='zmiti-tip lt-full' v-if='showTip1' v-tap='[closeTip1]'>
				<template v-if='showDrag'>
					<img :src="imgs.drag" alt="">
					<div class='zmiti-tip-text'>可拖动放大地图后点击定位</div>
				</template>
			</div>

			<transition name='form'>
				<div class='zmiti-wish-C' v-if='showForm'>
					<div class='zmiti-input-name'>
						<input @blur='blur' @focus='focus' type="text" v-model="rName" placeholder="请输入他的名字">
					</div>
					<div class='zmiti-wish-text'>
						{{wishes[currentWishIndex].text}}
					</div>
					<div class='zmiti-input-name'>
						<input @blur='blur' @focus='focus' type="text" v-model="myName" placeholder="请输入我的名字">
					</div>
					<div class='zmiti-wish-btns'>
						<div v-press v-tap='[changeWish]'>
							<img :class="{'rotate':fresh}" :src="imgs.refresh" alt="">换祝福语
						</div>
						<div v-press v-tap='[createWish]' :class="{'active':!isFocus}" >
							<img :src="imgs.heart" alt="">生成贺卡
						</div>
					</div>
				</div>
			</transition>

			<div class='zmiti-share-ui lt-full' v-if="!createImg && showShare">
				<Share :obserable='obserable' :rName='rName' :province='myPositionData.addressComponent.province' :city='myPositionData.addressComponent.city' :myName='myName' :index='currentWishIndex'></Share>
			</div>


			<Share :obserable='obserable' :rName='rName' v-if='!createImg && showShare' :isPage='isPage' :province='myPositionData.addressComponent.province' :city='myPositionData.addressComponent.city' :myName='myName' :index='currentWishIndex'></Share>

			<div class='zmiti-createimg-C lt-full' v-if='showShare'>
				<div class='zmiti-createimg' :style="{webkitTransform:'scale('+viewH/750+')'}">
					<img :src="createImg" alt="">
					<span>长按保存图片</span>
				</div>
				<div class='zmiti-wish-btns'>
					<div v-press v-tap='[init]'>
						再次送祝福
					</div>
					<div v-press v-tap='[showMaskPage]'>
						发送祝福
					</div>
				</div>
			</div>
			<section v-tap='[next]' v-press class='zmiti-next-btn' v-if='showNextBtn'>下一步</section>

			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask=false'>
				<img :src="imgs.arrow" alt="">
			</div>
		</div>

		 
  	</div>
</template>

<style lang='scss' scoped>
@import "./index.scss";

</style>


<script>
import zmitiUtil from "../lib/util";
import Share from './share';
export default {
  props: ["obserable"],
  name: "zmiti-index-page",
  data() {
    return {
		showForm:false,
		isPage:true,
		imgs: window.imgs,
		showShare:false,
		secretKey: "e9469538b0623783f38c585821459454",
		host: window.config.host,
		viewH: window.innerHeight,
		viewW: window.innerWidth,
		showTip:true,
		showMask:false,
		currentWishIndex:0,
		hideSearchBox:true,
		show:false,
		showTip1:false,
		keyword:'',
		showNextBtn:false,
		wishes:window.config.wishes,
		provinceList:[],
		showDrag:false,
		rName:'',
		myName:'',
		step:0,
		p1:[],
		p2:[],
		p3:[],
		p4:[],
		points:window.config.points,
		searchMarkers:[],
		fresh:false,
		province:"",
		city:'',
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
	  Share
  },
  watch:{
	  rName(val){
		  
		  this.isFocus = val && this.myName;
	  },
	  myName(val){
		  this.isFocus = val && this.rName;
	  },
	  showForm(val){
		  if(val){
			  setTimeout(() => {
				  this.isFocus = false;
			  }, 1000);
		  }
	  }
  },

  methods: {
	changeWish(){
		this.fresh = true;
		clearTimeout(this.freshTimer);
		this.freshTimer =setTimeout(() => {
			this.currentWishIndex = (Math.random()*this.wishes.length )| 0;
			this.fresh = false;
		}, 500);
	},
	createWish(){
		if(this.rName && this.myName){
			this.showForm = false;
			this.showShare = true;
			setTimeout(() => {
				this.obserable.trigger({
					type:'createImg'
				});
			}, 1000);
		}
	},
	focus(){
		window.scrollTo(0,300);
		
	},
	blur(){
		window.scrollTo(0,0);
		
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
		var {map,keyword} = this;
		var s =this;
		if(!keyword){
			return;
		}
		clearTimeout(this.searchTimer);

		this.$refs['search'].blur();
		
		this.searchTimer = setTimeout(() => {
				
			map.remove(s.myMarker);

			var placeSearch = new AMap.PlaceSearch({
			// city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
				city: keyword
			})
			s.placeSearch = placeSearch;
		
			placeSearch.search(keyword, function (status, result) {
		// 查询成功时，result即对应匹配的POI信息
	 
				var pois = result.poiList.pois;
				var positions = [];
				for(var i = 0; i < pois.length; i++){
					var poi = pois[i];
					var marker = [];
					marker[i] = new AMap.Marker({
						position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: poi.name,
					});
					positions.push([
						poi.location.lng,
						poi.location.lat,
					])
				
					map.add(marker[i])
					s.searchMarkers.push(marker[i]);
				}

				//s.removePoint();
				s.showNextBtn = false;
		
				var polygon = new AMap.Polygon({
					path : positions,  //以5个点的坐标创建一个隐藏的多边形
					map:map,
					strokeOpacity:0,//透明
					fillOpacity:.4,//透明
					bubble:true//事件穿透到地图
				});
				var overlaysList = map.getAllOverlays('polygon');//获取多边形图层
				//
				try{
					map.clearMap();
					map.setFitView(overlaysList);
				}catch(e){

				}
				setTimeout(() => {
					s.createPoint();
				}, 1000);

			})
		}, time);
	},
	closeTip1(){
		this.showTip1 = false;
	},
	hideTip(){
		this.showTip = false;
		var time = 2000;//1000
		var p = new Promise((resolve,reject)=>{

			setTimeout(() => {
				this.hideSearchBox = false;
				this.showTip1 = true;
				resolve();
			}, 500);
		}).then(()=>{

			return new Promise((resolve,reject)=>{
				setTimeout(() => {
					this.showDrag = true;
					resolve();
				}, time);
			})
		}).then(()=>{
			setTimeout(() => {
				this.showTip1 = false;
			}, time*2);
		})
	},
	next(){
		this.showForm = true;
	},
	saveGiftCard(){
		var s = this;
		var {myName,rName,province,wishes,currentWishIndex,sPositionData,myPositionData} = this;
		axios.post(s.host+'/xhs-security-activity/activity/giftcard/saveGiftCard',JSON.stringify({
			secretKey: s.secretKey, // 请求秘钥
			anm: window.config.anm,// 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
			source:zmitiUtil.isWeiXin()?0:1,
			sender:myName,
			swnm:"",//微信昵称
			swid:'',
			sLongitudes:sPositionData.position.lng,
			sLatitudes:sPositionData.position.lat,
			sProvince:sPositionData.addressComponent.province,
			sCity:sPositionData.addressComponent.city || sPositionData.addressComponent.district,
			sDistrict:sPositionData.addressComponent.district,
			sStreet:sPositionData.addressComponent.street,
			blessingWords:wishes[currentWishIndex].text,

			receiver:rName,
			rwnm:"",
			rLongitudes:myPositionData.position.lng,
			rLatitudes:myPositionData.position.lat,
			rProvince:myPositionData.addressComponent.province,
			rCity:myPositionData.addressComponent.city || myPositionData.addressComponent.district,
			rDistrict:myPositionData.addressComponent.district,
			rStreet:myPositionData.addressComponent.street,


		})).then(data=>{
			if(typeof data === 'string'){
				data = JSON.parse(data);
			}
			if(data.rc*1 === 0){

				var cardid = data.data.id;//获取到的贺卡的id.
				var url = window.location.href.split('#')[0];
				url = zmitiUtil.changeURLPar(url,'id',cardid);
				zmitiUtil.wxConfig(document.title,document.title,url);

			}
		});
	},
    updatePv() {
	  var s = this;
	 
		
		var data = {
          secretKey : s.secretKey, // 请求秘钥
          anm: window.config.anm // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口
		};
		/* console.log(JSON.stringify(data));

		$.ajax({
			type:'get',
			dataType:'json',
			url:s.host + "/xhs-security-activity/activity/num/updateNum",
			data:JSON.stringify(data),
			success(data){
				console.log(data);
			}
		});
		return; */
	  axios({
		  method:'post',
		  headers:{
			  "content-type":'application/json',
		  },
		  url:s.host + "/xhs-security-activity/activity/num/updateNum",
		  data
	  }).then(data=>{
		  var dt = data.data;
          if (typeof dt === "string") {
            dt = JSON.parse(dt);
          }
          console.log(dt);
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
					 map.setCenter(data.position);
					 s.p1 = gps;
					 
					 
					 
					 var  marker = new AMap.Marker({
						position: data.position,
						map: map,
						//icon:s.imgs.marker
					})
					s.myMarker = marker;
				});
				AMap.event.addListener(geolocation, "error", data=>{
					console.log("获取位置出错了");	
				});　
			});
		}
	
		var s = this;

		var {placeSearch} = this;

	  	this.clickListener = AMap.event.addListener(map, "click", function(e) {

			   
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
			
			
			 if(c === 'container1'){//第二次取位置
			  	s.p4 = gps;
				var disLng = Math.abs(s.p4[0] - s.p1[0]) / 3;
				var disLat = Math.abs(s.p4[1] - s.p1[1]) / 3;
				s.p2[0] = Math.min(s.p1[0],s.p4[0])+disLng; 
				s.p2[1] = Math.min(s.p1[1],s.p4[1])+disLat; 
			  

				s.p3[0] = Math.min(s.p1[0],s.p4[0])+disLng*2; 
				s.p3[1] = Math.min(s.p1[1],s.p4[1])+disLat*2; 

				s.points = [
					new AMap.LngLat(s.p1[0],s.p1[1]),
					new AMap.LngLat(s.p2[0],s.p2[1]),
					new AMap.LngLat(s.p3[0],s.p3[1]),
					new AMap.LngLat(s.p4[0],s.p4[1]),
				];
				//s.initMap();
			 }
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
        });
	},
	
  },
  mounted() {
	  this.updatePv();
	  this.initPos();
	  var {obserable} = this;
	  obserable.on('getCreateImg',data=>{
		  this.createImg = data;
		  this.saveGiftCard();
	  });

	  obserable.on('showMain',()=>{
		  this.show = true;
	  });
	 
  }
};
</script>