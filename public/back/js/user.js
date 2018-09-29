$(function(){
  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;

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

// 通过事件委托绑定， 点击启用 禁用按钮，显示模态框
 $("tbody").on("click",".btn",function(){
   $("#userModal").modal("show");
   currentId = $(this).parent().data("id");

   isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
 });

//  点击模态框的确定按钮，实现修改用户状态,发送ajax请求
$("#submitBtn").on("click",function(){
  $.ajax({
    type:"post",
    url:"/user/updateUser",
    data:{
      id:currentId,
      isDelete : isDelete
    },
    dataType:"json",
    success:function(info){
      if(info.success){
        $("#userModal").modal("hide");
        reader();
      }
    }
  })
})



})