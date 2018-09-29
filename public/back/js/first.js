$(function(){

  var currentPage = 1;
  var pageSize = 5;

  reader();
  function reader(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage:info.page,
          onPageClicked:function(event, originalEvent, type, page){
            currentPage = page;
            reader();
          }
        })
      }
    })
  }
  
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  })

  $("#form").bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名"
          }
        }
      }
    }
  })

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          $("#addModal").modal("hide");
          reader();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})