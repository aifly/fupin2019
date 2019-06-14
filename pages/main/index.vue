<template>
	<div class="lt-full zmiti-index-main-ui">
		<div class="zmiti-input-C" v-if='step === 0'>
			<div class='zmiti-search-C'>
				<input class="zmiti-input" @change='search' v-model="keyword">
				<div>搜索</div>

				<section>
					{{formUser.pos1}}
				</section>
			</div>

			<div id='panel'></div>
			
			<div id='container' class='lt-full'></div>

			<div class='zmiti-tip lt-full' v-if='showTip' v-tap='[hideTip]'>
				<img :src="imgs.tip" alt="">
			</div>

			 
			<section v-tap='[next]' v-press class='zmiti-next-btn'>下一步</section>
		</div>

		 
  	</div>
</template>

<style lang='scss' scoped>
@import "./index.scss";

</style>


<script>
import zmitiUtil from "../lib/util";
export default {
  props: ["obserable"],
  name: "zmiti-index-page",
  data() {
    return {
		imgs: window.imgs,
		secretKey: "e9469538b0623783f38c585821459454",
		host: window.config.host,
		viewH: window.innerHeight,
		viewW: window.innerWidth,
		showTip:true,
		keyword:'',
		polygons:[],
		provinceList:[],
		step:0,
		cityList:[],
		districtList:[],
		streetList:[],
		p1:[],
		p2:[],
		p3:[],
		p4:[],
		points :[
		/* 	new AMap.LngLat(116.400433, 39.908084),
			new AMap.LngLat(113.52412, 34.777709),
			new AMap.LngLat(108.821972, 34.270829),
			new AMap.LngLat(104.067108, 30.65769) */
		],

		streetObj:-1,
		districtObj:-1,
		provinceObj:-1,
		cityObj:-1,

		formUser: {
			username: "",
			pos: "",
			pos1:"请选择收信人的位置",
		}
    };
  },
  components: {},

  methods: {

	search(){
		var {map,keyword} = this;
		var s =this;
		if(!keyword){
			document.getElementById('panel').innerHTML = '';
			return;
		}
		clearTimeout(this.searchTimer);
		this.searchTimer = setTimeout(() => {
				

			var placeSearch = new AMap.PlaceSearch({
			// city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
				city: keyword
			})
			s.placeSearch = placeSearch;

		

			placeSearch.search(keyword, function (status, result) {
		// 查询成功时，result即对应匹配的POI信息
	 
			var pois = result.poiList.pois;
				for(var i = 0; i < pois.length; i++){
					var poi = pois[i];
					var marker = [];
					marker[i] = new AMap.Marker({
						position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: poi.name,
						//content:"122344"
						//icon:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
					});
					//marker[i].setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
				/* 	marker[i].on('touchstart',function(e){
						this.setIcon(s.imgs.marker)
							console.log(e,'marker')
						})
					// 将创建的点标记添加到已有的地图实例：
					*/
					map.add(marker[i])
					
					
				}
				map.setFitView();

			})
			


			 
		}, 500);
	},

	hideTip(){
		this.showTip = false;
	},
	next(){
		this.step++;
		this.initPos('container1');
	},
    updatePv() {
      var s = this;
      axios
        .post(s.host + "/xhs-security-activity/activity/num/updateNum", {
          secretKey: s.secretKey, // 请求秘钥
          nm: "fupin2019" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
        })
        .then(function(data) {
          var dt = data.data;
          if (typeof dt === "string") {
            dt = JSON.parse(dt);
          }
          console.log(dt);
        });
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
					 s.formUser[c==='container'? 'pos':'pos1'] = data.formattedAddress;
					 var gps = [data.position.lng,data.position.lat];
					 map.setCenter(data.position);
					 s.p1 = gps;
					 var  marker = new AMap.Marker({
						position: data.position,
						map: map,
						//icon:s.imgs.marker
					})
				});
				AMap.event.addListener(geolocation, "error", data=>{
					console.log("获取位置出错了");	
				});　
			});
		}
	
		var s = this;

		var {placeSearch} = this;

	  	this.clickListener = AMap.event.addListener(map, "touchstart", function(e) {

			   
		   if(s.marker){
			   map.remove(s.marker);
		   }
            s.marker = new AMap.Marker({
                position: e.lnglat,
                map: map
			})
		
			var gps = [e.lnglat.lng,e.lnglat.lat];
			
			 s[c==='container'?'p1':'p4'] = gps;
			
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
						var address = result.regeocode.formattedAddress; //返回地址描述
						
						 s.formUser.pos1 = address;
						
					
					}
				});
        });
	},
	initMap(){
		/**
		 * new AMap.LngLat(116.400433, 39.908084),
			new AMap.LngLat(113.52412, 34.777709),
			new AMap.LngLat(108.821972, 34.270829),
			new AMap.LngLat(104.067108, 30.65769)
		 */
		var {computeBezier,getEllipseHeight,points,p1, p2,p3, p4} = this;

		var dis = AMap.GeometryUtil.distance(p1, p4);
		var map = new AMap.Map('smap', {
			center: [(p1[0]+p2[0]+p3[0]+p4[0])/4, (p1[1]+p2[1]+p3[1]+p4[1])/4],
			zoom: -dis/1000/750+7.6,
			viewMode: '3D',
			pitch: 40
			
		});
		
		
		var object3Dlayer = new AMap.Object3DLayer();
		var numberOfPoints = 180;
		var minHeight = 20;

		var meshLine = new AMap.Object3D.MeshLine({
			path: computeBezier(points, numberOfPoints, minHeight),
			height: getEllipseHeight(numberOfPoints, 2000000, minHeight),
			color: 'rgba(55,129,240, 0.9)',
			width: 5
		});

		meshLine.transparent = true;
		object3Dlayer.add(meshLine);
		meshLine['backOrFront'] = 'both';
		map.add(object3Dlayer);
	},
	pointOnCubicBezier(cp,t){
  		var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;

        cx = 3.0 * (cp[1].lng - cp[0].lng);
        bx = 3.0 * (cp[2].lng - cp[1].lng) - cx;
        ax = cp[3].lng - cp[0].lng - cx - bx;

        cy = 3.0 * (cp[1].lat - cp[0].lat);
        by = 3.0 * (cp[2].lat - cp[1].lat) - cy;
        ay = cp[3].lat - cp[0].lat - cy - by;

        tSquared = t * t;
        tCubed = tSquared * t;

        var lng = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].lng;
        var lat = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].lat;

        return new AMap.LngLat(lng, lat);
	},
	computeBezier(points, numberOfPoints){

 		var dt;
        var i;
		var curve = [];
		var {pointOnCubicBezier}=  this;

        dt = 1.0 / (numberOfPoints - 1);

        for (i = 0; i < numberOfPoints; i++) {
            curve[i] = pointOnCubicBezier(points, i * dt);
        }

        return curve;
	},
	getEllipseHeight(count, maxHeight, minHeight) {
        var height = [];
        var radionUnit = Math.PI / 180;

        for (var i = 0; i < count; i++) {
            var radion = i * radionUnit;

            height.push(minHeight + Math.sin(radion) * maxHeight);
        }

        return height;
    }
  },
  mounted() {
	  this.initPos();
  }
};
</script>