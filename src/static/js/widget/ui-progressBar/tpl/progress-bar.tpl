<%console.log(data);%>
<ul class="ui-progress-bar clearfix"> 
<% for (var i = 0; i < data.barSize; i++) {
    if (i % 2 === 0) {%>
    <li class="progress-item progress-bar-point"></li> 
    <%}else{%> 
    <li class="progress-item bar"></li>
    <%}%>
<%}%>
</ul>
<ul class="ui-progress-text clearfix"> 
<%_.each(data.steps,function(step){%> 
    <li class="progress-item bar">
    <p class="progress-title"><%=step.title%></p>
    <p class="progress-time bar"><%=step.time%></p>
    </li>
    <%});%>  
</ul> 
