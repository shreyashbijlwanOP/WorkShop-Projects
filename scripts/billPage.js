let params = new URLSearchParams(window.location.href);



class Store {
  collection = [];
  key = "";
  constructor(localKey) {
    this.key = localKey;
    this.collection = JSON.parse(localStorage.getItem(this.key)) ?? [];
    this.updateStore();
  }
  maxId() {
    return this.collection.reduce(
      (lastValue, currentElement) =>
        lastValue > currentElement.id ? lastValue : currentElement.id,
      0
    );
  }
  add(model) {
    this.collection.push(model);
    this.updateStore();
  }

  updateStore() {
    localStorage.setItem(this.key, JSON.stringify(this.collection));
  }

  update(id, model) {
    this.collection = this.collection.map((currentObject) =>
      currentObject.id === id ? model : currentObject
    );
    this.updateStore();
  }

  get getCollection() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  getModel(id) {
    let [model] = this.collection.filter(model=>model.id==id)
    return model
  }

  delete(id)
  {
    this.collection = this.collection.filter( element => element.id!=id)
    this.updateStore();
  }
}


function editCustomerDetails()
{
  window.location.replace(`editCustomer.html?id=${tempModel.id}`)
}

function MaxProductID(list)
{
  if(!list.length) return 0;
  return list.reduce(
    (lastValue, currentElement) =>
      lastValue > currentElement.productID ? lastValue : currentElement.productID,0);
}

function AddToProductList()
{
  let obj = {};
  for(let i = 0; i<3;i++)
  {
    if(  inputsElements[i].name == "productPrice" || inputsElements[i].name == "productQuantity"  )
    {
      obj[inputsElements[i].name] = +inputsElements[i].value.toUpperCase()
    }
    else{
      obj[inputsElements[i].name] = inputsElements[i].value.toUpperCase()
    }
  }
  obj.productID = MaxProductID(ProductList) + 1
  obj.totalPrice = obj.productPrice * obj.productQuantity
  ProductList.push(obj)
  tempModel.bill.billAmount = ProductList.reduce((acc,current)=> acc + current.totalPrice ,0);
  tempModel.billStatus.remainingAmount =  tempModel.bill.billAmount - tempModel.billStatus.paidAmount ;
  store.update(id,tempModel)
  window.location.reload()

}

function saveBill(){
  tempModel.billStatus.paymentMode = paymentMode.value;
  tempModel.billStatus.paymentStatus = billStatus.value;
  tempModel.billStatus.paidAmount = +paidAmount.value
  tempModel.billStatus.remainingAmount =  tempModel.bill.billAmount - tempModel.billStatus.paidAmount ;

  store.update(id,tempModel)
  alert("Save Bill Successfully")
  window.location.reload()


}

function Delete(id)
{
  let result = confirm("Gaurav Bhai, क्या आप हटाना चाहते हैं ?");
  if(result)
  {
    ProductList = ProductList.filter(element=>element.productID!=id)
    tempModel.bill.billAmount = ProductList.reduce((acc,current)=> acc + current.totalPrice ,0);
    tempModel.bill.itemList.length = 0
    tempModel.bill.itemList=  [...ProductList];
    store.update(id,tempModel)
    window.location.reload()

  }
  
}
function editClick(id)
{
  console.log(id)
  document.getElementById("edit-box").classList.toggle("d-none")

  let [obj] = ProductList.filter(element=>element.productID==id)
  tempObj = {...obj,productID:id}
  console.log(tempObj)
   
  for(let i = 4; i<7;i++)
  {
      inputsElements[i].value = obj[inputsElements[i].name]
  }

}


function Close()
{
  document.getElementById("edit-box").classList.toggle("d-none")
  tempObj = {}
}
function UpdateItem()
{
  for(let i = 4; i<7;i++)
  {
    if(  inputsElements[i].name == "productPrice" || inputsElements[i].name == "productQuantity"  )
    {
      tempObj[inputsElements[i].name] = +inputsElements[i].value.toUpperCase()
    }
    else{
      tempObj[inputsElements[i].name] = inputsElements[i].value.toUpperCase()
    }
  }
  tempObj.totalPrice = tempObj.productPrice * tempObj.productQuantity
  tempModel.bill.itemList = tempModel.bill.itemList.map(element=>element.productID==tempObj.productID?tempObj:element)
  tempModel.bill.billAmount = tempModel.bill.itemList.reduce((acc,current)=> acc + current.totalPrice ,0);
  tempModel.billStatus.remainingAmount =  tempModel.bill.billAmount - tempModel.billStatus.paidAmount ;

 
  store.update(id,tempModel)

  alert("Update successfully")
  window.location.reload();
  

}


function display()
{
  output.innerHTML = ""
// 
  ProductList.forEach((element,index)=>{
      output.innerHTML += `
      <tr>
      <td  >${index+1}</td>
      <td>${element.productName}</td>
      <td>${element.productQuantity}</td>
      <td>${element.productPrice}</td>
      <td>${element.totalPrice}</td>
      <td> 
      <button class=" btn btn-primary p-0 ps-3 pe-3 " onclick="editClick(${element.productID})" >edit</button>
      <button class= " btn btn-danger p-0 ps-3 pe-3 " onclick="Delete(${element.productID})" ><i class="fa-solid fa-trash-can"></i> </button>
       </td>
      </tr>
      `
  })
}

function deleteUser()
{
let res = confirm("Gaurav Bhai , Sach Mai Delete karna Ky ? ")
if (res)
{
  store.delete(id)
  alert("deleted SuccessFully")
  window.location.replace("../index.html")
}

}


let inputsElements = Array.from(document.getElementsByTagName("input"));
let [[url, id]] = params;
let store = new Store("storeData");
let tempModel = {...store.getModel(id)};
let output = document.getElementById("output")
console.log(tempModel,store.getCollection)
document.title = tempModel.customerName.toUpperCase() + ":🚴‍♂️ "
let billStatus = document.getElementById("billStatus")
let paymentMode = document.getElementById("paymentMode")
let paidAmount = document.getElementById("paidAmount")


let {itemList:ProductList} = tempModel.bill;
let tempObj={};


(function(){
  let labels = Array.from(document.getElementsByTagName("label"))
  let list = JSON.parse(localStorage.getItem("items")) ?? []

  list.forEach(item=>{
    
    let option = document.createElement("option")
    option.value = item.toUpperCase();

    document.getElementById("list").append(option)
  })

  labels.forEach(label=>{
    label.textContent = tempModel[label.title]
  })
  tempModel.bill.billAmount = ProductList.reduce((acc,current)=> acc + current.totalPrice ,0);

  document.getElementById("billAmount").textContent = tempModel.bill.billAmount
  display()
})()
tempModel.billStatus.remainingAmount = tempModel.bill.billAmount - tempModel.billStatus.paidAmount


document.getElementById("footer-output").textContent = `Bill Status : ${tempModel.billStatus.paymentStatus}   || Payment Mode : ${tempModel.billStatus.paymentMode}  ||  Amount Paid : ${tempModel.billStatus.paidAmount}  || Balance Amount : ${tempModel.billStatus.remainingAmount}`






