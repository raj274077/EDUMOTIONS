<?php
/*
in this tutorial, we want a web app which will authenticate users
before a user can have access to the content of our web app

just like i made mention of ...in the previous tutorial, 
the $con is to create a new mysqli function, which will help to connect to our database.
if you want to know more about this, try to go to https://easyboy2.wordpress.com/2016/06/20/using-angujarjs-with-php-mysqli-with-the-aid-of-xamp/*/
$con = new mysqli("localhost", "root", "1234", "tutorial1");

$data = json_decode(file_get_contents("php://input"));
$username = mysqli_real_escape_string($con, $data->theusername);
$password = mysqli_real_escape_string($con,$data->thepassword);

/*Note: we now have a new table in our database with the name
authentication*/

$query =("SELECT id FROM authentication WHERE  username= '$username' and password= '$password'");
$que = mysqli_query($con, $query);
$count = mysqli_num_rows($que);

if($count==1){
echo 'correct';}
else{
echo 'wrong';
}


?>