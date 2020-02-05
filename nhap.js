let addMode = true;
function product(id,fullname,thongtin,avatar) {
    this.id = id;
    this.fullname = fullname;
    this.thongtin = thongtin;
    this.avatar = avatar;

    this.showInList = function () {
        let str = "";
        str += "<td>"+this.id+"</td>";
        str += "<td>"+this.fullname+"</td>";
        str += "<td>"+this.thongtin+"</td>";
        str += "<td>"+"<img style='width: 200px; height: 200px' src =" + this.avatar + ">"+"</td>";
        str += "<td>" +

        "<a onclick=\"editProduct('"+ this.id+"')\">Edit</a> | " +
            "<a onclick=\"removeProduct('"+this.id+"')\">Delete</a></td>";
        str ="<tr>" + str +"</tr>";

        let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
        let newRow = tbody.insertRow();
        newRow.innerHTML = str;
        newRow.setAttribute("id", this.id);
    };
    this.update = function (a,b,c,d) {
        this.id = a;
        this.fullname = b;
        this.thongtin = c;
        this.avatar = d;


    }


}
let productList = new Array();
function openDialog() {
    document.getElementById("dialog").style.display = "block";
}
function closeDiaLog() {
    document.getElementById("dialog").style.display = "none";
}
function addProduct() {
    let id = document.getElementById("id").value;
    let fullname = document.getElementById("fullname").value;
    let thongtin = document.getElementById("thongtin").value;
    let avatar = document.getElementById("avatar").value;


    if(addMode)
    {
        let s = new product(id, fullname,thongtin,avatar);
        s.showInList();
        productList.push(s);
    }
    else
    {
        let s;
        for(let i in productList)
            if(productList[i].id  === id )
            {
                s = productList[i];
                break;
            }
        s.update(id,fullname, thongtin , avatar);
        refreshList();

    }
    closeDiaLog();
}
function removeProduct(productID) {
    document.getElementById(productID).style.display = "none";

    for(let i in productList)
        if(productList[i].id === productID)
            productList.splice(i, 1);
}
function editProduct(productID) {
    for(let i in productList)
        if (productList[i].id == productID ) {
            productList[i].id = document.getElementById("id").value;
            productList[i].fullname =document.getElementById("fullname").value;
            productList[i].thongtin = document.getElementById("thongtin").value;
            productList[i].avatar = document.getElementById("avatar").value;

            addMode = false;
            document.getElementById("dialog").style.display = "block";
            break;
        }
}

function refreshList() {
    let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for(let i in productList)
        productList[i].showInList();
}

function orderByFullname() {
    let len = productList.length;
    for (let i = 0; i < len - 1; i++)
        for (let j = i + 1; j < len; j++)
            if (productList[i].fullname > productList[j].fullname) {
                let tmp = productList[i];
                productList[i] = productList[j];
                productList[j] = tmp;
            }
    refreshList();
}
