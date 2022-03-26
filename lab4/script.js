var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++){
    dropdown[i].addEventListener("click", function() {
        //With each click, classList.toggle() will add the CSS class if it does not exist in the classList array and return true. 
        //If the CSS class exists, the method will remove the class and return false.  
        this.classList.toggle("active");

        // get the next element in the doc which is the dropdown list
        let dropdownContent = this.nextElementSibling;
        
        if(dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
            dropdownContent.style.display = "block";
        } else{
            dropdownContent.style.display = "none";
        }
    })
}