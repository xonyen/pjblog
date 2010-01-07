﻿<%
Dim Plugin
Set Plugin = New Sys_Plugin

Class Sys_Plugin

	Public plugin_ID, plugin_Mark, plugin_version, plugin_PJBlogSuitVersion, plugin_pubDate, plugin_ModDate, plugin_author_name, plugin_author_url, plugin_author_email, plugin_info, plugin_navid, plugin_setPath, plugin_backPath, plugin_folder, plugin_name, plugin_pubUrl, plugin_stop, plugin_system
	
	Private Arrays, cStream

	' ***********************************************
	'	类初始化
	' ***********************************************
	Private Sub Class_Initialize
    End Sub 
     
	' ***********************************************
	'	类终结化
	' ***********************************************
    Private Sub Class_Terminate
    End Sub
	
	Private Function PluginHead(ByVal Str)
		PluginHead = "/*---------------------------------plugin_Start_" & Trim(Str) & "------------------------------------*/"
	End Function
	
	Private Function PluginBottom(ByVal Str)
		PluginBottom = "/*---------------------------------plugin_End_" & Trim(Str) & "------------------------------------*/"
	End Function
	
	Private Function ContentHead
		ContentHead = "/* -------------------- pluginstart -------------------- */"
	End Function
	
	Private Function ContentBottom
		ContentBottom = "/* -------------------- pluginend -------------------- */"
	End Function
	
	Public Function WritePluginAsp(ByVal Key, ByVal InsertValue)
		Set cStream = New Stream
			Dim Content
			Content = cStream.LoadFile("../plugin.asp")
			If (InStr(Content, ContentHead) = 0) Or (InStr(Content, ContentBottom) = 0) Then
				WritePluginAsp = Array(False, "系统插件配置文件损坏!")
				Exit Function
			End If
			Dim PluginContent, Top, Bottom, Selfvalue, AspBody, SaveFile
			Top = Split(Content, ContentHead)(0) & ContentHead
			Bottom = ContentBottom & Split(Content, ContentBottom)(1)
			' 	得到插件部分内容
			PluginContent = Split(Split(Content, ContentHead)(1), ContentBottom)(0)
			'	验证插件是否安装
			If (InStr(PluginContent, PluginHead(Key)) <> 0) And (InStr(PluginContent, PluginBottom(Key)) <> 0) Then
				WritePluginAsp = Array(False, "插件已安装!")
				Exit Function
			End If
			'	安装插件代码
			Selfvalue = PluginHead(key) & vbcrlf & InsertValue & vbcrlf & PluginBottom(Key) & vbcrlf
			AspBody = Top & PluginContent & Selfvalue & Bottom
			SaveFile = cStream.SaveToFile(AspBody, "../plugin.asp")
		Set cStream = Nothing
		If SaveFile(0) = 0 Then
			WritePluginAsp = Array(True, "写入文件成功!")
		Else
			WritePluginAsp = Array(False, SaveFile(1))
		End If
	End Function
	
	Public Function RemovePluginAsp(ByVal Key)
		Set cStream = New Stream
			Dim Content
			Content = cStream.LoadFile("../plugin.asp")
			If (InStr(Content, ContentHead) = 0) Or (InStr(Content, ContentBottom) = 0) Then
				RemovePluginAsp = Array(False, "系统插件配置文件损坏!")
				Exit Function
			End If
			Dim PluginContent, Top, Bottom, AspBody, SaveFile
			If (InStr(Content, PluginHead(Key)) = 0) Or (InStr(Content, PluginBottom(Key)) = 0) Then
				RemovePluginAsp = Array(False, "插件未安装!")
				Exit Function
			End If
			Top = Split(Content, PluginHead(Key))(0)
			Bottom = Split(Content, PluginBottom(Key))(1)
			AspBody = Top & Bottom
			SaveFile = cStream.SaveToFile(AspBody, "../plugin.asp")
		Set cStream = Nothing
		If SaveFile(0) = 0 Then
			RemovePluginAsp = Array(True, "写入文件成功!")
		Else
			RemovePluginAsp = Array(False, SaveFile(1))
		End If
	End Function
	
	Public Function install
		Arrays = Array(Array("plugin_Mark", plugin_Mark), Array("plugin_version", plugin_version), Array("plugin_PJBlogSuitVersion", plugin_PJBlogSuitVersion), Array("plugin_pubDate", plugin_pubDate), Array("plugin_ModDate", plugin_ModDate), Array("plugin_author_name", plugin_author_name), Array("plugin_author_url", plugin_author_url), Array("plugin_author_email", plugin_author_email), Array("plugin_info", plugin_info), Array("plugin_navid", plugin_navid), Array("plugin_setPath", plugin_setPath), Array("plugin_backPath", plugin_backPath), Array("plugin_folder", plugin_folder), Array("plugin_name", plugin_name), Array("plugin_pubUrl", plugin_pubUrl), Array("plugin_stop", plugin_stop), Array("plugin_system", plugin_system))
		install = Sys.doRecord("blog_Module", Arrays, "insert", "plugin_ID", "")
	End Function
	
	Public Sub SetInsert(ByVal KeyName, ByVal KeyValue, ByVal KeyMark)
		If Len(KeyName) = 0 Or Len(KeyMark) = 0 Then
			Exit Sub
		End If
		Arrays = Array(Array("xml_name", KeyMark), Array("xml_key", KeyName), Array("xml_value", KeyValue))
		Sys.doRecord "blog_modsetting", Arrays, "insert", "xml_id", ""
	End Sub

End Class
%>