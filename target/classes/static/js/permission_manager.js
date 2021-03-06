$(function() {
	
	//得到查询的参数
	const queryParams =  function(params) {
			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				parentId:0
			};
			return temp;
		};
	
		
		//初始化子表格(无线循环)
      const InitSubTable = function (index, row, $detail) {
            var parentid = row.id;
            var cur_table = $detail.html('<table></table>').find('table');
            $(cur_table).bootstrapTable({
                url: '/permission/getPermissions',
                method: 'post',
                queryParams: { parentId: parentid },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                clickToSelect: true,
                detailView: true,//父子表
                uniqueId: "id",
                pageSize: 10,
                pageList: [10, 25],
                columns : [ {
                    checkbox : true
                }, {
                    field : 'name',
                    title : '名称',
                    align : 'center',
                }, {
                    field : 'url',
                    title : 'url',
                    align : 'center',
                }, {
                    field : 'icon',
                    title : '图标',
                    align : 'center',
                    formatter: function (value, row, index){ // 单元格格式化函数
                        var text = '-'
                        if(value != null){
                            text = '<span class="'+value+'"></span>&nbsp;' + value;
                        }
                        return text;
                    }
                },
                 {
                    field : 'description',
                    title : '描述',
                    align : 'center',

                }, ],
                //无线循环取子表，直到子表里面没有记录
                onExpandRow: function (index, row, $Subdetail) {
                	InitSubTable(index, row, $Subdetail);
                }
            });
        };
		
    
	//初始化表格
	$('#tb_departments').bootstrapTable({
		url : '/permission/getPermissions', //请求后台的URL（*）
		method : 'post', //请求方式（*）
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		queryParams :{'parentId':0},
		toolbar : '#toolbar', //工具按钮用哪个容器
		striped : true, //是否显示行间隔色
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, //是否显示分页（*）
		sortable : false, //是否启用排序
		sortOrder : "asc", //排序方式
		queryParams : queryParams,//传递参数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 25, //每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
		search : true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch : true,
		showColumns : true, //是否显示所有的列
		showRefresh : true, //是否显示刷新按钮
		minimumCountColumns : 2, //最少允许的列数
		clickToSelect : true, //是否启用点击选中行
		//height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId : "id", //每一行的唯一标识，一般为主键列
		showToggle : true, //是否显示详细视图和列表视图的切换按钮
		cardView : false, //是否显示详细视图
		detailView : true, //是否显示父子表
		columns : [ {
			checkbox : true
		}, {
			field : 'name',
			title : '名称',
			align : 'center',
		}, {
			field : 'url',
			title : 'url',
			align : 'center',
		}, {
            field : 'icon',
            title : '图标',
            align : 'center',
            formatter: function (value, row, index){ // 单元格格式化函数
            	var text = '-'
            	if(value != null){
            		text = '<span class="'+value+'"></span>&nbsp;' + value;
                }
                return text;
            }
        },
		 {
			field : 'description',
			title : '描述',
			align : 'center',

		}, ],
		//注册加载子表的事件。注意下这里的三个参数！
        onExpandRow: function (index, row, $detail) {
        	InitSubTable(index, row, $detail);
        }

	});

	
	$("#btn_delete").click(function() {
		const data = $("table").bootstrapTable('getSelections');
		if (data.length == 1) {
			const id = data[0].id;
			$.post({
				url : '/permission/delete',
				data : { 'id' : id },
				success : function() {
					$('#tb_departments').bootstrapTable('refresh');
				}
			})
		} else {
			alert("请选中一行");
			return false;
		}
	})
	
	
	$("#btn_edit").click(function(){
		const data = $("table").bootstrapTable('getSelections');

        if (data.length == 1) {
            const item = data[0];
            $("input[name=id]").val(item.id);
            $("input[name=name]").val(item.name);
            $("input[name=icon]").val(item.icon);
            $("input[name=url]").val(item.url);
            $("input[name=desc]").val(item.desc);
            $("#isleaf_permission").val(item.isleaf);
            $("#parent_permission").val(item.parentId);
            
        } else {
            alert("请选中一行");
            return false;
        }
        
        
        
        $("#permission_blog").modal("show");
        $.post({
            url:'/permission/getPermissions',
            data:{'isleaf':1},
            success:function(e){
                var optionstring = '';
                $.each(e,function(key,value){  
                    optionstring = optionstring + "<option value=\"" + value.id + "\" >" + value.name + "</option>";  
                });  
                $("#parent_permission").html("<option value=''>请选则父节点</option> "+optionstring); //获得要赋值的select的id，进行赋值  
            }
        })
    })
    
    $("#btn_add").click(function(){
        $("#permission_blog").modal("show");
        $("form")[0].reset();
        $.post({
        	url:'/permission/getPermissions',
        	data:{'isleaf':1},
        	success:function(e){
        		var optionstring = '';
        		$.each(e,function(key,value){  
                    optionstring = optionstring + "<option value=\"" + value.id + "\" >" + value.name + "</option>";  
                });  
                $("#parent_permission").html("<option value='0'>请选则父节点</option> "+optionstring); //获得要赋值的select的id，进行赋值  
        	}
        })
    })
    
    
    
    $(".permission-save").click(function(){
    	
    	
    	$.post({
    		url:'/permission/save',
    		data:$("form").serialize(),
    		success:function(){
    			$("#permission_blog").modal("hide");
    			$('#tb_departments').bootstrapTable('refresh');
    		}
    	})
    	
    })

})