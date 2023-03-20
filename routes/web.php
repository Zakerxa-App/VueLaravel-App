<?php

use Illuminate\Support\Facades\Route;
use hisorange\BrowserDetect\Parser as Browser;
use Illuminate\Support\Facades\Session;

date_default_timezone_set("Asia/Yangon");

// if (Browser::isBot()) abort(401);



function check($device)
{
    $response = '';
    session(['key' => 'value']);
    session()->push('device', $device);
    if (Browser::isChrome()) {
        // echo 'That is Chrome - ';
    }
    if (Browser::isFirefox()) {
        // echo 'That is Firefox - ';
    }
    if (Browser::isOpera()) {
        // echo 'That is Opera - ';
    }
    if (Browser::isSafari()) {
        // echo 'That is Safari -';
        $response = '<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,ResizeObserver,WebAnimations,Object.fromEntries,Array.prototype.at"></script>';
    }
    if (Browser::isIE()) {
        // echo 'That is IE - ';
    }
    // echo Browser::deviceType() .'<br>';
    // echo Browser::deviceModel() . '<br>';

    if ($device == 'Desktop') {
        // echo 'Install our Mobile App.';
    }
}

Route::group(['middleware' => ['web']], function () {
    if (Browser::isDesktop()) check('Desktop');

    if (Browser::isTablet()) check('Tablet');

    if (Browser::isAndroid()) check('Android');

    if (Browser::isMac() && Browser::isMobile())  check('IOS');


});


Route::get('/{any}', fn () => view('app'))->where('any', '.*');
