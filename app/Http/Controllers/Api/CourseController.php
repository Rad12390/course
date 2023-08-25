<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Models\Course;

class CourseController extends Controller
{ 
    public function course_add(Request $request)
    {   
        $validatedData = Validator::make($request->all(), [ 
            'title' => 'required',
            'description' => 'required',
            'instructor' => 'required',
            'credits' => 'required'
        ]);

        if($validatedData->fails()) {  
            return response()->json([
                'status' => false,
                'error' => $validatedData->errors()->first()
            ], 400);
        }

        $course = new Course;
        $course->title = $request->title;
        $course->description = $request->description;
        $course->instructor = $request->instructor;
        $course->credits = $request->credits;
        
        if($course->save()){
                   $credits = json_decode($request->credits);

                    $final ='[';
                   
                    foreach($credits as $k => $v){

                    $final .= '"';
                    $count =  count((array)$v);
                    $c = 1;
                        foreach($v as $k1 => $v1){
                          // echo $v1;
                            $final .= $k1.'='.$v1;
                            if($c != $count) $final .= ",";
                         $c++;
                     }
                    // $final .=$str;
                    $final .='",';

                    }
                     $final .=']';
                    $course->credits = "'".$final."'";
                  // }

                  
                   return response()->json([
                    'status' => true,
                    'message' => 'Course added successfully!',
                    'course_details' => $course
                ], 200);
               }
         else{
            return response()->json([
                'status' => false,
                'message' => 'Header Part not found!'
            ], 200);
        }
    }
    
    public function course_list()
        {   
            $course = Course::orderBy("id","desc")->get();

            if($course){
                 
                 foreach($course as $key =>$value){
                    // $course[$key]->credits = json_decode($value->credits);
                    $credits = json_decode($value->credits ,true);
                    $final ='[';
                   
                    foreach($credits as $k => $v){
                    $final .= '"';
                    $count = count($v);
                    $c = 1;
                        foreach($v as $k1 => $v1){
                           // echo $v1;
                            $final .= $k1.'='.$v1;
                            if($c != $count) $final .= ",";
                         $c++;
                     }
                    // $final .=$str;
                    $final .='",';

                    }
                     $final .=']';
                    $course[$key]->credits = "'".$final."'";
                   }

                return response()->json([
                        'status' => true,
                        'message' => 'Course list!',
                        'data' => $course
                    ], 200);
                   }
             else{
                return response()->json([
                    'status' => false,
                    'message' => 'Courses not found!'
                ], 200);
            }
        }

}