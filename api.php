<?php

$conn = new mysqli("localhost", "root", "", "vuephpcrud");

if($conn->connect_error){
    die("Could not connect to database!");
}

$res = array('error' => false);


$action = 'read';

if(isset($_GET['action'])){
    $action = $_GET['action'];
}


if($action == 'read'){
    $result = $conn->query("SELECT * FROM tasks");
    $tasks = array();

    while($row = $result->fetch_assoc()){
        array_push($tasks, $row);
    }

    $res['tasks'] = $tasks;
}

if($action == 'create'){

    $task = $_POST['task'];
    $description = $_POST['description'];

    $result = $conn->query("INSERT INTO tasks VALUES (NULL, '$task', '$description', 0) ");

    if($result){
        $res['message'] = "Task added successfully";
    } else{
        $res['error'] = true;
        $res['message'] = "Could not insert task";
    }
}

if($action == 'update'){
    $id = $_POST['id'];
    $task = $_POST['name'];
    $description = $_POST['description'];

    $result = $conn->query("UPDATE tasks SET name = '$task', description = '$description' WHERE id = '$id'");

    if($result){
        $res['message'] = "Task updated successfully";
    } else{
        $res['error'] = true;
        $res['message'] = "Could not update task";
    }

}



if($action == 'delete'){
    $id = $_POST['id'];


    $result = $conn->query("DELETE FROM tasks WHERE id = '$id'");

    if($result){
        $res['message'] = "Task deleted successfully";
    } else{
        $res['error'] = true;
        $res['message'] = "Could not delete task";
    }

}


$conn->close();

header("Content-type: application/json");
echo json_encode($res);
die();

?>