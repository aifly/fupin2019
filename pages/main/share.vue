<template>
	<section class='zmiti-share1-ui' :class="{'active':isPage}">
		<div class='lt-full ' :class="{'active':isPage}" ref='page' :style="{background:'url('+imgs.shareBg+') no-repeat center top',backgroundSize:'cover'}">
			<div class='zmiti-share-info'>
				<div>扶贫干部 {{rName}}：</div>
				<div>
					<img :src="wishes[index].img" alt="">
				</div>
				<div class='zmiti-myname'>
					{{myName}}
				</div>
				<div class='zmiti-address'>
					从{{province}} {{city}} 给你发来贺卡
				</div>
			</div>
			<div class='zmiti-share-logo'>
				<div>
					<img :src="imgs.logo" alt="">
				</div>
				<div>
					<img :src="imgs.qrcode" alt="">
				</div>
			</div>

			<div class='zmiti-subtitle'>
				<img :src="imgs.subtitle" alt="">
			</div>

			<div class='zmiti-copyright'>
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
				width:.8*$viewW;
				margin: .2*$viewW auto;
				font-size:.45* $viewW/10;
				&>div{
					//font-size:30px !important;
					
					margin: $viewW*.1 0 ;
				}
				color:$color;
				.zmiti-myname{
					position: relative;
					text-align: center;
					width:$viewW*.7;
					margin: 0 auto;
					&:before,&:after{
						content:'';
						position:absolute;
						width: $viewW*.24;
						height: 1px;
						background:$color;
						left: 0;
						top:50%;
					}
					&:after{
						left: auto;
						right: 0;
					}
				}
				.zmiti-address{
					text-align: center;
				}
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
		width: 8rem;
		margin: 2rem auto;
		font-size:.45rem;
		&>div{
			margin: 1rem 0 ;
		}
		color:$color;
		.zmiti-myname{
			position: relative;
			text-align: center;
			width:7rem;
			margin: 0 auto;
			&:before,&:after{
				content:'';
				position:absolute;
				width: 2.4rem;
				height: 1px;
				background:$color;
				left: 0;
				top:50%;
			}
			&:after{
				left: auto;
				right: 0;
			}
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
		props:['rName','myName','index','city','province','isPage','obserable'],
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