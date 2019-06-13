<template>
	<div class="lt-full zmiti-index-main-ui">
		<div class="zmiti-input-C" v-if='step === 0'>
			<div>
				姓名：
				<input class="zmiti-input" v-model="formUser.username">
			</div>
			<div>位置：{{formUser.pos}}</div>

			<div>
				<div>手动获取位置：</div>
				<div id='container'></div>
			</div>
			<div class="input-card">
				<h4>下属行政区查询</h4>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >省市区</span></div>
					<select id='province' ref='province' v-model='provinceObj' @change='search(provinceObj,"province")'>
						<option  v-for='(op,i) in provinceList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >地级市</span></div>
					<select id='city' ref='city'  v-model='cityObj' @change='search(cityObj,"city")'>
						<option v-for='(op,i) in cityList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >区县</span></div>
					<select id='district' ref='district' v-model='districtObj' @change='search(districtObj,"district")'>
						<option v-for='(op,i) in districtList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >街道</span></div>
					<select id='street' ref='street' v-model='streetObj'  @change='setCenter(streetObj)'>
						<option v-for='(op,i) in streetList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
			</div>
			<section v-tap='[next]' v-press class='zmiti-next-btn'>下一步</section>
		</div>

		<div class='zmiti-receipt-ui' v-show="step === 1">
			<div>
				姓名：
				<input class="zmiti-input" v-model="formUser.username1">
			</div>
			<div>位置：{{formUser.pos1}}</div>

			<div>
				<div>手动获取位置：</div>
				<div id='container1'></div>
			</div>
			<div class="input-card" v-if='false'>
				<h4>下属行政区查询</h4>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >省市区</span></div>
					<select id='province' ref='province' v-model='provinceObj' @change='search(provinceObj,"province")'>
						<option  v-for='(op,i) in provinceList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >地级市</span></div>
					<select id='city' ref='city'  v-model='cityObj' @change='search(cityObj,"city")'>
						<option v-for='(op,i) in cityList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >区县</span></div>
					<select id='district' ref='district' v-model='districtObj' @change='search(districtObj,"district")'>
						<option v-for='(op,i) in districtList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
				<div class="input-item">
					<div class="input-item-prepend"><span class="input-item-text" >街道</span></div>
					<select id='street' ref='street' v-model='streetObj'  @change='setCenter(streetObj)'>
						<option v-for='(op,i) in streetList' :key="i" :value='op.value'>{{op.name}}</option>
					</select>
				</div>
			</div>
			<div id="smap">

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
			pos: ""
		}
    };
  },
  components: {},

  methods: {

	next(){
		this.step++;
		this.initPos('container1');
		 
	},
    updatePv() {
      var s = this;
      axios
        .post(s.host + "/xhs-security-activity/activity/num/updateNum", {
          secretKey: s.secretKey, // 请求秘钥
          nm: "meeting2019" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
        })
        .then(function(data) {
          var dt = data.data;
          if (typeof dt === "string") {
            dt = JSON.parse(dt);
          }
          console.log(dt);
        });
	},
	
	search(index,name){
		  //清除地图上所有覆盖物
	 

		var {district,getData} = this;
		
		var polygons = this.polygons;
        for (var i = 0, l = polygons.length; i < l; i++) {
            polygons[i].setMap(null);
		}
		
        var option = index;
        var keyword = option.text; //关键字
        var adcode = this[name+"List"][index+1].adcode;
        district.setLevel(option.value); //行政区级别
		district.setExtensions('all');
        //行政区查询
		//按照adcode进行查询可以保证数据返回的唯一性
        district.search(adcode, function(status, result) {
            if(status === 'complete'){
                getData(result.districtList[0],name);
            }
        });
	},
	setCenter(obj){
		var {map} = this;
		 map.setCenter(obj.center)
	},
	initCitySelect(){
		  var opts = {
			subdistrict: 1,   //返回下一级行政区
			showbiz:false  //最后一级返回街道信息
		};
		var s = this;
		this.district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
		this.district.search('中国', function(status, result) {
			if(status=='complete'){
				s.getData(result.districtList[0]);
			}
		});
	},
	getData(data,level){
		var bounds = data.boundaries;
		var polygons = this.polygons;
		var {map } = this;
        if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
                var polygon = new AMap.Polygon({
                    map: map,
                    strokeWeight: 1,
                    strokeColor: '#0091ea',
                    fillColor: '#80d8ff',
                    fillOpacity: 0.2,
                    path: bounds[i]
                });
                polygons.push(polygon);
            }
            map.setFitView();//地图自适应
        }
       
        //清空下一级别的下拉列表
        if (level === 'province') {
			this.cityList = [];
			this.districtList = [];
			this.streetList =  [];
        } else if (level === 'city') {
			this.districtList = [];
			this.streetList =  [];
        } else if (level === 'district') {
			this.streetList =  [];
			this.streetObj=-1;
		}

		var subList = data.districtList;
        if (subList) {
            var contentSub = {};
			var curlevel = subList[0].level;
		
			this[curlevel+'List'].push({
				name:'--请选择--',
				value:-1
			})
		
			for (var i = 0, l = subList.length; i < l; i++) {
                var name = subList[i].name;
                var levelSub = subList[i].level;
                contentSub = {
					name,
					level:levelSub,
					value:i,
					center:subList[i].center,
					adcode:subList[i].adcode
				};
				this[curlevel+'List'].push(contentSub)
			}
        }
	},
    initPos(c='container') {
		var map = new AMap.Map(c, {
			resizeEnable: true,
			
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
				buttonPosition: "RB"
				});
	
				geolocation.getCurrentPosition();
				AMap.event.addListener(geolocation, "complete", data=>{
					 s.formUser[c==='container'? 'pos':'pos1'] = data.formattedAddress;
				});
				AMap.event.addListener(geolocation, "error", data=>{
					console.log("获取位置出错了");	
				});　
			});
		}
	
		var s = this;
	  	this.initCitySelect()
	  	this.clickListener = AMap.event.addListener(map, "touchstart", function(e) {
		   if(s.marker){
			   map.remove(s.marker);
		   }
            s.marker = new AMap.Marker({
                position: e.lnglat,
                map: map
			});
			
			var gps = [e.lnglat.lng,e.lnglat.lat];
			
			 s[c==='container'?'p1':'p4'] = gps;
			
			 if(c === 'container1'){//第二次取位置
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
				s.initMap();
			 }
			 var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});
				geocoder.getAddress(gps, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						var address = result.regeocode.formattedAddress; //返回地址描述
						 s.formUser[c==='container'? 'pos':'pos1'] = address;
						 
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
		console.log(this.p1,this.p2,this.p3,this.p4);
		console.log( dis ,Math.min(dis / 1000/ 261.8,10),'dis')
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