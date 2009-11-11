﻿// JavaScript Document
function Check(){
	init();
	function init(){
		
	}
	// 用户
	this.User = {
		GetCode : function(Str, id){
			$(id).innerHTML = "<img id=\"vcodeImg\" src=\"about:blank\" onerror=\"this.onerror=null;this.src='" + Str + "?s='+Math.random();\" alt=\"" + lang.Set.Asp(4) + "\" title=\"" + lang.Set.Asp(5) + "\" style=\"margin-right:40px;cursor:pointer;width:40px;height:18px;margin-bottom:-4px;margin-top:3px;\" onclick=\"src='" + Str + "?s='+Math.random()\"/>";
		},
		CheckCode : function(FormObj, ToObj){
			var CheckValue = $(FormObj).value.trim();
			if (CheckValue.length >= 4){
				Ajax({
				  url : "../pjblog.logic/log_Ajax.asp?action=CheckCode&s=" + Math.random(),
				  method : "GET",
				  content : "",
				  oncomplete : function(obj){
						var bvalue = obj.responseText.trim();
						if (bvalue == CheckValue){
							$(ToObj).innerHTML = "<img src=\"../images/check_right.gif\" />";
						}else{
							$(ToObj).innerHTML = "<img src=\"../images/check_error.gif\" />";
						}
				  },
				  ononexception:function(obj){
					  alert(obj.state);
				  }
			   	});
			}
		}
	}
	// 分类
	this.Category = {
		Add : function(obj){
			_obj = obj;
			obj.innerHTML = "正在提交...";
			obj.disabled = true;
			var new_order = $("new_order").value;
			var new_icon = $("new_icon").options[$("new_icon").options.selectedIndex].value;
			var new_name = $("new_name").value;
			var new_Intro = $("new_Intro").value;
			var new_Part = $("new_Part").value;
			var new_URL = $("new_URL").value;
			var new_local = $("new_local").options[$("new_local").options.selectedIndex].value;
			var new_Secret = $("new_Secret").options[$("new_Secret").options.selectedIndex].value;
			
			
			if ((new_order.legnth < 1) || (!/^\d+$/.test(new_order))){alert("您所填写的排序格式不正确!");$("new_order").select();obj.innerHTML = "保存新分类" ; obj.disabled = false; return;}
			if (new_icon.length < 1){alert("您所选择的图标不正确!"); obj.innerHTML = "保存新分类" ; obj.disabled = false; return;}
			if (new_name.length < 2){alert("标题格式不正确或为空, 标题应大于2位字符!"); $("new_name").select(); obj.innerHTML = "保存新分类" ; obj.disabled = false; return;}
			
			
			Ajax({
				url : "../pjblog.logic/control/log_category.asp?action=add&s=" + Math.random(),
				method : "POST",
				content : "cate_Order=" + escape(new_order) + "&cate_icon=" + escape(new_icon) + "&cate_Name=" + escape(new_name) + "&cate_Intro=" + escape(new_Intro) + "&cate_Folder=" + escape(new_Part) + "&cate_URL=" + escape(new_URL) + "&cate_local=" + escape(new_local) + "&cate_Secret=" + escape(new_Secret),
				oncomplete : function(obj){
					var json = obj.responseText.json();
					if (json.Suc){
						Box.selfWidth = true;
						Box.selefHeight = true;
						var layer = Box.FollowBox($("AddRowMark_del"), $("AddRowMark_del").offsetWidth, $("AddRowMark_del").offsetHeight, 0, "保存新分类成功!");
						layer.className = "opacity";
						layer.style.cssText += "; margin:0 auto; text-align:center; line-height:30px; font-size:11px; color:#000000; font-weight:bolder";
						layer.id = "layerTip";
						setTimeout("$('layerTip').parentNode.removeChild($('layerTip'))", 2000);
						
						$("AddRowMark_del").style.backgroundColor = "#ffffff";
						_obj.disabled = false;
						
						if (new_URL.length > 0){
							$("new_Secret").disabled = true;
							var _hidden = document.createElement("div");
							_hidden.innerHTML = "<input type=\"hidden\" value=\"0\" name=\"cate_Secret\">";
							$("new_Secret").parentNode.appendChild(_hidden);
						}
						
						// --------------------------------------------------
						var checkbox = document.createElement("div");
						checkbox.innerHTML = "<input type=\"checkbox\" value=\"" + json.Info.trim() + "\" name=\"SelectID\" /><input type=\"hidden\" value=\"" + json.Info.trim() + "\" name=\"Cate_ID\" />";
						$("new_selectid").parentNode.replaceChild(checkbox, $("new_selectid"));
						// --------------------------------------------------
						var _div = document.createElement("div");
						_div.innerHTML = "<input type=\"text\" class=\"text\" name=\"cate_count\" value=\"0\" size=\"2\" readonly=\"readonly\" style=\"background:#ffe\"/> 篇";
						_obj.parentNode.replaceChild(_div, _obj);
						
						$("AddRowMark_del").id = "";
						$("new_order").id = "";
						$("new_icon").id = "";
						$("new_name").id = "";
						$("new_Intro").id = "";
						$("new_Part").id = "";
						$("new_URL").id = "";
						$("new_local").id = "";
						$("new_Secret").id = "";
						try{$("Addbutton").disabled = false}catch(e){}
					}else{alert(json.Info);_obj.disabled = false; _obj.innerHTML = "保存新分类" ;}
				},
				ononexception:function(obj){
					alert(obj.state);
				}
			});
		}
	},
	this.Clear = function(obj){
		var _obj = obj;
		$("clearTr").style.display = "block";
		_obj.disabled = true;
		Ajax({
		  url : "../pjblog.logic/control/log_category.asp?action=clear&s=" + Math.random(),
		  method : "GET",
		  content : "",
		  oncomplete : function(obj){
				var value = obj.responseText;
				$("clear").innerHTML = value;
				_obj.disabled = false;
		  },
		  ononexception:function(obj){
			  alert(obj.state);
		  }
		});
	},
	this.Static = {
		AddRow : function(obj, Mark, offset){
			try{$("StaticPre").parentNode.removeChild($("StaticPre"));}catch(e){}
			var Static = new TableAddRow(obj);
			Static.Mark = Mark;
			var Row = Static.AddRow(offset);
			Row.id = "StaticPre";
			var td = Row.insertCell(0);
			var div = document.createElement("div")
			td.appendChild(div);
			div.innerHTML = "&nbsp;";
			td = Row.insertCell(1);
			td.setAttribute("colspan", 4); // 并列4行
			div = document.createElement("div");
			var t = div;
			td.appendChild(div);
			td = Row.insertCell(2);
			div = document.createElement("div");
			td.appendChild(div);
			div.innerHTML = "&nbsp;";
			return t;
		},
		CheckboxDisabled : function(T){ // 设置所有checkbox属性
			var s = document.getElementsByTagName("input");
			for (var i = 0 ; i < s.length ; i++){
				if (s[i].type == "checkbox") s[i].disabled = T;
			}
		},
		CheckboxChecked : function(_this){
			var s = document.getElementsByTagName("input");
			for (var i = 0 ; i < s.length ; i++){
				if (s[i].checked) s[i].checked = false;
			}
			_this.checked = true;
		},
		index : function(obj, Mark, offset, _this){
			this.CheckboxChecked(_this);
			var element = this.AddRow(obj, Mark, offset);
			element.style.cssText += "; border: 1px solid #7FCAE2; padding:10px 10px 10px 10px; max-height:200px; overflow:auto";
			var c = "<div class=\"static\">";
			c += "<div class=\"staticHead\"><span class=\"left\">首页静态化过程内容较多, 请耐心等待...</span><span class=\"right\">Saved : html/index.html</span></div>";
			c += "<div class=\"staticBody\">正在生成首页静态文件...<br />生成首页静态文件成功!<br /><input type=\"button\" value=\"开始生成\" class=\"button\"></div>";
			c += "</div>"
			element.innerHTML = c;
		},
		Article : function(obj, Mark, offset, _this){
			this.CheckboxChecked(_this);
			var element = this.AddRow(obj, Mark, offset);
			element.style.cssText += "; border: 1px solid #7FCAE2; padding:10px 10px 10px 10px;";
			var c = "<div class=\"static\">";
			c += "<div class=\"staticHead\"><span class=\"left\">内容页静态化过程内容较多, 请耐心等待...</span><span class=\"right\">Total : 8 piece Local : 2 </span></div>";
			c += "<div class=\"staticBody\"><ol>";
			c += "<li><span class=\"left\">我们那年孩提时的欢乐与快乐</span><span class=\"right\">html/xxx/xxxxxx.html</span></li>";
			c += "<li><span class=\"left\">我们是一群啊师傅很骄傲是阿使客户科技的罚款.</span><span class=\"right\">html/xxx/xxxxxx.html</span></li>";
			c += "<li><span class=\"left\">的萨菲哈市飞机的故事飞机干啥借古讽今尸鬼封尽的萨嘎飞机国际</span><span class=\"right\">html/xxx/xxxxxx.html</span></li>";
			c += "<li><span class=\"left\">阿瑟的饭局上好按时开放后开始的发行可还是阿海珐开始的恢复说得好</span><span class=\"right\">html/xxx/xxxxxx.html</span></li>";
			c += "<li><span class=\"left\">的说法很快分哈市开发和卡萨幅度十分看好爱的身份还是开发和卡斯</span><span class=\"right\">html/xxx/xxxxxx.html</span></li>";
			c += "</ol>";
			c += "<div><input type=\"button\" value=\"开始生成\" class=\"button\"></div></div>";
			c += "</div>";
			element.innerHTML = c;
		},
		Category : function(obj, Mark, offset, _this){
			this.CheckboxChecked(_this);
			var element = this.AddRow(obj, Mark, offset);
			element.style.cssText += "; border: 1px solid #7FCAE2; max-height:200px; overflow:auto; padding:10px 10px 10px 10px;";
			var c = "<div class=\"static\">";
			c += "<div class=\"staticHead\">首页静态化过程内容较多, 请耐心等待...</div>";
			c += "<div class=\"staticBody\">adsfsdf</div>";
			c += "</div>"
			element.innerHTML = c;
		}
	}
}
var CheckForm = new Check();