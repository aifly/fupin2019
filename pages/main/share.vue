<template>
	<section class='zmiti-share1-ui' >
		<div class='lt-full ' ref='page' :style="{background:'url('+wishes[index].bg+') no-repeat center bottom',backgroundSize:backgroundSize}">
			<h1 style="height:10vh;"></h1>
			<div class='zmiti-share-info'>
				<div class='zmiti-wish-img'>
					<img :src="wishes[index].img" alt="">
				</div>
				<div>这是发往脱贫一线的第<span>{{pv}}</span>份祝福</div>
				<div>来自{{province}}{{city}}</div>
			</div>
			<div class='zmiti-share-logo'>
				<div>
					<img :src="imgs.qrcode" alt="">
				</div>
			</div>

			<div class='zmiti-subtitle' >
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

	 
	.zmiti-share-info{
		width: 10rem;
		margin:0  auto 10vh;
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
		right: .4rem;
		bottom: 10px;
		z-index: 1;;
		&>div{
			margin: .2rem 0;
			&:nth-of-type(2){
				padding:.05rem;
				background: #fff;

			}
		}
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
				backgroundSize:'cover'
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
					this.backgroundSize = 'contain';
					setTimeout(() => {
						this.backgroundSize = 'cover';
						this.html2img()
					}, 0);
				}
			})
			
		},
	}
</script>