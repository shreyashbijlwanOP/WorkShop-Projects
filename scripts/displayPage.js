
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

let output = document.getElementById("output")
let store = new Store("storeData")
let SelectDate = document.getElementById("selectDate")
let dateList = new Set(store.getCollection.map(element => element.date))
dateList = Array.from(dateList).reverse()
let collection = store.getCollection.filter(element=>element.date == new Date().toDateString())
let search = document.getElementById("search")
let totalAmount = document.getElementById("totalamount")

    dateList.forEach(date=>{
        let option = document.createElement("option")
        option.value = date;
        option.textContent = date;
     
        SelectDate.append(option)
    })

    Display();

    function CurrentDate(){
      
        let date = SelectDate.value
        console.log()
         collection = store.getCollection.filter(element=>element.date == date)
        Display();
    }

function PrintF(e,id)
{  
     e.cancelBubble =true;
  
     window.location.replace("print.html"+`?id=${id}`)

}
function searchText(searchT)
{
if(searchT)
{
  collection =  store.getCollection.filter((item)=>{
    let string = JSON.stringify(item).toLowerCase()
        return string.includes(searchT.toLowerCase())
  })
  Display()
}
else{
  window.location.reload()
}
}

function Display()
{
    output.innerHTML = ""
    collection.reverse().forEach((element,index) => {
        output.innerHTML += `
        <tr userId = ${element.id}>
            <td>${index+1}</td>
            <td>${element.customerName}</td>
            <td>${element.vehicleNumber}</td>
            <td>${element.billStatus.paidAmount}</td>
            <td class="status${index}">${element.billStatus.paymentStatus}</td>
            <td>${element.billStatus.remainingAmount}</td>
            <td>${element.billStatus.paymentMode}</td>
            <td> <button class="btn btn-success" onclick="PrintF(event,${element.id})" ondblclick ="event.cancelBubble = true"  >Print</button></td>
        </tr>
        `

  
      if(document.querySelector(`.status${index}`).textContent==="Received")
      {
        document.querySelector(`.status${index}`).style.color = "green"
        document.querySelector(`.status${index}`).style.fontWeight = "bold"
      }
      if(document.querySelector(`.status${index}`).textContent==="Not Paid" || document.querySelector(`.status${index}`).textContent==="Balance")
      {
        document.querySelector(`.status${index}`).style.color = "red"
      }
       
        
       
    }); 
    $("tr").dblclick(function(){
        let id = this.getAttribute("userId")
        console.log(id)
        window.location.replace(`BillPage.html?id=${id}`)
       })

       let totalCash = collection.reduce((acc,current)=>acc + +current.billStatus.paidAmount,0)
        let cashOnly  = collection.reduce((acc,current)=>{
          if(current.billStatus.paymentMode==="Cash")
          {
            return acc +  +current.billStatus.paidAmount 
          }
          else{
            return acc;
          }
        },0)

        let onlineOnly = collection.reduce((acc,current)=>{
          if(current.billStatus.paymentMode==="Online")
          {
            return acc +  +current.billStatus.paidAmount 
          }
          else{
            return acc;
          }
        },0)
       totalAmount.textContent = totalCash 
        document.getElementById("cashPaymnet").textContent = cashOnly;
        document.getElementById("onliePaymnet").textContent = onlineOnly;

        document.getElementById("balanceamount").textContent = collection.reduce((acc,current)=>{
          if(current.billStatus.paymentStatus=="Not Paid" || current.billStatus.paymentStatus=="Balance"||current.billStatus.paymentStatus=="N/A")
          {
            console.log(current)
            return acc +  +current.billStatus.remainingAmount 
          }
          else{
            return acc;
          }
        },0)



      


}




