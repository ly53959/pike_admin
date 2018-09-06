// system users get, add, del
$(document).ready(function() {
    var table = $("#tb_users").DataTable({ 
        "paging":true,
        "pagingType":"full_numbers",
        "lengthMenu":[10,25,50],                             
        "processing": true,
        "searching": true, //是否开启搜索
        "serverSide": true,//开启服务器获取数据
        "order": [[ 0, "asc" ]], //默认排序
        "ajax":{ // 获取数据
            "url":"php/init_tb_users.php",
            "dataType":"json" //返回来的数据形式
        },
        "language": {
            "info":         "Showing _START_ to _END_ of _TOTAL_ users",
            "lengthMenu":   "Show _MENU_ users"
        },
        "columns":[ //定义列数据来源
            { 'title':"ID", 'data': 'member_id'},
            { 'title':"Name", 'data': 'member_name'},
            { 'title':"Password", 'data': 'member_password'},//隐藏
            { 'title':"Role", 'data': 'role_id'},
            { 'title':"eMail", 'data': 'email'},
            { 'title':"Phone", 'data': 'phone'},
            { 'title':"Memo", 'data': 'memo'},
            { 'title':"Action", 'data': null,'class':"align-center"} // 自定义列
        ],
        "columnDefs": [ //自定义列
            {
              "targets": -1, //改写哪一列
              "data": "member_id",
              "render": function(data, type, row) {
                var html = "<a id=\"user_edit\" class='btn btn-info btn-sm'  data-toggle='modal' data-target='#modal_edit_user' href='#'><i class='fa fa-pencil' aria-hidden='true'></i></a> " + " <a id=\"user_del\" class='btn btn-danger btn-sm' href='#'><i class='fa fa-trash-o' aria-hidden='true'></i></a>";
                return html;
              }
            },
            {
                "targets":2,
                "visible":false //隐藏列
            },
            {
                "targets":[2, 3, 4, 5, 6, 7],
                "orderable":false  //禁止排序
            },
            {
                "targets":[0, 2, 3, 4, 6, 7],
                "searchable":false //禁止搜索
            }
          ],

    });//table end

    $('#tb_users tbody').on('click', 'a#user_edit', function () {
        var dat = table.row($(this).parents('tr')).data();
       $('#ed_id').val(dat.member_id);
       $('#ed_name').val(dat.member_name);
       $('#ed_role').val(dat.role_id);
       $('#ed_email').val(dat.email);
       $('#ed_phone').val(dat.phone);
       $('#ed_memo').val(dat.memo);

    });

    $('#tb_users tbody').on('click', 'a#user_del', function () {
        var data = table.row($(this).parents('tr')).data();
        if(confirm('Please be sure you will delete record id='+data.member_id+'?')){
            // 确定
            var jsonData={
                "member_id":data.member_id
            };
            $.ajax({
                type:"get",
                url:"php/del_user.php",
                data:jsonData,
                dataType:"json",
                success:function(msg){
                    // var msg = eval(msg);
                    if(msg.status == true){
                        alert("Delete record id= "+msg.id+" completed.");
                        // 刷新table
                        table.ajax.reload();
                    }else{
                        alert("Delete failed!");
                    }            },
                error: function(error){
                    console.log(error);
                }
            });
        }else{
            // 取消
            return ;
        }
    });

});

  
function add_user(){
    var jsonData = {
        "member_name": $('#add_name').val(),
        "member_password": $('#add_password').val(),
        "role_id": $('#add_role').val(),
        "email": $('#add_email').val(),
        "phone": $('#add_phone').val(),
        "memo": $('#add_memo').val()
    };

    if(jsonData.member_name == "")
    {
        alert("No Username was entered.\n");
        return;
    }
    else if( !/[a-zA-Z0-9]/.test(jsonData.member_name) )
    {
        alert("Passwords require one each of a-z, A-Z and 0-9.\n");
        return;
    }

    if( jsonData.member_password.length < 6 )
    {
        alert("Password must be at least 6 characters.\n");
        return;
    }
    
    if( !/[a-zA-Z0-9]/.test(jsonData.member_password) )
    {
        alert("Passwords require one each of a-z, A-Z and 0-9.\n");
        return;
    }
    
    if( jsonData.member_password!=$('#add_cpassword').val() )
    {
        alert("Confirm passwords is not equal previous input.\n");
        return;
    }

    $.ajax({
        type:'get',
        url:'php/add_user.php',
        data:jsonData,
        dataType:"json",
        success:function(msg){
            if(msg.status == true){
                alert("Add  record success!");
                table.ajax.reload();
            }else{
                alert("Add  record failed!");
            }
        },
        error:function(error){
            console.log(error);

        }
        
    });
}

function update_user(){
    var jsonData = {
        "member_id": $('#ed_id').val(),
        "member_name": $('#ed_name').val(),
        "member_password": $('#ed_password').val(),
        "role_id": $('#ed_role').val(),
        "email": $('#ed_email').val(),
        "phone": $('#ed_phone').val(),
        "memo": $('#ed_memo').val()
        };

    if( jsonData.member_id == "" ){
        alert("Wrong member id.\n");
        return;
    }

    if(jsonData.member_name == "")
    {
        alert("No Username was entered.\n");
        return;
    }
    else if( !/[a-zA-Z0-9]/.test(jsonData.member_name) )
    {
        alert("Passwords require one each of a-z, A-Z and 0-9.\n");
        return;
    }

    if( jsonData.member_password.length < 6 )
    {
        alert("Password must be at least 6 characters.\n");
        return;
    }
    
    if( !/[a-zA-Z0-9]/.test(jsonData.member_password) )
    {
        alert("Passwords require one each of a-z, A-Z and 0-9.\n");
        return;
    }
    if( jsonData.member_password!=$('#ed_cpassword').val() )
    {
        alert("Confirm passwords is not equal previous input.\n");
        return;
    }

    $.ajax({
        type:'get',
        url:'php/update_user.php',
        data:jsonData,
        dataType:"json",
        success:function(msg){
            if(msg.status == true){
                alert("Update  record success!");
                table.ajax.reload();
            }else{
                alert("Update  record failed!");
            }
        },
        error:function(error){
            console.log(error);

        }
        
    });
}