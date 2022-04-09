function loadContent(){
    // clearResult();
    
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9093/departments/findAll";
    
    // xhr.onloadstart=function(){
    //     document.getElementById("button").innerHTML = "Loading...";
    // }
    xhr.onerror=function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend=function(){
        if(this.responseText !== "" ){
            var result = JSON.parse(this.responseText);
            var dep = result.data;
           
            document.getElementById("tabel").innerHTML = `<tr><th>Department Id</th><th>Department Name</th><th>Edit</th><th>Delete</th></tr>`
            for (let i=0;i<dep.length;i++){
                const element = dep[i];
                var btnEdit="<a href='update.html?id="+element.departmentId+"'><i class='bi bi-pencil-square'></i></a>";
                var btnHapus=`<i class="bi bi-trash" onclick="deleteData(${element.departmentId})" value="Delete"></i>`;
                document.getElementById("tabel").innerHTML += (`<tr><td> ${element.departmentId}</td><td>${element.departmentName}</td><td>${btnEdit}</td><td>${btnHapus}</td></tr>`);
            }
            // document.getElementById("button").innerHTML = "Done";
            // setTimeout(function(){
            //     document.getElementById("button").innerHTML="Load lagi";
            // },3000);
        }   
    };
    xhr.open("GET",url,true);
    xhr.send();
}

loadContent();

function clearResult(){
    document.getElementById("tabel").innerHTML = "";
}


function searchByDeptName(deptname){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:9093/departments/findByDepartmentName?departmentName=${deptname}&page=0&size=50`;

    xhr.onerror=function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend=function(){
        if(this.responseText !== "" ){
            var result = JSON.parse(this.responseText);
            var dep = result.data;
           
            document.getElementById("tabel").innerHTML = `<tr><th>Department Id</th><th>Department Name</th><th>Edit</th><th>Delete</th></tr>`
            for (let i=0;i<dep.length;i++){
                const element = dep[i];
                var btnEdit="<a href='update.html?id="+element.departmentId+"'><i class='bi bi-pencil-square'></i></a>";
                var btnHapus=`<i class="bi bi-trash" onclick="deleteData(${element.departmentId})" value="Delete"></i>`;
                document.getElementById("tabel").innerHTML += (`<tr><td> ${element.departmentId}</td><td>${element.departmentName}</td><td>${btnEdit}</td><td>${btnHapus}</td></tr>`);
            }
            // document.getElementById("button").innerHTML = "Done";
            // setTimeout(function(){
            //     document.getElementById("button").innerHTML="Load lagi";
            // },3000);
        }   
    };
    

    xhr.open("GET",url,true);
    xhr.send();
    `<a href="home.html"><button>Back</button></a>`
}
function deleteData(deptId){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:9093/departments/${deptId}`

    xhr.open("DELETE", url, true);
    var confdel = confirm("Yakin ingin menghapus?");
    if (confdel){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function(){
            var respon = JSON.parse(this.responseText);
            console.log(respon);
            if (respon.status){
                        window.location = "home.html";
                    }
                    else{
                        alert("Data gagal dihapus");
                    }
            };      
            xhr.send();
                alert("Data berhasil dihapus");
                window.location="home.html"
    };      
    loadContent();
    
}