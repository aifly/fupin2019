import Vue from "vue";
import './pages/css/index.css';
import Index from './pages/index/index';
import Loading from './pages/loading/index';
import Music from './pages/music/index';
import Main from './pages/main/index';
import Obserable from './pages/lib/obserable';

import zmitiUtil from './pages/lib/util'
import './pages/lib/touch.js'
import vueTap from 'vue-js-tap';
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
		headimgurl: '',
		shareBg:'./assets/images/share.jpg',
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
		
		<Music :obserable='obserable'></Music>
		<Main :width='width' :obserable='obserable'></Main>
		*/
		template: `<div id='app1'>
		<Loading :width='width' :obserable='obserable' v-if='!loaded'></Loading>
		<Index :pv='pv' :nickname='nickname' v-if='!isShare && loaded' :headimgurl='headimgurl'  :obserable='obserable'></Index>
		
		<Main :width='width' :obserable='obserable' v-if='!isShare &&loaded'></Main>
		<div class='lt-full zmiti-share-page' v-if='isShare　&&loaded' :style="{background:'url('+shareBg+') no-repeat center',backgroundSize:'cover'}">
			<div class='zmiti-share-img' :style="{WebkitTransform:'scale('+(viewH/800)+')'}">
				<img :src='src' v-if='src' />
			</div>
			<div class='zmiti-share-btn' v-press v-tap='[restart]'>我也要送祝福</div>
		</div>
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
			
		},
		restart(){
			window.location.href = window.location.href.split('?')[0];
		}
	},
	components: {
		Index,
		Loading,
		Music,
		Main
	},
	created(){
		
		var s = this;
		var url = window.location.href.split('#')[0];
		url = zmitiUtil.changeURLPar(url, 'time', new Date().getTime());
		zmitiUtil.wxConfig(document.title, document.title,url);
		if (this.isShare) {
			arr = [arr.pop()];
			axios({
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				url: s.host + "/xhs-security-activity/activity/giftcard/getGiftCardByIdAndAnm",
				data: JSON.stringify({
					secretKey: window.config.secretKey,  // 请求秘钥(string, 必填)
					id : s.isShare,   //贺卡ID (long, 必填)
					anm: window.config.anm // 活动标识（string, 必填）
				})
			}).then(data => {
				var dt = data.data;
				if (typeof dt === "string") {
					dt = JSON.parse(dt);
					console.log(dt);
					s.src = dt.data.imgUrl;
				}
			});
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