﻿<!--#include file="../include.asp" -->
<!--#include file = "../pjblog.common/sha1.asp" -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="UTF-8">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="UTF-8" />
<title>后台管理</title>
<style type="text/css">
body{
	background:#f7f6f6;
	margin:0;
	padding:0;
	color:#056cc9;
	font-family: Arial, Helvetica, sans-serif;
	font-size:12px;
}
.wrap{
	width:606px;
	height:262px;
	background:#f7f6f6 url(../images/Control/log.png) no-repeat;
	margin:0 auto;
	position:relative;
	top:34px;
}

.table{
	position:absolute;
	width:306px;
	height:104px;
	top:60px;
	left:150px;
	line-height:40px;
}

.main{
	margin-top:150px;
	height:262px;
	background:url(../images/Control/log2.png) repeat-x center;
}

</style>
</head>
<%
If memName = Empty Or stat_Admin <> True Then
    RedirectUrl("default.asp")
Else
    If session(Sys.CookieName&"_System") = True Then

%>
    <frameset rows="31,*" framespacing="0" border="0" frameborder="0">
    <frame src="ConHead.asp" scrolling="no" name="Head" noresize>
      <frameset  id="ContentSet" rows="80,*">
      <frame src="ConMenu.asp" name="Menu">
       <frame src="ConContent.asp" name="MainContent" scrolling="yes" noresize>
     </frameset>
    </frameset><noframes></noframes>
    <%
Else

%>
<body>
	<div class="main">
        <div class="wrap">
        	<div class="table">
            <span style="font-weight:700">登入密码:</span>
            <div>
            	<input type="text" value="" class="text" />
            </div>
            </div>
        </div>
    </div>
</body>
  <%
Dim action
action = Asp.CheckStr(Request.Form("action"))
If action = "login" Then
    Dim chUser, getPass
    getPass = Asp.CheckStr(Request.Form("adpass"))
    Set chUser = conn.Execute("SELECT Top 1 mem_Name,mem_Password,mem_salt,mem_Status,mem_LastIP,mem_lastVisit,mem_hashKey FROM blog_member WHERE mem_Name='"&memName&"'")
    If chUser.EOF Or chUser.bof Then
        session(Sys.CookieName&"_ShowError") = lang.Set.Asp(24)
        RedirectUrl("control.asp")
    Else
        If chUser("mem_Password") <> SHA1(getPass&chUser("mem_salt")) Then
            session(Sys.CookieName&"_ShowError") = lang.Set.Asp(24)
            RedirectUrl("control.asp")
        Else
            session(Sys.CookieName&"_System") = True
            RedirectUrl("control.asp")
        End If
    End If
End If
End If
End If
%>
</html>
