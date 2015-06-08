<div class="ui-img-scroll-content">
	<% $.each(data,function(i, img){%>
		<div class="img">
			<% if(img.isHref) {%>
			<a href="<%=img.url%>"><img src="<%=img.img%>" alt="no image"></a>
			<%}else{%>
			<img src="<%=img.img%>" alt="no image">
			<%}%>
		</div>
	<%});%>
	<div class="ui-img-scroll-pages">
	<% $.each(data,function(i, img){%>
		<a class="ui-img-scroll-page <%= i==0 ? 'on':''%>" href="javascript:void(0);"></a>
	<%});%>
	</div>
</div>