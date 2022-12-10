
 function numberToEnglish(n, custom_join_character) {

    var string = n.toString(),
        units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

    var and = custom_join_character || 'and';

    /* Is number zero? */
    if (parseInt(string) === 0) {
        return 'zero';
    }

    /* Array of units as words */
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    /* Array of tens as words */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Array of scales as words */
    scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {

        chunk = parseInt(chunks[i]);

        if (chunk) {

            /* Split chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Add scale word if chunk is not zero and array item exists */
            if ((word = scales[i])) {
                words.push(word);
            }

            /* Add unit word if array item exists */
            if ((word = units[ints[0]])) {
                words.push(word);
            }

            /* Add tens word if array item exists */
            if ((word = tens[ints[1]])) {
                words.push(word);
            }

            /* Add 'and' string after units or tens integer if: */
            if (ints[0] || ints[1]) {

                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if (ints[2] || !i && chunksLen) {
                    words.push(and);
                }

            }

            /* Add hundreds word if array item exists */
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }

        }

    }

    return words.reverse().join(' ');

}




let [[link,id]] = new URLSearchParams(window.location.href)
console.log(id)


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

  function display()
  {
    bill.innerHTML =``;
    console.log(data)
    let collection = data.bill.itemList;
    collection.forEach((element,index) => {
      bill.innerHTML +=`
      <tr>
      <td>${index+1}</td>
      <td>${element.productName}</td>
      <td>${element.productQuantity}</td>
      <td>${element.productPrice}</td>
      <td>${element.totalPrice}</td>
      </tr>
      `
    });

    total.textContent = data.bill.billAmount
    totalInWords.textContent = inWords

    customerDetails =Array.from(customerDetails)
    customerDetails.forEach(elem=>{
     
      elem.innerHTML = `<strong>${elem.title} :</strong> <span>${data[elem.id]}</span>`
    })
    }

  let store = new Store("storeData")
  let data = store.getModel(id)
  let bill = document.getElementById("bill")
  let total = document.getElementById("total")
  let totalInWords = document.getElementById("inWords")
  let inWords = " RUPEES : "+ numberToEnglish(data.bill.billAmount).toUpperCase()+" ONLY"
  let  customerDetails = document.querySelector(".customer-details").getElementsByTagName("p")


  display();
  





  
 