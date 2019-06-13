<template>
	<transition name='main'>
		<div class='zmiti-main-ui lt-full' ref='scene' :class="{'show':show}" :style="{background:'url('+imgs.main+') no-repeat center top',backgroundSize:'cover',height:viewH+'px'}" >
		 	<div class="zmiti-zipcode">
		 		<img :src="imgs.zipcode" alt="">
		 	</div>

		 	<transition name='questionui'>
				 <div v-if='showQuestionUI' class='zmiti-question-ui'>
					<div class='zmiti-modal-C lt-full'>
						
						<div class='zmiti-modal-list' >
							<ul >
								<li :style='{height:viewH+"px"}' :class="hw.className" class='lt-full' v-for='(hw,i) in questionList' :key="i">
									
									<div class="zmiti-main-person">
										<div class="zmiti-headimgurl"><img :src="hw.headimgurl" alt=""></div>
										<div class="zmiti-name">
											<h2>{{hw.name}} <span>向您提问：</span></h2>
											<div v-for='(pos,k) in hw.position.split("、")' :key='k'>{{pos}}</div>
											 
										</div>
									</div>

									<div class="zmiti-main-question" :style="{'WebkitBoxPack':!hw.showResult?'start':'start'}">
										<div class="zmiti-question-img">
											<img :src="hw.img" alt="">
										</div>
										<transition name='question'>
											<div v-if='!hw.showResult' class="zmiti-trans-question">
												<div class="zmiti-question-title">
													{{hw.qTitle}}
												</div>
												<div class="zmiti-answer-C">
													<div v-for='(an,l) in hw.answers' v-tap='[choose,i,l]' :key='l' class="zmiti-answer-item" :class="{'error':an.className,'active':an.itemPress}" @touchstart='an.itemPress = true;questionList = questionList.concat([])' @touchend='an.itemPress = false;questionList = questionList.concat([])'>
														{{an.name}}
														<img v-if='myAnswers[l]' class='zmiti-result' :src="imgs[l===hw.rAnswer?'right':'error']" alt="">
													</div>
												</div>
											</div>
										</transition>
										<transition name='question1'>
											<div v-if='hw.showResult' class='zmiti-right-remark zmiti-trans-question'>
												<h2>正确解释：</h2>
												<div>{{hw.remark}}</div>
												<section v-show='showNextBtn' class='zmiti-next-btn' :class="{'active':nextPress}" @touchstart='nextPress = true' @touchend='nextPress = false' v-tap='[nextQuestion]'>
													{{currentIndex>=questionList.length-1?'完成':'下一题'}}
												</section>
											</div>
										</transition>


									</div>

								</li>
							</ul>
							
						</div>
					</div>
				 </div>

			 </transition>

			<transition name='questionui'>
				 <div v-if='!showQuestionUI' class="lt-full zmiti-form-ui" :style="{background:'url('+imgs.index+') no-repeat center bottom',backgroundSize:'cover'}">
				 	 <input type="text" style="width:0;height:0;position:absolute;opacity:0" ref='button' @focus='focus1'>

				 	 <transition name='result'>
						<template v-if='!showResultPage'>
						 	 <div class="zmiti-mobile">
						 	 	<div class="zmiti-input-tip">输入您的电话，方便大礼到家！</div>
						 	 	<input @blur='blur1'  @focus='focus' type="text" v-model='mobile' ref='mobile'>
								<div class="zmiti-mobile-tip">
									<div style="text-indent:0">说明：</div>
									<div>诚邀您留下手机号码。</div>
									<div>2019年3月16日，我们将从得到三颗星的选手中抽取10名参与者，每人获得C919大飞机模型一台。</div>
									<div>
										另从得到三颗星的选手中抽取70名参与者，每人获得两会纪念封一枚。
									</div>
									<div>
										本次活动为随机抽取，两种奖品只能获得一个。
									</div>
								</div>
						 	 	<div class="zmiti-submit-btn" v-tap='[submit]' :class="{'active':nextPress,'disabled':isSubmit}" @touchstart='nextPress = true' @touchend='nextPress = false'> 
						 	 		提交
						 	 	</div>
						 	 	<div class="zmiti-result-btns">
						 	 		<div :class="{'active':teamPress}" @touchstart='teamPress = true' @touchend='teamPress = false' v-tap='[showTeamPage]'><img :src="imgs.teamBtn" alt=""></div>
									<div :class="{'active':sharePress,'flash':isSubmit}" @touchstart='sharePress = true' @touchend='sharePress = false' v-tap='[showRemarkPage]'><img :src="imgs.share" alt=""></div>
									<div :class="{'active':restartPress}" @touchstart='restartPress = true' @touchend='restartPress = false' v-tap='[init]'><img :src="imgs.restart" alt=""></div>
								</div>
						 	 </div>
						</template>
				 	 </transition>
					
					<transition name='result'>
						<div v-if='showResultPage' class="lt-full zmiti-result-page">
							<div class="zmiti-result-bg">
								<img :src="imgs.result" alt="">
								<div class="zmiti-passed" v-if='rightCount>1'>
									<img :src="imgs.passed" alt="">
								</div>

								<div class="lt-full">
									<div class="zmiti-result-radio">
										<div>
											超过了 <span>{{parseInt(rightRadio)}}%</span>的人
										</div>
										<div class="zmiti-star-C">
											<img :src="imgs.star" alt=""  v-for='(star,i) in new Array(level+1)'>
										</div>
									</div>
									<div class="zmiti-result-title">
										{{result[level].level}}
									</div>
									<div class="zmiti-result-content">
										{{result[level].content}}
									</div>
								</div>
								<div class="zmiti-get flash" v-tap='[gotoSubmitPage]'>
									<img :src="imgs.get" alt="">
								</div>
							</div>
						</div>
					</transition>
					

				 </div>
			</transition>
			 <div class="zmiti-mask" @touchstart='showRemark = false' v-if='showRemark'>
			 	<img :src="imgs.arrow" alt="">
			 </div>

			 <div class="zmiti-team-page lt-full" v-tap='[closeTeamPage]' v-if='showTeam'>
			 	 <div>
			 	 	<img :src="imgs.team" alt="">
			 	 </div>
			 </div>

			<Toast :errorMsg='errorMsg' :msg='successMsg'></Toast>
		</div>

	</transition>
