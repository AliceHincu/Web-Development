<?php

require_once '../model/model.php';
require_once '../view/view.php';

class Controller
{
    private $view;
    private $model;	

    public function __construct(){
    	$this->model = new Model ();
        $this->view = new View();
    }

    public function service() {
	   if (isset($_GET['action']) && !empty($_GET['action'])) {
            if ($_GET['action'] == "getUser") {
   	            $this->{$_GET['action']}($_GET['user']);
            } else {
                $this->{$_GET['action']}();
            } 
	   }
    }

    public function getUser($user) {
	   $student = $this->model->getStudent($user);
	   return $this->view->output($student);
    }

    public function getAllGrades() {
       $grades = $this->model->getAllGrades();
       return $this->view->output($grades);
    }
}

$controller = new Controller();
$controller->service();

?>
