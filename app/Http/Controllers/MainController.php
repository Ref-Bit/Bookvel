<?php

namespace App\Http\Controllers;

use App\Experts;
use Illuminate\Http\Request;

class MainController extends Controller
{

    public function index()
    {
        return view('welcome');
    }

    public function getExperts()
    {
        $experts = Experts::all();
        return response()->json($experts);
    }
    public function getExpertByID(Experts $expert)
    {
        return response()->json($expert);
    }
}
