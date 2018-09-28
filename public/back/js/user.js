$(function(){
  var currentPage = 1;
  var pageSize = 5;

  reader();
 function reader (){
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
      dataType:"json",
      success:function(info){
       
      var htmlStr = template("tmp",info);
      $('tbody').html(htmlStr);
      // console.log(htmlStr)

      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage: info.page,
        totalPages:Math.ceil(info.total / info.size),
        onPageClicked:function(a, b, c, page){
          currentPage = page;
          reader();
        }
      })
    }
  })
 }

})