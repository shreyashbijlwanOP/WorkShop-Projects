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
  get getCollection() {
    return JSON.parse(localStorage.getItem(this.key));
  }
}

let storeData = new Store("storeData");

let InputList = Array.from( document.getElementsByTagName("input"))


let model = {
    customerName: "" ,
    vehicleNumber:"",
    mobile:"",
    date:new Date().toDateString(),

        bill: {
            billAmount: 0,
            itemList:[
                // {   productId: "",
                //     productName:"",
                //     productQuantity:"",
                //     productPrice:"",
                //     totalAmount: 0,
                // },
            ] 
        },
        billStatus:{
            
            paymentMode:"N/A",
            paidAmount: 0,
            paymentStatus:"Not Paid",
            remainingAmount:0,
        }
}

let tempModel = {...model}
function Add()
{
    // Adding Values
    InputList.forEach(inputElement=>{
        tempModel[inputElement.name] = inputElement.value.toUpperCase();
    })
    // Adding Id 
    tempModel.id = storeData.maxId() + 1;

    storeData.add(tempModel)

    // Clearing Field
    InputList.forEach(inputElement=>{
        inputElement.value = "";
    })
    console.log(storeData.getCollection)
    alert("Customer Added Successfully")

    window.location.replace(`BillPage.html?id=${tempModel.id}`)
   
}




