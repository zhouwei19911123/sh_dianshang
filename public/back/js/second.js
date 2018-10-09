$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })
  // 给下拉列表中的 a 添加点击事件(通过事件委托注册) 获取a的文本， 设置给按钮
  $(".dropdown-menu").on("click","a",function(){
    // 获取文本
    var txt = $(this).text();
    // 设置给按钮
    $("#dropdownTxt").text(txt);
    // 获取当前a中存储的id
    var id =$(this).data("id");
    // 设置给name="categoryId" 的input
    $('[name="categoryId"]').val(id);
    // console.log($("#form").data("bootstrapValidator"));
    
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })



})


