<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Dotenv\Exception\ValidationException;
use Illuminate\Validation\Rule as ValidationRule;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $phone = $request->phone;
        if(str_starts_with($phone,'+959')) $phone = '0'.substr($phone, 3);
        else if(str_starts_with($phone,'959')) $phone = '0'.substr($phone, 2);
        $request->merge(['phone' => $phone]);

        try {
            $user = $request->validate([
                'username' => ['required', 'min:3', 'max:100'],
                'phone' => ['required','min:7', 'regex:/(09)|(959)[0-9]{9}/','numeric',ValidationRule::unique('users', 'phone')],
                'email' => ['required', 'string', ValidationRule::unique('users', 'email')],
                'token' => ['required'],
                '_token' => ['required'],
                'password' => ['required', 'min:6', 'max:100'],
            ]);
        } catch (ValidationException $th) {
            return $th;
        }

        $state = User::create($user);

        // Refresh CSRF Token
        session()->regenerateToken();

        if ($state)  return response()->json(['response' => 'success']);
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email', ValidationRule::exists('users', 'email'), 'max:255'],
                'password' => ['required', 'min:6', 'max:100']
            ]);
        } catch (ValidationException $th) {
            return $th;
        }

        if (auth()->attempt($credentials)) {

            $auth = User::where('email', $credentials['email'])->first();

            if($auth['confirm']==0) return response(['errors' => 'Please verify your email first.']);

            if($auth['disabled']==1) return response(['errors' => 'Your account has been disabled']);

            // $auth->update(['login_key'=>Str::upper(Str::random(16))]);

            $token = $auth->createToken('auth')->plainTextToken;

            $auth->update(['login_key'=>$token]);

            $request->session()->put('login_key', $token);

            // Refresh CSRF Token
            session()->regenerateToken();

            return response()->json(['response' => 'success','user' => ['name' => $auth['name'], 'email' => $auth['email'], 'phone' => $auth['phone']],'token' => $token]);

        } else return response(['errors' => 'Incorrect credentials.']);

    }

    public function index(Request $request)
    {
        $this->activeNow($request);
        return $request->user();
    }

    public function activeNow(Request $request){
        $diffWithGMT = 6 * 60 * 60 + 30 * 60; //converting time difference to seconds.
        $ygntime     = gmdate("Y-m-d H:i:s", time() + $diffWithGMT);
        $request->user()->update(['active_now'=>$ygntime]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens...
        $request->user()->tokens()->delete();

        // Revoke the token that was used to authenticate the current request...
        // $request->user()->currentAccessToken()->delete();

        // Revoke a specific token...
        // $request->user()->tokens()->where('id', $tokenId)->delete();

        return response()->json(['response' => 'logout']);
    }

    public static function getUserIp()
    {
        $ip = $_SERVER['REMOTE_ADDR'];
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && preg_match_all('#\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#s', $_SERVER['HTTP_X_FORWARDED_FOR'], $matches)) {
            foreach ($matches[0] as $xip) {
                if (!preg_match('#^(10|172\.16|192\.168)\.#', $xip)) {
                    $ip = $xip;
                    break;
                }
            }
        } elseif (isset($_SERVER['HTTP_CLIENT_IP']) && preg_match('/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_CF_CONNECTING_IP']) && preg_match('/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER['HTTP_CF_CONNECTING_IP'])) {
            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
        } elseif (isset($_SERVER['HTTP_X_REAL_IP']) && preg_match('/^([0-9]{1,3}\.){3}[0-9]{1,3}$/', $_SERVER['HTTP_X_REAL_IP'])) {
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        }
        return $ip;
    }
}
