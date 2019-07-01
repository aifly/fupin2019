<template>
	<div class='lt-full zmiti-share-page'  :style="{background:'url('+shareBg+') no-repeat center',backgroundSize:'cover'}">
			 
			<div class='lt-full'>
				<Share :pv='pv' :obserable='obserable'  :province='province' :city='city'  :index='wishid'></Share>
			</div>
			<div class='zmiti-share-btn' v-press>
				<a :href='href'>我也要送祝福</a>
			</div>
		</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util'; 
	import Share from '../main/share'
	export default {
		props:['obserable','pv','city','province','wishid'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				shareBg:window.imgs.bg,
				href:window.location.href.split('?')[0],
				viewW:document.documentElement.clientWidth,
				showBtns:false,
				viewH:document.documentElement.clientHeight,

			}
		},
		components:{
			Share
		},
		
		methods:{


		
			imgStart(e){
				e.preventDefault();
			},
			restart(){

				window.location.href = window.location.href.split('?')[0];
			},
			 
			
		 
			
			
		},
		mounted(){

		}
	}
</script>