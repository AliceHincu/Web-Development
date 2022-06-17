<?php

class Student implements JsonSerializable {
	private $id;
	private $name;
	private $password;
	private $group_id;	

	public function __construct($id, $name, $password, $group_id) {
		$this->id = $id;
		$this->name = $name;
		$this->password = $password;
		$this->group_id = $group_id;
	}

	public function getId() {
		return $this->id;
	}
	public function getName() {
		return $this->name;
	}
	public function getPassword() {
		return $this->password;
	}
	public function getGroup_id() {
		return $this->group_id;
	}

	public function jsonSerialize() {
        $vars = get_object_vars($this);
        return $vars;
    }
}

?>