</template>

<script>
	import './index.css';
	
	import zmitiUtil from '../lib/util';
	import IScroll from 'iscroll';
	import Toast from '../toast/toast';
	import '../lib/html2canvas';
	export default {
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
			return {
				errorMsg:'',
				showResultPage:true,
				teamPress:false,
				successMsg:'',
				rightRadio:0,
				restartPress:false,
				sharePress:false,
				showQuestionUI:true,
				nextPress:false,
				myAnswers:[0,0,0],
				result:[{
					level:'啊？！',
					content:'不甘心，再来一遍！'
				},{
					level:'只差一点点',
					content:"给你45度角明媚的疼痛忧伤"
				},{
					level:'“硬核”科迷',
					content:"给你C位，下一部科幻电影邀你来做编剧！"
				}],
				isAndroid :navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				createImg:'',
				ZIMU:['A','B','C'],
				imgs:window.imgs,
				showNextBtn:true,
				secretKey: "e9469538b0623783f38c585821459454",
                host:window.config.host, 
                show:false,
                level:0,
				viewW:Math.min( window.innerWidth,750),
				viewH: window.innerHeight,
				currentIndex:0,
				mobile:'',
				showRemark:false,
				rightCount:0,
				isSubmit:false,
				questionList:window.config.questionList,
				lastChooseIndex:-1,
				nextQuestionIndex:-1,
				showTeam:false,
			}
		},
	
		components: {
			Toast
		},
		watch:{

		},
		methods: {


			closeTeamPage(){
				this.showTeam = false;
			},

			showTeamPage(){
				this.showTeam = true;
			},

			showRemarkPage(){
				this.showRemark = true;
			},

			init(){
				this.rightCount = 0;
				this.rightRadio = 0;
				this.currentIndex = 0;
				this.showResultPage = true;
				this.lastChooseIndex = -1;
				this.nextQuestionIndex = -1;
				this.isSubmit = false;

				this.swipeLeft();
				this.swipeRight();
				this.showQuestionUI = true;
				this.questionList.forEach((q)=>{
					q.showResult = false;
					q.showAnswer = false;
				})
			},

			nextQuestion(){

				if(this.nextQuestionIndex === this.currentIndex){

					return;
				}
				this.nextQuestionIndex = this.currentIndex;

				if(this.currentIndex>=this.questionList.length-1){
					this.rightRadio = this.rightCount/(this.questionList.length-1)*100;
					this.showQuestionUI = false;
					if(this.rightRadio>=100){
						this.rightRadio = this.rightRadio - ((Math.random()*5|0)+1);
					}else{
						this.rightRadio = this.rightRadio + ((Math.random()*10|0)+1);
						if(this.rightRadio>95){
							this.rightRadio = 95;
						}
					}

					if(this.rightRadio>30){
						this.level = 1;
					}
					if(this.rightRadio>70){
						this.level = 2;
					}
				}else{
					this.swipeLeft();
					this.questionList[this.currentIndex].answers = this.questionList[this.currentIndex].answers.sort(()=>{
						return Math.random()>.5;
					});

					this.questionList[this.currentIndex].answers.forEach((item,i)=>{
						if(item.isRight){
							this.questionList[this.currentIndex].rAnswer = i;
						}
					})


					//this.questionList[this.currentIndex].answers[rightIndex] = this.questionList[this.currentIndex].answers[lastRightIndex];


					
					
				}
			},

			choose(qindex,aindex){


				if(this.lastChooseIndex === qindex){
					return;
				}

				this.lastChooseIndex = qindex;
				
				this.questionList[qindex].showAnswer = true;
				
				this.showNextBtn = false;
				this.obserable.trigger({
					type:'playVoice',
					data:aindex === this.questionList[qindex].rAnswer?'right':'error'
				})

				if(aindex === this.questionList[qindex].rAnswer){
					//
					this.myAnswers[aindex] = 1;
					if(qindex>0){
						this.rightCount++;
					}
					setTimeout(()=>{
						this.questionList[qindex].showResult = true;

						this.questionList = this.questionList.concat([]);
						setTimeout(()=>{
							this.showNextBtn = true;
						},1500);
						this.myAnswers = [0,0,0];
					},1000)
				}
				else{
					this.myAnswers[aindex] = 1;
					this.myAnswers[this.questionList[qindex].rAnswer] = 1;

					this.questionList[qindex].answers[aindex].className='error';
					setTimeout(()=>{
						this.questionList[qindex].answers[aindex].className='';
						this.questionList[qindex].showResult = true;
						//this.showNextBtn = true;
						this.questionList = this.questionList.concat([]);
						setTimeout(()=>{
							this.showNextBtn = true;
						},1500)
						this.myAnswers = [0,0,0];
					},1000);		
				}
				this.questionList = this.questionList.concat([]);
			},
			
			swipeLeft(){
				var s = this;
				this.isLeftFirst = true;
				this.iNow = (s.currentIndex + 1) % s.questionList.length;
				this.initLeft();
			},
			swipeRight(){
				var s = this;
				this.iNow = s.currentIndex-1;
				if(this.iNow<0){
					this.iNow = this.questionList.length - 1;
				}
				this.isRightFirst=  true;
				this.initRight();
			},
			initLeft: function(flag) {
				var s = this;
				
				s.currentIndex = (s.currentIndex + 1) % s.questionList.length;
				
				//s.loadMusic(s.questionList[s.currentIndex].audio);
				//this.iNow = s.currentIndex;
				var classList = [
					'left1 transition',
					'left transition',
					'active transition',
					'right ',
					'right1 '
				]
				var questionList = s.questionList,
					currentIndex = s.currentIndex;


				questionList.forEach(function(list, i) {

					if (currentIndex > i) {
						questionList[i].className = classList[0]
					} else if (currentIndex < i) {
						questionList[i].className = classList[4]
					}
					(questionList[currentIndex + 1] || questionList[0])['className'] = classList[3];
					(questionList[currentIndex + 2] || questionList[1])['className'] = classList[4];
					(questionList[currentIndex - 1] || questionList[questionList.length - 1])['className'] = classList[1];
					//(questionList[currentIndex - 2] || questionList[questionList.length - 2])['className'] = classList[0];
				});

				questionList[currentIndex].className = classList[2];
				s.questionList = questionList.concat([]);
			},
			initRight: function() {
				this.person = this.imgs.personR;
				var s = this;
				s.currentIndex = s.currentIndex - 1;

				if (s.currentIndex < 0) {
					s.currentIndex = s.questionList.length - 1;
				}
				//this.iNow = s.currentIndex;
				
				var questionList = s.questionList,
					currentIndex = s.currentIndex;


				//console.log(s.currentIndex)

				s.currentIndex = s.currentIndex % questionList.length;

				var classList = [
					'left1 ',
					'left ',
					'active transition',
					'right transition',
					'right1 transition'
				]

				questionList.forEach(function(list, i) {

					if (currentIndex > i) {
						questionList[i].className = classList[0]
					} else if (currentIndex < i) {
						questionList[i].className = classList[4]
					}

					(questionList[currentIndex + 1] || questionList[0])['className'] = classList[3];
					(questionList[currentIndex + 2] || questionList[1])['className'] = classList[4];
					(questionList[currentIndex - 1] || questionList[questionList.length - 1])['className'] = classList[1];
					//(questionList[currentIndex - 2] || questionList[questionList.length - 2])['className'] = classList[0];
				})



				questionList[currentIndex].className = classList[2];
				s.questionList = questionList.concat([]);
			},

			pass(){
				this.showResultPage = false;
			},

			gotoSubmitPage(){
				this.showResultPage = false;
			},

			submit(){
				var  s = this;

				if(this.isSubmit){
					return;
				}

				if(this.isAndroid){
					this.$refs['mobile'].blur();
				}


				if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					this.errorMsg = this.mobile.length<=0 ? '手机号不能为空':'手机号格式不正确';

					setTimeout(() => {
						this.errorMsg = '';
					}, 1200);
					return;
				}

				axios.post(this.host+'/xhs-security-activity/activity/user/saveUser',{
					"secretKey": s.secretKey, // 请求秘钥
					"nm": "meeting2019", // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
					uname:s.nickname||"新华社网友",
					unickName:s.nickname||"新华社网友",
					uphone:s.mobile,
					zipCode:'100031',
					correctRatio:parseInt(s.rightCount / (s.questionList.length - 1)*100)+'%'

				}).then((data)=>{
					
					if(typeof data.data === 'string'){
						data = JSON.parse(data.data);
					}
					else {
						data = data.data;
					}

					console.log(data);

					s.successMsg = '提交成功';
					s.mobile = '';
					if(data.rc === 0){

					}else{
						///s.errorMsg =  data.msg;
					}
					s.isSubmit = true;
					setTimeout(() => {
						
						s.successMsg = '';
						s.errorMsg = '';
						s.showPrize = false;
					}, 2000);
 
				})

				
			},
			
			photo(){
				this.showSharePage = true;
				this.html2img();
			},
			blur(e){
				this.$refs['scene'].style.position = 'fixed';
				this.$refs['scene'].style.top = 0;
				//document.body.style.position = 'relative';

			},
			blur1(e){
				this.$refs['scene'].style.position = 'fixed';
				this.$refs['scene'].style.top = 0;
				//document.body.style.position = 'relative';
				if(!this.isAndroid){
					this.$refs['button'].focus();
				}
			},

			focus1(){
				if(!this.isAndroid){
					setTimeout(()=>{
						this.$refs['button'].blur();
					},100)
				}
			},
			focus(e){
				this.$refs['scene'].style.position = 'relative';
				//document.body.style.position = 'fixed';
			},
			
			
		},
	
		mounted() {
			
			var {obserable } = this;
			obserable.on('toggleMain',(data)=>{
				this.show = data.show;
				
			});

			//this.questionList.length = 2;





			
			this.swipeLeft();
			this.swipeRight();

			this.questionList[this.currentIndex].answers = this.questionList[this.currentIndex].answers.sort(()=>{
				return Math.random()>.5;
			});

			this.questionList[this.currentIndex].answers.forEach((item,i)=>{
				if(item.isRight){
					this.questionList[this.currentIndex].rAnswer = i;
				}
			})

			var  s = this;
			window.VConsole && new VConsole();
			//this.initRankScroll();
			
		}
	
	}
</script>
