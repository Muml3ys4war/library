let myLibrary =[];

// to create books objects from constructor innovation
function Book(title,author,pages,status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
}

// for the books object to share , rather than populating
Book.prototype.info = function() {
    return(this.title+" by "+ this. author+ " , " +this.pages+" , "+ this.status);
}

// to add event listioner
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('myform').addEventListener("submit",function(e){
        e.preventDefault();
        
        var form = document.getElementById('myform');
        var data = new FormData(form);
        var book = new Book();

        for(const key of Object.keys(book)) {
            book[key] = data.get(key);
        }

        //convert string to boolean
        book['status'] = !!book['status'];

        myLibrary.push(book);
        book.card();

        //console.log("Object Added !!")
        document.getElementById('myform').reset();
        document.getElementById("bdata").style.display = "none";
    })
});


// function to add the box of book
Book.prototype.card = function () {
    html =  "<ul><li>" + this.title + "</li>"+ this.author+"<br>";
    html += '<button type="button" onclick="changeState(this)">Read</button><button type="button" onclick="remove(this)">Remove</button></ul>';

    var div = document.createElement('div');
    div.className = "box";
    div.innerHTML = html;

    if(this.status) {
        div.style.borderColor = "green";
    } else {
        div.style.borderColor = "red";
    }

    document.body.appendChild(div);
}

/* Adding function to open pop-up book form */
function openform() {
    document.getElementById("bdata").style.display = "block";
}


function changeState(el) {
    var element = el;
    var parent = element.parentNode.parentNode;
    var Obj = element.parentNode.getElementsByTagName('li')[0].innerText;

    const index = myLibrary.map(e => e.title).indexOf(Obj);
    if(myLibrary[index].status) {
        parent.style.borderColor = "red";
        myLibrary[index].status = false;
    } else {
        parent.style.borderColor = "green";
        myLibrary[index].status = true;
    }
}

// function to remove element from array
function remove(el) {
    var element = el;
    var parent = element.parentNode.getElementsByTagName('li')[0].innerText;

    const index = myLibrary.map( e => e.title).indexOf(parent);
    if(index > -1) {
        myLibrary.splice(index,1);
    }

    element.parentNode.parentNode.remove();
}