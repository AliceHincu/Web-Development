<?php

require_once '../repo/DBUtils.php';
require_once 'student.php';

class Model {
	private $db;

	public function __construct() {
		$this->db = new DBUtils ();
	}

	public function getStudent($user) {
		$resultset = $this->db->selectStudent($user);
	    //var_dump($resultset);
        $student = new Student($resultset[0]['id'], $resultset[0]['name'], $resultset[0]['password'], $resultset[0]['group_id']);
        return $student;
	}

	public function getAllGrades() {
		$resultset = $this->db->selectAllStudents();
		$students = array();
		foreach($resultset as $key=>$val) {
			$stud = $val;

	    	$grades = $this->db->selectGradeForStudent($stud['id']);
	    	$stud['grades'] = $grades;

	    	array_push($students, $stud);
		}

	    return $students;
	}

}

?>
