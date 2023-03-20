<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use PhpParser\Node\Stmt\TryCatch;

class TwodController extends Controller
{

    public function index()
    {

        $date_time = Carbon::now('Asia/Rangoon')->format("Y-m-d H:i:s");
        $nowHour = Carbon::now()->format('H');
        $nowMin = Carbon::now()->format('i');
        $current = strtotime($date_time);
        $start = strtotime(date('Y-m-d') . "09:30");
        $end = strtotime(date('Y-m-d') . "17:00");

        try {
            if (file_get_contents("https://www.set.or.th/api/set/index/info/list")) {
                $index  = json_decode(file_get_contents('https://www.set.or.th/api/set/index/info/list?type=INDEX'));
                $last   = $index->indexIndustrySectors[0]->last;
                $value  = $index->indexIndustrySectors[0]->value;
                $status = $index->indexIndustrySectors[0]->marketStatus;
                $date = $index->indexIndustrySectors[0]->marketDateTime;

                $value = substr($value, 0, 7);
                $firValue = substr($value, 0, 5);
                $secValue = substr($value, 5);
                $finValue = $firValue . '.' . $secValue;
                $finValue = number_format($finValue, 2, '.', ',');

                $fir = substr($last, -1);

                $last2 = explode('.', $value);
                $sec = substr($last2[0], -1);
                return response()->json(['set' => $last.'', 'value' => $finValue, '2d' => $fir . $sec, 'status' => $status, 'date' => $date]);
            }
        } catch (\Throwable $th) {
            return response()->json("Error");
        }

        if($current >= $start && $nowHour <= 12 ){
            $this->indexApi();
        } elseif($nowHour >= 13 && $nowHour <= 16 ){
            $this->indexApi();
        } else {
          return response()->json("Time End");
        }
    }

    public function indexApi()
    {
        try {
            if (file_get_contents("https://www.set.or.th/api/set/index/info/list")) {
                $index  = json_decode(file_get_contents('https://www.set.or.th/api/set/index/info/list?type=INDEX'));
                $last   = $index->indexIndustrySectors[0]->last;
                $value  = $index->indexIndustrySectors[0]->value;
                $status = $index->indexIndustrySectors[0]->marketStatus;
                $date = $index->indexIndustrySectors[0]->marketDateTime;

                $value = substr($value, 0, 7);
                $firValue = substr($value, 0, 5);
                $secValue = substr($value, 5);
                $finValue = $firValue . '.' . $secValue;
                $finValue = number_format($finValue, 2, '.', ',');

                $fir = substr($last, -1);

                $last2 = explode('.', $value);
                $sec = substr($last2[0], -1);
                return response()->json(['set' => $last, 'value' => $finValue, '2d' => $fir . $sec, 'status' => $status, 'date' => $date]);
            }
        } catch (\Throwable $th) {
            return response()->json("Error");
        }
    }
}
