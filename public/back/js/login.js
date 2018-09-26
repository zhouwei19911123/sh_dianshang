$(function(){


  //进行表单校验配置
  $('#form').bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
    },
    //配置的校验字段
    fields:{
      username:{
        //配置的校验规则
        validators:{
          //非空校验
          notEmpty:{
            //提示信息
            message:"用户名不能为空"
          },
          //长度校验
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须为2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        //配置校验规则
        validators:{
          //非空
          notEmpty:{
            message:"密码不能为空"
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })


  //通过 submit 按钮进行计较表单，可以让表单校验插件进行校验
  $("#form").on("success.form.bv",function(e){
    // 阻止默认的表单提交
    e.preventDefault();
    //通过ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      //通过表单序列化快速获取表单值
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          //登录成功，跳转到首页
          location.href = "index.html";
        }
        if(info.error === 1000){
          //将表单用户名校验状态从成功更新成失败，并且给用户提示
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          //将表单密码校验状态从成功更新成失败，并且给用户提示
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })

  //添加重置功能
  $('[type="reset"]').click(function(){
    $("#form").data("bootstrapValidator").resetForm();
  })

})