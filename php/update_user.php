<?php
    header("Content-type: text/html;charset=utf-8");//防止乱码
        // 增加记录
    $conn=@mysqli_connect("localhost","root","","mydb"); //数据库

    $id = $_GET['member_id'];
    $name = $_GET['member_name'];
    $pwd  = $_GET['member_password'];
    $role = $_GET['role_id'];
    $email= $_GET['email'];
    $phone = $_GET['phone'];
    $memo = $_GET['memo'];

    $sumSql = "SELECT count(member_id) as sum FROM es_member WHERE member_id=$id";
    //条件过滤后记录数 必要
    $recordsFiltered = 0;
    //表的总记录数 必要
    $recordsTotal = 0;
    $res = mysqli_query($conn, $sumSql);
    while($row=mysqli_fetch_assoc($res)){
        $recordsTotal = $row['sum'];
    }
    if( $recordsTotal==0){
        echo json_encode(array(
            "status"=>false,
            "info"=>"Wrong member id",
            "sql"=>$sql
            ),JSON_UNESCAPED_UNICODE);
        return;
    }

    $sql="UPDATE es_member SET member_name='$name', member_password=MD5('$pwd'), role_id=$role, email='$email', phone='$phone', memo='$memo' WHERE member_id=$id";
    $res=mysqli_query($conn, $sql);

    if($res){
        echo json_encode(array(
            "status"=>true,
            "info"=>"update success"
            ),JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode(array(
            "status"=>false,
            "info"=>"update error",
            "sql"=>$sql
            ),JSON_UNESCAPED_UNICODE);
    }