<template>
	<div  class="lt-full zmiti-music-main-ui" :style='{height:"10vh"}'>
		<audio ref='music' :key="i" v-for='(audio,i) in audios' :src='audio.src' :autoplay="audio.autoplay" :loop="audio.loop"></audio>

		<div v-show='showPlay'  @click='toggleMusic' class='zmiti-play' :class='{"":rotate}' :style="playStyle">
			<img  :src='imgs[rotate?"play":"play1"]'/>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	var audios =[];

	for (var music in musics){
		audios.push(musics[music])
	}

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				audios,
				showPlay:true,
				imgs:window.imgs,
				rotate:false,
				playStyle:{}
			}
		},
		components:{
		},
		
		methods:{

			toggleMusic() {

				var music = this.$refs['music'][0];
				music[music.paused ? 'play' : 'pause']();

			},
			playAudioMuted(){//静音播放

				this.audios.forEach((audio1,i)=>{
					if(i>0){
						if(audio1.autoplay){
							this.$refs['music'][i].muted = true;//静音
							this.$refs['music'][i].play();
						}
					}
				})
			}
		},
		mounted(){
			
			var {obserable} = this;
			var audio = this.$refs['music'][0];

			var len = audio;
			if(audio){
				
				audio.addEventListener('play',()=>{
					this.rotate = true;
				})
				audio.addEventListener('pause',()=>{
					this.rotate = false;
				})
			}

			

			len && audio.play();
			audio.volume = 1;

			this.playAudioMuted();

			obserable.on('playVoice',(key)=>{

				this.audios.forEach((audio,i)=>{
					if(i>0 ){
						if(audio.name === key){

							this.$refs['music'][i].currentTime = 0;
							this.$refs['music'][i].muted = false;//取消静音
							this.$refs['music'][i].play();
						}
					}
				})
			})

			obserable.on('pauseVoice',(key)=>{

				this.audios.forEach((audio,i)=>{
					if(i>0 ){
						if(audio.name === key){
							//audio.currentTime = 0;
							
							this.$refs['music'][i].pause();
							this.$refs['music'][i].muted = false;//取消静音
						}
					}
				})
			})

			obserable.on('setPlay', (data) => {

				this.playStyle = data;

			});

			var s = this;
			document.addEventListener("WeixinJSBridgeReady", function() {
				WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
					//audio&&(audio.volume = 1);
					len && audio.play();
					s.playAudioMuted();
				});
			}, false)



			var play = function() {
				return;
				document.removeEventListener("WeixinJSBridgeReady", play);
				document.removeEventListener("YixinJSBridgeReady", play);
				s.playAudioMuted();
				len && audio.play();
				//audio&&(audio.volume = 1);
				
			};

			if (window.WeixinJSBridge) {
				//audio&&(audio.volume = 1);
				len && audio.play();
				s.playAudioMuted();
			}
			//weixin
			if (typeof WeixinJSBridge == "undefined") {
				document.addEventListener("WeixinJSBridgeReady", play, false);
				s.playAudioMuted();
			} else {
				//yixin
				document.addEventListener('YixinJSBridgeReady', play, false);
				//len && audio.play();
				s.playAudioMuted();
			}

			obserable.on('toggleBgMusic', (data) => {

				var audio = this.$refs['music'][0];
				audio[data ? 'play' : 'pause']();
			});
			obserable.on('togglePlay', (data) => {

				this.showPlay = data;
			});

			obserable.on('removeAudio',(key)=>{
				this.audios.length = 1;
				this.audios = this.audios.concat([]);
				console.log(this.audios,'removeAudio....')
			});

			obserable.on('initAudio',(key)=>{
				var audios = [];
				for (var music in window.musics){
					audios.push(musics[music])
				}
				this.audios = audios;
			});


			

		}
	}
</script>