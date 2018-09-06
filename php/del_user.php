<?php
    header("Content-type: text/html;charset=utf-8");//防止乱码
        // 增加记录
    $conn=@mysqli_connect("localhost","root","","mydb"); //数据库

    $id = $_GET['member_id'];

    //最大member_id + 1
    $sql = "DELETE FROM es_member WHERE member_id = ".$id;
    
    $res = mysqli_query($conn, $sql);
    if($res){
        echo json_encode(array(
            "status"=>true,
            // "data"=>"this is data~",
            "id"=>$id
        ),JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode(array(
            "status"=>false,
            // "data"=>"this is data~",
            "id"=>$id
        ),JSON_UNESCAPED_UNICODE);
    }
