$(function () {
	/*video的方法必须要js原生dom对象才能使用 jQuery对象不行*/
	var video = $("video")[0];

	video.oncanplay = function () {

		// 实现播放业务逻辑，当时视频可以播放时触发
		setTimeout(function () {	//设置两秒的延迟 没意义
			//将视频样式设置为显示
			video.style.display = "block";
			//获取当前视频的总时长 （以秒为单位，有小数）
			var total = video.duration;
			//计算当前时间的时分秒
			var result = countTime(total);
			//得到的时分秒通过html放到totalTime里面
			$(".totalTime").html(result);
			}, 1000)

		// 实现播放与暂停事件
		$(".switch").click(function() {
			if(video.paused){ //视频是否暂停
				video.play();  //是的话就播放
			}else {
				video.pause(); //否则就暂停
			}
			// 切换样式 播放与暂停相互切换 如果暂停>>播放， 如果播放>>暂停
			$(this).toggleClass("fa-play fa-pause");
		})

		// 实现全屏事件
		$(".expand").click(function() {
			//不同浏览器添加不同前缀
			if(video.requestFullScreen) {//视频开启全屏
				video.requestFullScreen();
			}else if(video.webkitRequestFullScreen) {//谷歌
				video.webkitRequestFullScreen();
			}else if(video.mozRequestFullScreen) {//火狐
				video.mozRequestFullScreen();
			}else if(video.oRequestFullScreen) {//opera
				video.oRequestFullScreen();
			}else if(video.msRequestFullScreen) {//ie
				video.msRequestFullScreen();
			}
		})

		// 实现播放业务逻辑，当时视频可以播放时触发
	/*	video.oncanplay = function () {
			setTimeout(function () {	//设置两秒的延迟 没意义
				//将视频样式设置为显示
				video.style.display = "block";
				//获取当前视频的总时长 （以秒为单位，有小数）
				var total = video.duration;
				//计算当前时间的时分秒
				var result = countTime(total);
				//得到的时分秒通过html放到totalTime里面
				$(".totalTime").html(result);
			}, 1000)
		}
*/
		//计算时间 返回时分秒
		function countTime(time) {
			var hour = Math.floor(time / 3600);
			//补0操作
			hour = hour < 10 ? ("0" + hour) : hour;
			var minute = Math.floor(time % 3600 / 60);
			minute = minute < 10 ? ("0" + minute) : minute;
			var second = Math.floor(time % 60);
			second = second < 10 ? ("0" + second) : second;
			return hour + ":" + minute + ":" + second
		}

		//实现播放过程的业务逻辑，当视频播放时会触发ontimeupdate
		//当修改currentTime值时，也会触发这个事件
		video.ontimeupdate = function () {
			//获取当前的播放时间	（以秒为单位，有小数）
			var current = video.currentTime;
			//计算当前时间的时分秒
			var result = countTime(current);
			//将结果展示在指定的dom元素中
			$(".currentTime").html(result);
			//设置当前进度条的样式  算出来的是小数 0.12 * 100 + %
			var percent = (current / video.duration) * 100 + "%";
			$(".elapse").css("width", percent);
		}

		//实现视频的跳播
		$(".bar").click(function (e) {
			//获取鼠标相对于父元素的偏移值
			var offset = e.offsetX;
			//计算偏移值相对于父元素宽度的比例
			var percent = offset / $(this).width();
			//计算这个位置对应的视频进度值
			var current = percent * video.duration;
			//设置当前视频的currentTime
			video.currentTime = current;
		})

		//播放完毕，重置播放器状态
		video.onended = function () {
			video.currentTime = 0;
			$(".switch").removeClass("fa-pause").addClass("fa-play");
		}
	}



})