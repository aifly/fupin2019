<template>
	<transition name='main'>
		<div v-swipeup='playVideo' class='zmiti-main-ui lt-full' ref='scene'  v-if='show' :style="{background:'url('+imgs.main+') no-repeat center top',backgroundSize:'cover',height:viewH+'px'}" >
		 	 
			<div class='zmiti-title' >
				<img :src="imgs.title" alt="">
				<template  >
					 
					<canvas  ref='canvas' :width="506/1133*(viewH*.7)" :height="viewH*.7-2*rem"></canvas>
					<div>
						<div>新华社客户端</div>
						<div>出品</div>
					</div>
					<span v-tap='[playVideo]' v-if='false'> 
						<img :src='imgs.video' />
					</span>
				</template>
			</div>
			<div class='lt-full zmiti-video'  v-if="showVideo" >
				<video x-webkit-airplay="allow"  v-show="showVideo" webkit-playsinline="true" preload="auto" playsinline
				x5-video-player-type="h5" x5-video-player-fullscreen="true" 
				 ref='video1'  :style="{width:videoWidth,height:'100%'}" :src="videoUrl"></video>
				 <div class='zmiti-pass' v-tap='[pass]'>跳过</div>
			</div>
			<div class='zmiti-info'>
				<img :src="imgs.info" alt="">
			</div>
		</div>

	</transition>
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>
	
	import zmitiUtil from '../lib/util';
	import IScroll from 'iscroll';
	import Toast from '../toast/toast';
	import '../lib/html2canvas';
	export default {
		props: ['obserable', ],
	
		name: 'zmitiindex',
	
		data() {
			return {
				showVideo:false,
				successMsg:"",
				isAndroid :navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				imgs:window.imgs,
				secretKey: "e9469538b0623783f38c585821459454",
                host:window.config.host, 
				show:true,
				rem:window.innerWidth /10,
				viewW:window.innerWidth,
				viewH: window.innerHeight,
				videoUrl:window.config.indexvideo,
				videoWidth:window.innerWidth,
				videoHeight:window.innerHeight,
				
			}
		},
	
		components: {
			Toast
		},
		watch:{

		},
		methods: {
			pass(){
				this.$refs['video1'].pause();
				this.showVideo = false;
				this.obserable.trigger({
					type:'showMain'
				})
				this.obserable.trigger({
					type:'toggleBgMusic',
					data:true
				});
				this.obserable.trigger({
					type:'togglePlay',
					data:true
				})
			},
			playVideo(){
				this.show = false;
				
				this.obserable.trigger({
					type:'showMain'
				})
				clearInterval(this.t);

				return;

				let {obserable} = this;
				this.$nextTick(()=>{
					
					obserable.trigger({
						type:'toggleBgMusic',
						data:false
					})
					this.$refs['video1'].play();
					obserable.trigger({
						type:'togglePlay',
						data:false
					})

					this.showVideo = true;
					this.$refs['video1'].addEventListener('ended',e=>{
						this.showVideo = false;
						obserable.trigger({
							type:'toggleBgMusic',
							data:true
						})
						this.obserable.trigger({
							type:'showMain'
						})
					});

				});
			},
			setSize(){
				 var bgratio = 1100/1920;
			 	 
				 var bgratio = 1080/1920;
				if((innerWidth/innerHeight)<=9/16){
					this.videoWidth = parseInt(bgratio*innerHeight)+'px';
					this.videoHeight = window.innerHeight+'px';
				}else{
					this.videoWidth = window.innerWidth+'px';
					this.videoHeight = parseInt(innerWidth/bgratio)+'px';
				}

				return; 
				if((innerWidth/innerHeight)<=9/16){
					this.$refs['video1'].style.width = parseInt(bgratio*innerHeight) + 'px';
					this.$refs['video1'].style.height = parseInt(innerHeight) + 'px';
				}else{
					
					this.$refs['video1'].style.width = innerWidth + 'px';
					this.$refs['video1'].style.height = parseInt(innerWidth / bgratio) + 'px';
				}
				
				//this.$refs['video1'].
			},

			initCanvas(){
				const canvas = this.$refs['canvas'];
				const context = canvas.getContext('2d');
				var {width,height } = canvas;
				var startX = canvas.width/2- .8*this.rem;
				var startX1 = canvas.width /2 +  .8*this.rem;

				var startY = -4;
				context.moveTo(startX,0);
				context.strokeStyle = '#fff';
				var i = 0 ;
				var j = 0;
				var iNow = -4;
				var iNow1 = width;
				var speed = 8;

				this.t = setInterval(() => {
					i+=speed;
					if(startX-i>=-4){
						this.drawCircle(context,startX-i,0);
						
					}
					j+=speed;
					if(startX1+j<=width+4){
						this.drawCircle(context,startX1+j,0);
						
					}
					else{
						startY+=speed;
						if(startY<=height *.88){
							}
						this.drawCircle(context,0,startY,true);
						this.drawCircle(context,width-4,startY,true);

						if(startY>=height){
							iNow1-=speed;
							if(iNow1>=width/3*2){
								this.drawCircle(context,iNow1,height-4);
							}
							else{
								
							}
							iNow+=speed;
							if(iNow<=width/2  - this.rem*.6){
									
							}else{
								clearInterval(this.t);
							}
							this.drawCircle(context,iNow,height-4);
						}
					}
				}, 20);


			},
			drawCircle(context,x,y,isLine){
				context.fillStyle='#fff';
				context.beginPath();
				context.save();
				if(!isLine){
					context.fillRect(x,y,8,4);
				}
				else{
					context.fillRect(x,y,4,8);
				}
				//context.arc(x,y,2,0,Math.PI*2,false);
				context.closePath();
				context.stroke();
				context.restore();
				context.fill();
			},
		},
	
		mounted() {
			this.setSize();
			this.initCanvas();
			
		}
	
	}
</script>
