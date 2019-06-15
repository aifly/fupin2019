<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-loading1">
			 <div class="zmiti-loading">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<div>{{width}}%</div>
			</div>
			<div class='zmiti-loading-logo'>
				<img :src="imgs.logo" alt="">
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
			
		},
		mounted(){

 
 
			 

		}
	}
</script>