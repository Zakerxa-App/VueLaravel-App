<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = ['id','balance'];
    protected $appends = ['OTLG'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'disabled',
        'confirm',
        'remember_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setTokenAttribute($token){
        $phone = $this->getAttribute('phone');
        if(str_starts_with($phone,'09')) $phone = substr($phone, 1);
        else if(str_starts_with($phone,'+959')) $phone = substr($phone, 3);
        else if(str_starts_with($phone,'959')) $phone = substr($phone, 2);
        $this->attributes['token'] = $this->quickRandom($phone);
    }

    public function setPasswordAttribute($pass){
        $this->attributes['password'] = bcrypt($pass);
    }

    public function getOTLGAttribute()
    {
        if($this->attributes['login_key'] == session()->get('login_key')){
         return 'OK';
        }else return 'BAD';
    }

    public function quickRandom($phone){
        return $phone.'-'.substr(str_shuffle(str_repeat('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)), 0, 10);
    }
}
