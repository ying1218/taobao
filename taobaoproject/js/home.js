$(function(){
	$("header").find(".top_area").hover(function(){
		$(this).find("ul").css("display","block");
	},function(){
		$(this).find("ul").css("display","none");
	});
	
/****************轮播图************************/	
(function($,undefined){
				$.fn.slider = function(opts){
					var defaults = {
						width:518,
						height:280,
						direction:"left",
						interval:4000,
						showNav:false,
						showBtns:false
					};
				
					var options = $.extend(true,{},defaults,opts);
					
					function Slider(options){
						this.ele = $("#sliderBox");
						this.lists = $("#sliderList");
						this.nav = $("#sliderNav");
						this.btns = $("#sliderBtns");
						this.lists.find("li").eq(0).clone(true).appendTo(this.lists);
						this.list = this.lists.find("li");
						this.ele.css({"width":options.width,"height":options.height});
						this.list.css({"width":options.width,"height":options.height});
						this.list.find("img").css({"width":options.width,"height":options.height});
						this.btns.find(".btn").css("top",((options.height/2)-20));
						
						switch(options.direction){
							case "top":
								this.topBottom();
								break;
							default:
								this.leftRight();
						}
						if(options.showNav){
							this.nav.show();
						}
						if(options.showBtns){
							this.btns.show();
						}
					}
					Slider.prototype.leftRight = function(){
						this.lists.css({"width":options.width*this.list.length,"height":options.height});
						this.list.css("float","left");
						this.timer = setInterval(move,options.interval);
						var _this = this;
						var index = 0;
						function move(){
							index++;
							if(index == _this.list.length){
								index = 1;
								_this.lists.css("left",0);
							}
							if(index==_this.list.length-1){
								_this.nav.find("li").eq(0).addClass("hover").siblings().removeClass("hover");
							
							}else{
								_this.nav.find("li").eq(index).addClass("hover").siblings().removeClass("hover");	
							}
							_this.lists.stop().animate({"left":-index*options.width},1000,function(){
	
							});
							
						}
						
						this.nav.find("li").click(function(){
							clearInterval(_this.timer);
							index = $(this).index()-1;
							move();
						});
						this.nav.find("li").mouseleave(function(){
							clearInterval(_this.timer);
						_this.timer = setInterval(move,3000);	
						});
						this.btns.find(".btn").eq(0).click(function(){
							clearInterval(_this.timer);
							move();
							_this.timer = setInterval(move,3000);
						})
						this.btns.find(".btn").eq(1).click(function(){
							clearInterval(_this.timer);
							console.log(index);
							if(index==0){
								index = _this.list.length-3;
								_this.lists.css("left",(-(_this.list.length-1))*options.width);
							}else{
								index = index -2;
							}
							move();
							_this.timer = setInterval(move,3000);
						})
						
						
						
					}
					Slider.prototype.topBottom = function(){
						
					}
					
					new Slider(options);
					return this;
				}
				
				
			})(jQuery)
			
			$("#sliderBox").slider({showNav:true,showBtns:true});

/***************公告下小图标******************/
		$.ajax({
				type:"get",
				url:"https://tce.alicdn.com/api/mget.htm?callback=?&tce_sid=1947680,1947683&tce_vid=0,0&tid=,&tab=,&topic=,&count=,&env=online,online",
				async:true,
				dataType:"jsonp",
				success:function(data){
					var data=data.result[1947683].result;
					str="";
					for(var i =0;i<10;i++){
						str+=`<a href="${data[i].link}"><img src="${data[i].img}"/></a>`;
					}
					$(".top_liner_img").html(str);
				}
			});
/***********头部导航****************/
	$.ajax({
				type:"get",
				url:"https://tce.alicdn.com/api/data.htm?callback=?&ids=175785",
				async:true,
				dataType:"jsonp",
				success:function(data){
				var data=data[175785].value.map;
					var data1=data[0].list;
//					console.log(data,data1);	
				}
			});	
/***********tao_go****************/	
	$.get('json/json.json',function(data) {
		var sst="";
		for(let j=0;j<7;j++){
			sst+=`<li><a href="#">
     				<span><img src="${data[j].src}" alt="" /></span>
     				<p><b>${data[j].name}</b><em>${data[j].title}</em></p>
     			</a></li>`;		
		}
		$(".tao_gotwo").find("ul").html(sst);
	});
	
/***********淘生活****************/		
	$.ajax({
			type:"get",
			url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1949464&tce_vid=2&tid=&tab=&topic=&count=&env=online&cna=1ZVpEhbRsnUCAQHA8nyEyiDd&pageSize=6",
			async:true,
			dataType:"jsonp",
			success:function(data){
	        var data=data.result[1949464].result[0].item;
	        var oLiv="";
	        for(var i=0;i<data.length;i++){
	        	
	        oLiv +=	`<li>
     			<a href="#"><img src="${data[i].picUrl}"/></a>
     			<div class="tao_life_list1"><a href="#">${data[i].title}</a><span>${data[i].subtitle}</span><span class="iconfont icon-likefill">人气${data[i].pop}</span></div>
     		</li>`;
	        }
	     $(".tao_life_list").html(oLiv);
	    }
	});
/***********好有货****************/	
   $(".icon-erweima").hover(function(){
   	   $(".tao_balet_hid").stop().slideDown(200);
   },function(){
   	   $(".tao_balet_hid").stop().slideUp(200);
   });
   /******商品列表*****/
   $.ajax({
				type:"get",
				url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1947676&tce_vid=1&tid=&tab=&topic=&count=&env=online&startIndex=0&pageSize=6",
				async:true,
				dataType:"jsonp",
				success:function(data){
                var data=data.result[1947676].result;
                var btr="";
                for(var i=0;i<data.length;i++){
                 btr +=`<li><a href="#"><img src="${data[i].pic}" alt="" /></a>
    				<p><a href="">${data[i].title}</a>
 					<span>${data[i].content}</span>
    					<span class="iconfont icon-emoji">${data[i].zanTotal} 人说好</span>
    				</p>
    			</li>` 
                }
			$(".tao_bale_list").html(btr);
	    }
	});
/******商品列表2*****/
   $.ajax({
				type:"get",
				url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952191&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=1ZVpEhbRsnUCAQHA8nyEyiDd",
				async:true,
				dataType:"jsonp",
				success:function(odata){
                var odata=odata.result[1952191].result[0].item;
                var ctr="";
                for(var i=0;i<6;i++){
                	var data1=odata[i].data;
                 ctr +=`<li><a href="#"><img src="${data1.cover}" alt="" /></a>
    				<h3><a href="">${data1.desc}</a>
					<span><img src="${data1.forwardUserAvatar}" alt="" />
					<em>${data1.forwardUserName}</em></span>
    				</h3>
    			</li>` 
                }
			$(".tao_bale_list_r").html(ctr);
	    }
	});




})		

