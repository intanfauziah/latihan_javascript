var urlParam=new URLSearchParams(window.location.search);
        if(urlParam.has('id')){
            var id = urlParam.get('id')
            console.log('departmentId ==>> ', id);
            getById(id);
        }

        function getById(id){
            var xhr = new XMLHttpRequest();
            var url = "http://localhost:9093/departments/getById?id=" + id;
            
            xhr.onloadstart=function(){
                
            }
            xhr.onerror=function(){
                alert("Gagal mengambil data");
            };
            xhr.onloadend=function(){
                if(this.responseText !== "" ){
                    var result = JSON.parse(this.responseText);
                    var dep = result.data;
                   console.log(dep);
                   document.getElementById("departmentId").value = dep.departmentId;
                   document.getElementById("departmentName").value = dep.departmentName;
                   document.getElementById("managerId").value = dep.managerId;
                   document.getElementById("locationId").value = dep.locationId;                    
                }   
            };
            

            xhr.open("GET",url,true);
            xhr.send();
        }

function loadContent(){
    clearResult();
    
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9093/departments/findAll";
    
    xhr.onloadstart=function(){
        document.getElementById("button").innerHTML = "Loading...";
    }
    xhr.onerror=function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend=function(){
        if(this.responseText !== "" ){
            var result = JSON.parse(this.responseText);
            var dep = result.data;
           
            document.getElementById("tabel").innerHTML = `<tr class="table-primary"><th class="table-primary">Dept Id</th><th>Dept Name</th><th>Edit</th><th>Delete</th></tr>`
            for (let i=0;i<dep.length;i++){
                const element = dep[i];
                var btnEdit="<a href='#' onclick='editData("+element.departmentId+")'><button>Edit </button></a>";
                var btnHapus="<a href='#' onclick='deleteData("+element.departmentId+")'><button>Delete </button></a>";
                document.getElementById("tabel").innerHTML += (`<tr class="table-primary"><td class="table-primary"> ${element.departmentId}</td> <td>${element.departmentName}</td><td>${btnEdit}</td><td>${btnHapus}</td></tr>`);

            }
            document.getElementById("button").innerHTML = "Done";
            setTimeout(function(){
                document.getElementById("button").innerHTML="Load lagi";
            },3000);
        }   
    };
    

    xhr.open("GET",url,true);
    xhr.send();
}

function clearResult(){
    document.getElementById("tabel").innerHTML = "";
}

function addData(){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9093/departments/post"

            var data = JSON.stringify({
                departmentId: document.getElementById("departmentId").value,
                departmentName: document.getElementById("departmentName").value,
                managerId: document.getElementById("managerId").value,
                locationId: document.getElementById("locationId").value
            });
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = function(){
                console.log(this.responseText)
            };
            xhr.send();
            loadContent();
}

function deleteData(id){
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:9093/departments/${id}`

    xhr.open("DELETE", url, true);
    var confdel = confirm("Yakin ingin menghapus?");
    if (confdel){
        xhr.send(data);
        alert("Data berhasil dihapus");
    }
    loadContent();   
}

function editData(id){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9093/departments/put"

            var data = JSON.stringify({
                departmentId: document.getElementById("departmentId").value,
                departmentName: document.getElementById("departmentName").value,
                managerId: document.getElementById("managerId").value,
                locationId: document.getElementById("locationId").value
            });
            xhr.open("PUT", url, true);
            var confdel = confirm("Yakin ingin mengubah?");
            if (confdel){
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onload = function(){
                    console.log(this.responseText)
                };
                xhr.send();
                alert("Data berhasil diubah");
            }
            loadContent();
}

function searchByName(name){
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:9093/departments/findByDepartmentName?departmentName="+a+"&page=1&size=5";

    xhr.onerror=function(){
        alert("Gagal mengambil data");
    };
    xhr.onloadend=function(){
        if(this.responseText !== "" ){
            var result = JSON.parse(this.responseText);
            var dep = result.data;
           
            document.getElementById("tabel").innerHTML = `<tr class="table-primary"><th class="table-primary">Dept Id</th><th>Dept Name</th><th>Edit</th><th>Delete</th></tr>`
            for (let i=0;i<dep.length;i++){
                const element = dep[i];
                var btnEdit="<a href='Day4_ajaxPut.html?id="+element.departmentId+"'><button>Edit</button></a>";
                var btnHapus="<a href='Day4_ajaxDel.html?id="+element.departmentId+"'><button>Delete</button></a>";
                document.getElementById("tabel").innerHTML += (`<tr class="table-primary"><td class="table-primary"> ${element.departmentId}</td> <td>${element.departmentName}</td><td>${btnEdit}</td><td>${btnHapus}</td></tr>`);

            }
            document.getElementById("button").innerHTML = "Done";
            setTimeout(function(){
                document.getElementById("button").innerHTML="Load lagi";
            },3000);
        }   
    };
    

    xhr.open("GET",url,true);
    xhr.send();

}