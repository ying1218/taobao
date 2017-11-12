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
/***************floorNav******************/
$(window).scroll(function(){
		var scrollTop=$(this).scrollTop();
			var oFloor =document.getElementById("floorNav");
			//oFloor.style.position="fixed";
		   oFloor.style.top = 460-scrollTop +"px" ;
		if(scrollTop>=460){
			oFloor.style.position="fixed";
			oFloor.style.top = 70 +"px";
		}
/***************floorNav变色******************/		
		var topF = $(".recommend").offset().top - $(".tao_bale").height()/3;
		var topT = $(".tao_home").offset().top - $(".tao_home").height()/3;
		var topS = $(".tao_hot").offset().top - $(".tao_hot").height()/4;
		var topA = $(".tao_guess").offset().top - $(".tao_guess").height()/10;
		
		if(scrollTop>=topF){
			$("#floorNav").find("li").eq(1).addClass("floorcolor").siblings().removeClass("floorcolor");
			
			
		}
		if(scrollTop<topF){
			$("#floorNav").find("li").eq(0).addClass("floorcolor").siblings().removeClass("floorcolor");
			
		}
		if(scrollTop>=topT){
			$("#floorNav").find("li").eq(2).addClass("floorcolor").siblings().removeClass("floorcolor");
			
		}
		if(scrollTop>=topS){
			$("#floorNav").find("li").eq(3).addClass("floorcolor").siblings().removeClass("floorcolor");
			
		}
		if(scrollTop>=topA){
			$("#floorNav").find("li").eq(4).addClass("floorcolor").siblings().removeClass("floorcolor");
	
		}
	
		$("#floorNav").find("li").eq(0).click(function(){
			
			var _top = $(".tao_bale").offset().top;
			$("html,body").stop().animate({"scrollTop":_top},500);
			
		});
		$("#floorNav").find("li").eq(1).click(function(){
			var _top1 =$(".recommend").offset().top;
			$("html,body").stop().animate({"scrollTop":_top1},500);
		});
		$("#floorNav").find("li").eq(2).click(function(){
			var _top2 = $(".tao_home").offset().top;
			$("html,body").stop().animate({"scrollTop":_top2},500);
		});
		$("#floorNav").find("li").eq(3).click(function(){
			var _top3 = $(".tao_hot").offset().top;
			$("html,body").stop().animate({"scrollTop":_top3},500);
		});
		$("#floorNav").find("li").eq(4).click(function(){
			var _top3 = $(".tao_guess").offset().top;
			$("html,body").stop().animate({"scrollTop":_top3},500);
		});
		$("#floorNav").find("li").eq(5).click(function(){
			$("html,body").stop().animate({"scrollTop":0},600);
		});
		if(scrollTop>=$(".market").offset().top){
        	$("#search").css("display","block");
        }
        if(scrollTop<$(".market").offset().top){
        	$("#search").css("display","none");
        }
		
});
/***************头部广告区******************/
$.get('json/json.json',function(data){
	
	for(var i =0;i<4;i++){
		var str=`<p>${data[i].name}<span>${data[i].title}</span></p>
				<img src="${data[i].src}" alt="" />`;
	$(".discount_m").find("a").eq(i).html(str);
	if(i==1){
		$(".discount_m5").find("h5").before(str);
	}
	
	}
})
/***************搜索框******************/
$(".search_m").find("p").eq(0).find("a").click(function(){
	$(this).addClass("search_baby").siblings().removeClass("search_baby");
});
(function(){
	var oTxt =document.getElementById("txt");
	var aTxt =document.getElementById("text");
	oTxt.oninput = function(){
		$osec = $("#search_mhid");
		var val = $("#txt").val();
		foo(val,$osec);
	}
	aTxt.oninput =function(){
		$osec = $("#search_mhid1");
		var val = $("#text").val();
		foo(val,$osec);
	}
	
	function foo(val,$osec){
		$(".icon-fangdajing").css("display","none");
		$osec.fadeIn();
		
				$.ajax({
					type: "get",
					url: "https://suggest.taobao.com/sug?code=utf-8&q="+val+"&callback=?&k=1&area=c2c&bucketid=2",
					async: true,
					dataType: "jsonp",
					success: function(data) {
						var data =data.result;
						var str="";
						for(var i=0;i<data.length;i++){
							str+=`<li>${data[i][0]}</li>`;
						}
                    $osec.html(str);
                 
                    if(data.length==0){
    $osec.css("display","none");                
                    }
                    if(val==0){
    $osec.css("display","none");               	
                    	$(".icon-fangdajing").css("display","block");
                    }
                     $("#txt").focus(function(){
                    if(val>0){
	$osec.css("display","block");
	
                    }
                    });
					   $("#txt").blur(function(){
         $osec.css("display","none");
        
                    
                    });
					}
				});

	}

})();

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
                 for(var i=0;i<4;i++){
                 	var str="";
                 	for(var j=0;j<data[i].list.length;j++){
                 		var odata=data[i].list;
                 		str+=`<a href="">${odata[j].name}</a>`;
                 	}
                   $(".top_wnav").find("li").eq(i).find("p").html(str);	
                 }
                 
				}
			});	
