<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwodController;
use Illuminate\Support\Facades\Route;

$diffWithGMT = 6 * 60 * 60 + 30 * 60; //converting time difference to seconds.
$ygntime     = gmdate("Y-m-d H:i:s", time() + $diffWithGMT);
$ygndate     = gmdate("Y-F-d", time() + $diffWithGMT);
$ygndatetime = gmdate("Y-F-d ( D ) h:i A", time() + $diffWithGMT);
$today       = date("d/n/Y");
$date     = date("Y-M-d ( l )");

// Protected Sanctum Route
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user/logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'index']);
});

Route::get('2d',[TwodController::class,'index']);

// Protected CSRF Route
Route::group(['middleware' => ['web']], function () {
    Route::get('v1/csrf', function (Request $request) {
        return response()->json($request->session()->get('_token'));
    });
    Route::get('v1/session', function(){
        return response()->json(['device' => session()->get('device'),'all'=>session()->all()]);
    });
    Route::post('user/login', [AuthController::class, 'login']);
    Route::post('user/register', [AuthController::class, 'register']);
});
