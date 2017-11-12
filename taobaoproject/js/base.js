$(function(){
	$("header").find(".top_area").hover(function(){
		$(this).find("ul").css("display","block");
	},function(){
		$(this).find("ul").css("display","none");
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
