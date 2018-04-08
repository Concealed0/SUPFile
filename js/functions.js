/**封装 ajax 函数
 * @param {String} obj.method http连接方式，POST || GET
 * @param {String} obj.url 发送请求的url
 * @param {Boolean} obj.async 是否为异步请求，true异步 || false同步
 * @param {Object} obj.data 发送的参数，对象类型
 * @param {Function} obj.success ajax发送并成功接受调用的回调函数
 * @author XIE Hui
 */
function ajax(obj) {
	obj.method = obj.method.toUpperCase();
	var request = null;
	if (XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}
	var params = [];
	for (var key in obj.data) {
		params.push(key + '=' + obj.data[key]);
	}
	var send_data = params.join('&');
	if (obj.method === 'POST') {
		request.open(obj.method, obj.url, obj.async);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		request.send(send_data);
	} else if (obj.method === 'GET') {
		request.open(obj.method, obj.url + '?' + send_data, obj.async);
		request.send();
	}
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			obj.success(request.responseText);
		}
	};
}

/**封装 背景图片轮播 函数
 * @param {HTMLElement} obj.div 设置背景图片的 div
 * @param {HTMLCollectionOf<Element>} obj.dots 切换图片按钮 Array
 * @param {Array} obj.dirs 背景图片路径 Array
 * @param {Number} obj.index 背景图片序号
 * @author XIE Hui
 */
function play_pic(obj) {
	obj.imgs_arr = [];
	obj.timer = null;
	obj.play_timer = null;
	init();
	for (var i = 0; i < 4; i++) {
		obj.dots[i].addEventListener('mouseup', mouse_up, false);
	}
	function init() {
		if (obj.imgs_arr[obj.index] == null) {
			init_image();
		}

		obj.dots[obj.index].style.opacity = 1;
		obj.imgs_arr[obj.index].load();
		obj.div.style.opacity = 1;

		obj.timer = setTimeout(set_timer, 5000);
		function set_timer() {
			obj.index++;
			if (obj.index >= 4) {
				obj.index = 0;
			}
			if (obj.imgs_arr[obj.index] == null) {
				init_image();
			}
			obj.div.style.opacity = 0.001;
			clearTimeout(obj.timer);
			clearTimeout(obj.play_timer);
			obj.play_timer = setTimeout(function () {
				obj.imgs_arr[obj.index].load();
				obj.div.style.opacity = 1;
				obj.dots[obj.index].style.opacity = 1;
				for (var i = 0; i < 4; i++) {
					if (i != obj.index) {
						obj.dots[i].style.opacity = 0.5;
					} else {
						obj.dots[i].style.opacity = 1;
					}
				}
			}, 1000);
			obj.timer = setTimeout(set_timer, 5000);
		}
	}
	function init_image() {
		obj.imgs_arr[obj.index] = new Image();
		obj.imgs_arr[obj.index].src = obj.dirs[obj.index];
		obj.imgs_arr[obj.index].load = function () {
			obj.div.style.backgroundImage = 'url(' + this.src + ')';
		};
	}
	function mouse_up(event) {
		event = event ? event : window.event;
		var temp = event.srcElement ? event.srcElement : event.target;
		obj.index = temp.id;
		for (var i = 0; i < 4; i++) {
			if (i != obj.index) {
				obj.dots[i].style.opacity = 0.5;
			} else {
				obj.dots[i].style.opacity = 1;
			}
		}
		clearTimeout(obj.timer);
		clearTimeout(obj.play_timer);
		init();
	}
}