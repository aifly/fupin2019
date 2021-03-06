import Vue from "vue";
import './pages/css/index.css';
import Index from './pages/index/index';
import Loading from './pages/loading/index';
import Music from './pages/music/index';
import Share from './pages/share/index';
import Main from './pages/main/index';
import Obserable from './pages/lib/obserable';

import zmitiUtil from './pages/lib/util'
import './pages/lib/touch.js'
import vueTap from 'vue-js-tap';
import { decode } from "iconv-lite";
Vue.use(vueTap);


//var VueTouch = im('vue-touch')
/*import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'})*/



var obserable = new Obserable();


//Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
	data: {
		obserable,
		rotate: false,
		imgs:window.imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: zmitiUtil.getQueryString('id'),
		show: false,
		username: '',
		pv:820121,
		width:0,
		loaded: false,
		nickname: '',
		host: window.config.host, 
		src:'',
		scale:1,
		headimgurl: '',
		shareBg:window.imgs.bg,
		playStyle: {

		}
	},
	el: '#app',
	/*<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>

		<audio src='./assets/music/water.mp3' ref='water'></audio>
		<audio src='./assets/music/photo.mp3' ref='photo'></audio>
		<audio src='./assets/music/bg.mp3' ref='audio'></audio>
		<Main :pv='pv' :nickname='nickname' :headimgurl='headimgurl'  v-if='show && !isShare'  :obserable='obserable'></Main>
		<Upload :pv='pv' :nickname='nickname' :headimgurl='headimgurl'   v-if='show && !isShare'  :obserable='obserable'></Upload>
		<Loading v-if='!show' :width='width' :obserable='obserable'></Loading>
		
		<Main :width='width' :obserable='obserable'></Main>
		*/
		template: `<div id='app1'>
		<Music :obserable='obserable'></Music>
		<Loading :width='width' :obserable='obserable' v-if='!loaded'></Loading>
		<Index :pv='pv' :nickname='nickname' v-if='!isShare && loaded' :headimgurl='headimgurl'  :obserable='obserable'></Index>
		<Main :width='width' :obserable='obserable' v-if='!isShare &&loaded'></Main>
		<Share :wishid='wishid' :city='city' :province='province' :pv='pv'  v-if='isShare && loaded'  :obserable='obserable'></Share>
		
	</div>`,
	methods: {	

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;
			arr.loaded = false;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						if(!arr.loaded){
							arr.loaded = true;
							fnEnd && fnEnd(img.src);
						}
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
	
		updatePv() {
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
				url: s.host + "/activity/num/updateNum",
				data: JSON.stringify(data)
			}).then(data => {
				var dt = data.data;
				if (typeof dt === "string") {
					dt = JSON.parse(dt);
				}
			});
		},
		restart(){
			window.location.href = window.location.href.split('?')[0];
		},
		zmitiPV(){
			axios.post('https://newapi.zmiti.com:50295/api/viewdata',{
				h5id:"fupin",
				appsecret:'c9GxtUre3kOJCgvp',
				sign:1
			}).then(()=>{

			})
		},
		updateGiftCard() {
			var s = this;
			
			var { isShare,id, myName, rName, province, wishes, currentWishIndex, sPositionData, myPositionData, createImg } = this;
			if (!isShare || !id){
				return;
			}
			
			axios({
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				url: s.host + '/activity/giftcard/updateGiftCard',
				data: JSON.stringify({
					secretKey: window.config.secretKey, // 请求秘钥
					id,
					/* swnm: "",//微信昵称
					swid: '',
					sLongitudes: myPositionData.position.lng,
					sLatitudes: myPositionData.position.lat,
					sProvince: myPositionData.addressComponent.province,
					sCity: myPositionData.addressComponent.city || myPositionData.addressComponent.district,
					sDistrict: myPositionData.addressComponent.district,
					sStreet: myPositionData.addressComponent.street,
					blessingWords: wishes[currentWishIndex].text, */

					rLongitudes:myPositionData.position.lng,
					rLatitudes:myPositionData.position.lat,
					rProvince:myPositionData.addressComponent.province,
					rCity:myPositionData.addressComponent.city || myPositionData.addressComponent.district,
					rDistrict:myPositionData.addressComponent.district,
					rStreet:myPositionData.addressComponent.street, 


				})
			}).then((data) => {
				var dt;
				if (typeof data.data === 'string') {
					dt = JSON.parse(data.data);
				} else {
					dt = data.data;
				}
				console.log(dt, 'dt....');
				if (dt.rc * 1 === 0) {
					
				}
				else {
					console.log(dt, '保存接口出错了');
				}
			})

		},
		initPos(c = 'pos'){


			var map = new AMap.Map(c, {
				resizeEnable: true,
				zoom: 12
			});
			this.map = map;


			var s = this;
			if (c === 'pos') {
				map.plugin("AMap.Geolocation", function () {
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
					AMap.event.addListener(geolocation, "complete", data => {

						s.myPositionData = data;
						window.localStorage.setItem('sharePosition',JSON.stringify(data))
						s.updateGiftCard();

						
						var gps = [data.position.lng, data.position.lat];
						s.p1 = gps;

					});
					AMap.event.addListener(geolocation, "error", data => {
						console.log("获取位置出错了");
					});
				});
			}
		}
	},
	components: {
		Index,
		Loading,
		Music,
		Main,
		Share
	},
	created(){

		var s = this;
		s.updatePv();
		this.zmitiPV();
		var url = window.location.href.split('#')[0];
		url = zmitiUtil.changeURLPar(url, 'time', new Date().getTime());
		zmitiUtil.wxConfig(document.title, document.title,url);

		var wishid = zmitiUtil.getQueryString('wishid');
		var province = decodeURI(zmitiUtil.getQueryString('province'));
		var city = decodeURI(zmitiUtil.getQueryString('city'));
		var pv = zmitiUtil.getQueryString('pv');
		var id = zmitiUtil.getQueryString('id');

		this.wishid = wishid;
		this.province = province;
		this.city = city;
		this.pv = pv;
		this.id = id;

		this.isShare = wishid && pv;

		if (this.isShare) {
			s.initPos();
		}
		s.loading(arr, (scale) => {
			s.width = scale * 100 | 0;
		}, () => {
			obserable.trigger({
				type: 'hideloading'
			});
			s.show = true;
			s.loaded = true;
		})
	},

	mounted() {


		

	 
		

		//zmitiUtil.getOauthurl(obserable);
		//zmitiUtil.wxConfig(document.title, window.desc);
		
		return;
		 
	}
}).$mount('#app1')