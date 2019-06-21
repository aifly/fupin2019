<template>
	<section class='zmiti-share1-ui' :class="{'active':isPage}">
		<div class='lt-full ' :class="{'active':isPage}" ref='page' :style="{background:'url('+wishes[index].bg+') no-repeat center bottom',backgroundSize:'cover'}">
			<div class='zmiti-share-info'>
				<div>这是一张来自</div>
				<div>{{province}} {{city}}的祝福</div>
				<div class='zmiti-wish-img'>
					<img :src="wishes[index].img" alt="">
				</div>
				<div>这是发往脱贫战场的第<span>{{pv}}</span>份祝福</div>
			</div>
			<div class='zmiti-share-logo'  v-if='false'>
				<div>
					<img :src="imgs.logo" alt="">
				</div>
				<div>
					<img :src="imgs.qrcode" alt="">
				</div>
			</div>

			<div class='zmiti-subtitle' v-if='false'>
				<img :src="imgs.subtitle" alt="">
			</div>

			<div class='zmiti-copyright'  v-if='false'>
				<span>新华社客户端</span>
				<span>出品</span>
			</div>
		</div>
		 
	</section>

</template>
<style scoped lang='scss'>
	@import './share.scss';
	$color:#320101;

	.zmiti-share1-ui{
		.active{
			z-index: -1;
			transform: scale(1);
			transform-origin:left top;
			width: 500px;
			height: 804px;
			$viewW:500px;
			.zmiti-share-info{
				width:1*$viewW;
				margin: .1*$viewW auto;
				font-size:.45* $viewW/10;
				&>div{
					//font-size:30px !important;
					margin: .2rem auto ;
					width:100%;
					text-align: center;
					&.zmiti-wish-img{
						margin-top:6vh;
					}

				}
				color:$color;
				 
			}
			.zmiti-share-logo{
				position: absolute;
				width:$viewW * .15;
				left: $viewW*.05;
				bottom:$viewW*.05;
				z-index: 1;
				&>div{
					margin: .2rem 0;
					&:nth-of-type(2){
						padding:$viewW*.005;
						background: #fff;
					}
				}
			}
			.zmiti-subtitle{
				position: absolute;
				width: $viewW*.2;
				right: $viewW * .04;
				bottom:$viewW*.05;
			}
		}
	}
	.zmiti-share-info{
		width: 10rem;
		margin: 10vh auto;
		font-size:.45rem;
		&>div{
			margin: .2rem auto;
			width:80%;
			text-align: center;

			&.zmiti-wish-img{
				///margin-top:6vh;
			}
			span{
				font-size:1rem;
				font-family: Georgia;
			}
		}
		color:$color;
		.zmiti-myname{
			position: relative;
			text-align: center;
			width:7rem;
			margin: 0 auto;
			 
		}
		.zmiti-address{
			text-align: center;
		}
	}
	.zmiti-share-logo{
		position: absolute;
		width: 1.5rem;
		left: .5rem;
		bottom: 1rem;
		z-index: 1;;
		&>div{
			margin: .2rem 0;
			&:nth-of-type(2){
				padding:.05rem;
				background: #fff;

			}
		}
	}
	.zmiti-subtitle{
		position: absolute;
		width: 2rem;
		right: .4rem;
		bottom: .5rem;
	}
</style>

<script>
	import '../lib/html2canvas';
	export default {
		props:['rName','myName','index','city','province','isPage','obserable','pv'],
		data(){
			return {
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				imgs:window.imgs,
				wishes:window.config.wishes,
				createImg:'',
			}
		},
		methods: {
			html2img(ref = 'page'){
				var s = this;

				var {obserable} = this;

				setTimeout(()=>{
					//this.showLoading = true;
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							obserable.trigger({
								type:'getCreateImg',
								data:src
							}); 
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},1000)

 
			},
		},
		mounted() {
			
			if(this.isPage){
				 //
			}
			var {obserable} = this;
			obserable.on('createImg',()=>{
				if(this.isPage){
					this.html2img()
				}
			})
			
		},
	}
</script>