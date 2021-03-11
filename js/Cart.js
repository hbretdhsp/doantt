var count = 0;
function listCart() {
    var currentUser
    if (localStorage.getItem("currentUser") != null) {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    if(currentUser != null){
        if (localStorage.getItem("cart") != null) {
          cart = JSON.parse(localStorage.getItem("cart"));
            document.getElementById("cart-list").innerHTML = displayListCart(cart,currentUser).join("");
            document.getElementById("total-amount").innerHTML = displayTotalAmountCart(cart,currentUser);
          for(i = 0;i<cart.length;i++){
            if(cart[i].userName == currentUser.username) {
              count ++;
              document.getElementById("length-Cart").style.display = "block";
            };
        }
        document.getElementById("length-cart").innerHTML = count;
        if(count==0){
          document.getElementById("length-Cart").style.display = "none";
        }else document.getElementById("length-Cart").innerHTML = count;
      }
      }
      var currentUser = JSON.parse(localStorage.getItem("currentUser"))
      if(currentUser){
           document.getElementById("dropUser").textContent = currentUser.name 
           document.getElementById("dropUser").style.display = "block"
           document.getElementById("login").style.display = "none"
      }
      else{
         document.getElementById("dropUser").style.display = "none"
         document.getElementById("login").style.display = "block"
      }
}

var total = 0;
function displayListCart(cart,currentUser) {
    var renderProduct = cart.map((element, index) => {
        if(element.userName == currentUser.username){
            total += element.product['price'] * element.quantity;
        return `
            <div class="row mb-4">
            <div class="col-md-5 col-lg-3 col-xl-3">
                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                    <img class="img-fluid w-100"
                        src="${element.product['image']}"
                        alt="Sample">
                    <a href="#!">
                        <div class="mask">
                            <img class="img-fluid w-100"
                                src="${element.product['image']}">
                            <div class="mask rgba-black-slight"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-md-7 col-lg-9 col-xl-9">
                <div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5>${element.product['name']}</h5>
                            <p class="mb-3 text-muted text-uppercase small">${element.product['color']}</p>
                            <p class="mb-2 text-muted text-uppercase small">${element.product['category']}</p>
                            
                        </div>
                        <div>
                            <div class="def-number-input number-input safari_only mb-0 w-100">

                                <input class="quantity" min="0" name="quantity" id="quantity${element.id}" value="${element.quantity}"
                                    type="number" onchange="changeQuantity( ${element.id})">

                            </div>
                            <small id="passwordHelpBlock" class="form-text text-muted text-center">

                            </small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                        
                            <a href="Cart-product.html" type="button" target="_self"
                                class="card-link-secondary small text-uppercase mr-3" onclick="deleteProductCart(${element.id})"><i
                                    class="fas fa-trash-alt mr-1" ></i> Remove item </a>
                            <a href="#" type="button"
                                class="card-link-secondary small text-uppercase"><i
                                    class="fas fa-heart mr-1"></i> Move to wish list </a>
                        </div>
                        <p class="mb-0"><span><strong id="summary">${element.product['price'] * element.quantity}</strong></span></p
                            class="mb-0">
                    </div>
                </div>
            </div>
        </div>
           
          `

            ;
        }
        

    });
    return renderProduct;
}
function changeQuantity(id){
    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    var newQuantity =  Number(document.getElementById("quantity"+id).value);

    for(i=0;i<cart.length;i++){
        if(cart[i].id == id){
            cart[i].quantity = newQuantity;
            localStorage.setItem("cart",JSON.stringify(cart))
            alert("Da thay doi so luong")
        }
    }
    // cart.map((element,index)=>{
    //     if(element.id == id){
    //         element.quantity = newQuantity;
    //         localStorage.setItem("cart",JSON.stringify(cart))
    //         alert("Da thay doi so luong");
    //     }
    //   });
    new listCart();
    
}
function deleteProductCart(id){
    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    for(i=0;i<cart.length;i++){
        if(cart[i].id == id){
            cart.splice(i,1);
            localStorage.setItem("cart",JSON.stringify(cart))
            alert("Da xoa san pham")
        }
    }
    //   cart.map((element,index)=>{
    //     if(element.id == id){
    //         cart.splice(index,1);
    //         localStorage.setItem("cart",JSON.stringify(cart))
    //         alert("Da xoa san pham")
    //     }
    //   });
}
function displayTotalAmountCart(cart,currentUser) {
    var renderProduct;
    for(i=0;i<cart.length;i++){
        if(cart[i].userName == currentUser.username){
            renderProduct += `
        <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
        ${cart[i].product["name"]} <span>  ${cart[i].quantity}</span>
        <span>${cart[i].product['price'] * cart[i].quantity}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
        Shipping
        <span>Gratis</span>
    </li>
      `}
    }
    renderProduct +=`<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
    <div>
        <strong>The total amount</strong>
        <strong>
            <p class="mb-0">(including VAT)</p>
        </strong>
    </div>
    <span><strong>${total}</strong></span>
</li>`
     return renderProduct;
        
}
