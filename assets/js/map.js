(function () {
	var mapUtil = {
		init: function () {
			this.getAllPoints();
			this.initMap();
		},
		initMap: function () {
			var map = new AMap.Map('map', {
				zoom: 4
			});
			var _this = this;
			AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {

				//just some colors
				var colors = [
					"#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
					"#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
					"#651067", "#329262", "#5574a6", "#3b3eac"
				];

				var pathSimplifierIns = new PathSimplifier({
					zIndex: 100,
					//autoSetFitView:false,
					map: map, //所属的地图实例

					getPath: function (pathData, pathIndex) {
						return pathData.path;
					},
					getHoverTitle: function (pathData, pathIndex, pointIndex) {

						if (pointIndex >= 0) {
							//point 
							return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
						}

						return pathData.name + '，点数量' + pathData.path.length;
					},
					renderOptions: {
						pathLineStyle: {
							dirArrowStyle: true
						},
						getPathStyle: function (pathItem, zoom) {

							var color = colors[pathItem.pathIndex % colors.length],
								lineWidth = Math.round(3 * Math.pow(1.1, zoom - 3));

							return {
								pathLineStyle: {
									strokeStyle: color,
									lineWidth: lineWidth
								},
								pathLineSelectedStyle: {
									lineWidth: lineWidth + 1
								},
								pathNavigatorStyle: {
									fillStyle: color
								}
							};
						}
					}
				});

				window.pathSimplifierIns = pathSimplifierIns;


				var flyRoutes = [];


				_this.getAllPoints(d => {


					d.push.apply(d, flyRoutes);

					pathSimplifierIns.setData(d);

					//创建一个巡航器
					var navg1 = pathSimplifierIns.createPathNavigator(10, {
						loop: true,
						speed: 1000000,
						pathNavigatorStyle: {
							width: 24,
							height: 24,
							//使用图片
							content: PathSimplifier.Render.Canvas.getImageContent('./assets/images/plane.png', onload, onerror),
							strokeStyle: null,
							fillStyle: null,
							//经过路径的样式
							pathLinePassedStyle: {
								lineWidth: 4,
								strokeStyle: 'black',
								dirArrowStyle: {
									stepSpace: 15,
									strokeStyle: 'red'
								}
							}
						}
					});

					navg1.start();

					var navg1 = pathSimplifierIns.createPathNavigator(16, {
						loop: true,
						speed: 1000000,
						pathNavigatorStyle: {
							width: 24,
							height: 24,
							//使用图片
							content: PathSimplifier.Render.Canvas.getImageContent('./assets/images/plane.png', onload, onerror),
							strokeStyle: null,
							fillStyle: null,
							//经过路径的样式 
							pathLinePassedStyle: {
								lineWidth: 2,
								strokeStyle: 'black',
								dirArrowStyle: {
									stepSpace: 15,
									strokeStyle: 'red'
								}
							}
						}
					});

					navg1.start();

				});
			});
		},
		points: [],
		host: "https://testactivity.xhsxmt.com",
		secretKey: "e9469538b0623783f38c585821459454",
		anm: '2019扶贫贺卡',
		get_weixinConfig: 'https://testopen.xinhuaapp.com/xhs-security-wechat/wx/getWXConfig',

		getData: function () {
			var data = [
				{
					"name": "北京 -> 乌鲁木齐",
					"path": [
						[116.405289, 39.904987], [87.61792, 43.793308]
					]
				},
				{
					"name": "北京 -> 丽江",
					"path": [
						[116.405289, 39.904987], [100.233002, 26.872053]
					]
				}
			];
			return data;
		},

		getAllPoints: function (fn) {
			var s = this;
			axios({
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				url: s.host + "/xhs-security-activity/activity/giftcard/getAllGiftCardPoints",
				data: JSON.stringify({
					secretKey: s.secretKey,  // 请求秘钥(string, 必填)
					///anm: window.config.anm // 活动标识（string, 必填）
				})
			}).then(data => {
				var dt = data.data;
				if (typeof dt === "string") {
					dt = JSON.parse(dt);
					if (dt.rc * 1 === 0) {
						s.points = dt.data.points;
						//s.createPoint();
						fn && fn(s.points);
					}

				}
			});
		},
	};

	mapUtil.init();

})();