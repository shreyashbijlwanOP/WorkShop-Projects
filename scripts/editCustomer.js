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
        console.log(model)
      this.collection = this.collection.map((currentObject) =>
        currentObject.id == id ? model : currentObject
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
  }

  let [[url, id]] = params;
  let store = new Store("storeData");
  let tempModel = {...store.getModel(id)};
  console.log(tempModel)


  
    let inputElements = Array.from(document.getElementsByTagName("input"))

    inputElements.forEach(inputElement=>{
        inputElement.value = tempModel[inputElement.name].toUpperCase()
    })


  function Update(){
    inputElements.forEach(inputElement=>{
        tempModel[inputElement.name] = inputElement.value.toUpperCase(); 
    })

    store.update(id,tempModel)

    alert("Update Successfully")

    window.location.replace(`BillPage.html?id=${tempModel.id}`)

  }
