<?php

require_once '../model/student.php';

class View
{
    public function __construct() {
    }

    public function outputStudent($student) {
        /*echo "ID" . $student->getId() . "<br/>";
		echo "Name: " . $student->getName() . "<br/>";
		echo "Password: " . $student->getPassword() . "<br/>";
		echo "Group ID: " . $student->getGroup_id() . "<br/>";*/

		echo json_encode($student);
    }

    public function output($param) {
    	echo json_encode($param);
    }
}

?>