/***********轮播区导航****************/		
$.ajax({
				type:"get",
				url:"https://tce.alicdn.com/api/data.htm?callback=?&ids=175785",
				async:true,
				dataType:"jsonp",
				success:function(data){
				var data=data[175785].value.map[0].list;
				var str="";
                 for(var i =0;i<12;i++){
                 	str+=`<p><a href=""></a>/<a href=""></a>/<a href=""></a> <span>＞</span></p>`;	 
                 }
       $(".market_list").find("p").eq(0).before(str);
                for(var j=0;j<data.length;j++){
                		var srr="";
                   srr += data[j].name;$(".market_list").find("p").find("a").eq(j).html(srr);
                  
                }
        $(".market_list").find("p").hover(function(){
        	$(".market_hid").stop().fadeToggle();
        })
        $(".market_hid").hover(function(){
        	$(this).stop().fadeToggle() ;
        })
        
		}			
	});	
			
/***********隐藏区****************/
$.ajax({
				type:"get",
				url:"https://tce.alicdn.com/api/data.htm?callback=?&ids=175785",
				async:true,
				dataType:"jsonp",
				success:function(data){
				var data=data[175785].value.map[0].list;
              
                 	var str="";
                 	for(var j=0;j<data.length;j++){
                 		str+=`<a href="">${data[j].name}</a>`;
                 	}
                   $(".market_hidm").find("div").html(str);	
                 }
                 
			});	
$.get('json/json.json',function(data){
	var srr="";
	for(var i=0;i<6;i++){
		srr+=`<li><img src="${data[i].src}" alt="" /><p>${data[i].name}</p></li>`
	}
	$(".market_hidimg").html(srr);
})
			
			

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
/***********今日推荐****************/	
$.ajax({
				type:"get",
				url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1947675&tce_vid=1&tid=&tab=&topic=&count=&env=online",
				async:true,
				dataType:"jsonp",
				success:function(data){
				var data=data.result[1947675].result;
				var str="";
                  for(var i =0;i<4;i++){
                  	str+=`<li>		
					<h3><span>${data[i].categoryName}</span><em>暂无评价</em></h3>
					<div class="recommend_img">
						<img src="${data[i].picThumb}" alt="" />
						<a><img src="${data[i].pic1}" alt="" /><img src="${data[i].pic2}" alt="" /></a>
					</div>
    			</li>`
                  }
                 $(".recommend_list").html(str);
					
				}
			});		
/***********时尚爆料王****************/	
$.ajax({
				type:"get",
				url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952103&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=1ZVpEhbRsnUCAQHA8nyEyiDd",
				async:true,
				dataType:"jsonp",
				success:function(data){
				//var data=data.result[1947675].result;
					var data=data.result[1952103].result[0].item;
					var str="";
					for(var i=0;i<data.length;i++){
						str+=`<li>
								<p>${data[i].title}</p>
								<p>${data[i].subTitle}</p>
								<p><img src="${data[i].img1}" alt="" /><img src="${data[i].img2}" alt="" /></p>
							</li>`
					}
					$(".tao_fashion_l").find("ul").html(str);
					$(".tao_home_l").find("ul").find("li").eq(2).after(str);
					$(".tao_home_r").find("ul").find("li").eq(2).after(str);
				}
			});		
