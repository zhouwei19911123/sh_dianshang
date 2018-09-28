$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStart(function () {
  NProgress.done();
});

// 公共的效果
$(function(){
  // 二级菜单切换效果
  $(".lt_aside .category").click(function(){
    $(".lt_aside .child").stop().slideToggle();
  });

  // 左侧菜单栏切换
  $(".icon_menu").click(function(){
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_topbal").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  })
})


$(function(){
  $(".icon_logout").click(function(){
    $("#logoutModal").modal("show");
  })
   $("#logoutBtn").click(function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        if(info.success){
          location.href = "login.html"
        }
      }
    })
   })
  })
