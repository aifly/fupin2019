<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-loading1" :style="{background:'url('+imgs.loading+') no-repeat center bottom',backgroundSize:'cover'}">
			<div class="zmiti-time">
				<img :src="imgs.time" alt="">
				<div class="zmiti-loadig-time">
					<div v-html='currentTime'></div>
					<div>{{currentDate}}</div>
				</div>
			</div>
			<div class='zmiti-loading-ui' v-if='!loaded && showLoading'>
				<div class='zmiti-loading-C'>
					<div class='zmiti-loading-bar '  :style="{webkitTransform:'scale('+(width)+',1)'}">  </div>
				</div>
				<div class='zmiti-progress'>
					{{parseInt(width*100)}}%
				</div>
			</div>
			<transition name='news'>
				<div v-if='loaded' class='zmiti-news ' :class='className' v-tap='[entryIndex]'>
					<div class='zmiti-news-title'>
						<div>
							<img :src="imgs.logo" alt="">
							<span>新华社</span>
						</div>
						<div>
							现在
						</div>
					</div>
					<div class="zmiti-news-content zmiti-text-overflow">
						新华社送你一架“飞机”，进入页面挑战
					</div>
				</div>
			</transition>
			<div class="zmiti-logo">
				<img :src="imgs.logo2" alt="">
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				loaded:false,
				currentTime:'',
				currentDate:"",
				showLoading:true,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},
			entryIndex(){
				clearInterval(this.timer);
				this.obserable.trigger({
					type:'toggleBgMusic',
					data:true
				});
				this.show = false;
				clearInterval(this.t);
				this.obserable.trigger({
					type:'showIndexTitle'
				})
			},
			setDate(D,i=1){
				var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
				this.currentTime =  D.getHours() + '<span style="opacity:'+i+'"> </span>'+ (D.getMinutes()<10?'0'+D.getMinutes():D.getMinutes());
				this.currentDate = (D.getMonth()+1)+ '月'+D.getDate()+'日 '+arr[D.getDay()];
			}
		},
		mounted(){


			var D = new Date();
			this.setDate(D);


			var i = 0;

			this.t = setInterval(()=>{

				i++;
				i%=2;

				var D = new Date();
				this.setDate(D,i);
			},500);

			

			this.obserable.on('hideloading',()=>{
				this.loaded = true;
				this.showLoading = false;

				///


				this.obserable.trigger({
					type:"playVoice",
					data:'alert'
				})

				setTimeout(()=>{
					this.className = 'flash'
				},700)
			});



		}
	}
</script>