/***********实惠专业户****************/	
   $.ajax({
				type:"get",
				url:"https://tce.taobao.com/api/mget.htm?callback=?&tce_sid=1952106&tce_vid=1&tid=&tab=&topic=&count=&env=online&cna=1ZVpEhbRsnUCAQHA8nyEyiDd",
				async:true,
				dataType:"jsonp",
				success:function(data){
				var data=data.result[1952106].result[0].item;
					var str="";
					for(var i=0;i<data.length;i++){
						str+=`<li>
								<p>${data[i].bizName}</p>
								<p><img src="${data[i].img1}" alt="" /><a href=""><em>${data[i].title}</em><em>${data[i].subTitle}</em><em>${data[i].point}</em></a></p>
							</li>`
					}
					$(".tao_solid").find("ul").html(str);
				}
			});		       
/***********热卖单品****************/
$.ajax({
				type:"get",
				url:"https://textlink.simba.taobao.com/lk?_ksTS=1510384900231_3152&callback=?&pid=619362_1007",
				async:true,
				dataType:"jsonp",
				success:function(data){
				    var odata=data.data;
					var str="";
					for(var i=0;i<20;i++){
						str+=`<a href="#">${odata[i][0]}</a>`
					}
					$(".tao_hot_t").html(str);
				}
			});		
/***********热卖单品商品列表****************/
$.ajax({
				type:"get",
				url:"https://tns.simba.taobao.com/?name=tcmad&st_type=5_8&o=m&count=10&pid=430406_1007&_ksTS=1510390069697_3332&p4p=?",
				async:true,
				dataType:"jsonp",
				success:function(data){
					var data=data.data[0].adList;
                    var str="";
					for(var i=0;i<data.length;i++){
						str+=`<li>
						<img src="${data[i].TBGOODSLINK}" alt="" />
						<h3>${data[i].TITLE}</h3>
						<h3>${data[i].SHORTTITLE}</h3>
						<p>评价 <span>${data[i].STATICSCORE}</span>　 
						收藏 <span>${data[i].GRADE}</span></p>
						<p><span class="iconfont icon-qian">${data[i].PROMOTEPRICE}</span>
						<em>月销${data[i].SELL}笔</em></p>
		</li>`;
					}
					$(".tao_hot").find("ul").html(str); 
						
				}
			});		

/***********广告栏区****************/
$.ajax({
				type:"get",
				url:"https://ecpm.tanx.com/ex?o=jsonp&i=mm_12852562_1778064_32582817&cg=f32a401a46daf822fe1564a78c6817bf&pvid=f29b8f362bfb04a96f84cf8638e853d7&nk=&_ksTS=1510391646009_3259&cb=?",
				async:true,
				dataType:"jsonp",
				success:function(data){
					var data=data.adList;
					var str="";
					for(var i =0;i<data.length;i++){
						str+=`<img src="${data[i].imgurl}" alt="" />`
					}
					$(".tao_adlist").html(str);
				}
			});		

/*--------------猜你喜欢---------------*/
$.get('json/list.json',function(data){
	var str="";
	for(var i in data) {
						str+=`<li>
						<img src="${data[i].imgsrc}" alt="" />
						<h3>${data[i].title}</h3>
						<p><span class="iconfont icon-qian">${data[i].price}</span>
						<em>销量 : ${data[i].conut}</em></p>
		</li>`;
				}
	    $(".tao_guess").find("ul").html(str);
	    $(".tao_guess").find("ul").find("li").eq(11).after(str);
	    var num=0;
	$(window).scroll(function(){
		var scrollTop=$(this).scrollTop();
		var disTop = $(".tao_guess").offset().top;
		if(scrollTop>=disTop){
			num++;
		if(num<=4){
			$(".tao_guess").find("ul").find("li").eq(20).after(str);
		  }
		}
		
	})
});
/*--------------footer---------------*/


})		

