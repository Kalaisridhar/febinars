<?php

//https://api.tradejini.com/2.0/partnerAPI?name=GOPAL&email=xyz@gmail.com&phone=12345&city=test&state=&leadsrc=&pid=TEST&remarks=Testing

	if(isset($_GET['name']))
	{
		$name = $_GET['name'];
	}
	if(isset($_GET['email']))
	{
		$email = $_GET['email'];
	}
	if(isset($_GET['phone']))
	{
		$phone = $_GET['phone'];
	}
	if(isset($_GET['city']))
	{
		$city = $_GET['city'];
	}
    if(isset($_GET['leadsrc']))
    {
        $leadsrc = $_GET['leadsrc'];
    }
    if(isset($_GET['cid']))
    {
        $cid = $_GET['cid'];
    }
    if(isset($_GET['remarks']))
    {
        $remarks = $_GET['remarks'];
    }
    // $url="https://api.tradejini.com/2.0/partnerAPI?name=".$name."&email=".$email."&phone=".$phone."&city=".$city."&state=&leadsrc=".$leadsrc."&pid=i0210&remarks=";
    $url="http://api.algoaction.in/1.0/campaign?name=".urlencode($name)."&email=".$email."&phone=".$phone."&city=".urlencode($city)."&state=&leadsrc=".$leadsrc."&cid=".$cid."&remarks=".urlencode($remarks);


    $payload = Array();

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => json_encode($payload),

    // CURLOPT_POSTFIELDS => $payload,              
    CURLOPT_HTTPHEADER => array(
     "Cache-Control: no-cache",
     "Content-Type: application/json"
    ),
    ));

    $response_1 = curl_exec($curl);
    $err = curl_error($curl);

    
    curl_close($curl); 

	echo $response_1;
?>