<?php
    header("Content-type: text/html;charset=utf-8");//防止乱码
        // 增加记录
    $conn=@mysqli_connect("localhost","root","","mydb"); //数据库

    $name = $_GET['member_name'];
    $pwd  = $_GET['member_password'];
    $role = $_GET['role_id'];
    $email= $_GET['email'];
    $phone = $_GET['phone'];
    $memo = $_GET['memo'];

    //最大member_id + 1
    $maxSql = "SELECT max(member_id) as maxid FROM es_member";
    $maxid = 0;
    $recordsTotalResult = mysqli_query($conn, $maxSql);
    while($row=mysqli_fetch_assoc($recordsTotalResult)){
        $maxid = $row['maxid'];
    }
    $maxid = $maxid + 1;

    $sql="INSERT INTO es_member (`member_id`, `member_name`, `member_password`, `role_id`, `email`, `phone`, `memo`) VALUES ('".$maxid."', '".$name."', md5('".$pwd."'), '".$role."', '".$email."', '".$phone."', '".$memo."')";
    $res=mysqli_query($conn, $sql);

    if($res){
        echo json_encode(array(
            "status"=>true,
            "info"=>"add success"
            ),JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode(array(
            "status"=>false,
            "info"=>"add error",
            "sql"=>$sql
            ),JSON_UNESCAPED_UNICODE);
    }