

$('.slider').slick({
    autoplay: true,
    infinite: true,
    dots: true, 
    slidesToShow: 1,
    slidesToScroll: 1

}); 



  $(document).ready(function(){
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/", function(data, status){
        let response = data

        $(function () {
          const page = location.pathname;
          const isHome = page.includes("index");
          const isProduct = page.includes("product");
          const checkout = page.includes("checkout");
          const confirm = page.includes("orderconfirm");
         

          if (isHome) {
            productCard(response, status)
            const jsonUser = JSON.stringify(response);
            localStorage.setItem("product", jsonUser);
            checkbox(response)      
            updateCounter()   
          }
          if (isProduct) {
            productlist(response)       
            checkbox()  
            updateCounter() 
          }
          if(checkout){
            let newArr = JSON.parse(localStorage.getItem("data")) || []
            //console.log(newArr)
            const checkout = $(".card-inner");
            let total_amount = $(".total-amount-count") 
            let warning = document.querySelector('.warning')
            let total = 0;
            let total_item = $(".total-item-count") 
            total_item.html(newArr.length)
        
            let confirmBtn = $('#btn-click')
            confirmBtn.on({
              click:function(){
                 if(newArr.length != []){
                  location.pathname = 'orderconfirm.html'
                 }else{
                  warning.classList.add("active-link");
                 }
              }
            })
            
             let data = newArr
            data.forEach(element => {
              let cart =  createUserCard(element)
              checkout.append(cart)
             total += element.price
            });
    
            total_amount.html(total)
            checkbox()
            updateCounter() 
           
          }
          if(confirm){
            confirmPage()
          }
        });
      });
  });

 let currentUser = null;
  let clothingGrid = document.getElementById("clothing-grid");
  let accessoryGrid = document.getElementById("accessory-grid");
  
  function productCard(product) {
    for (let each_card of product) {

       currentUser = each_card;
    
      const creatLink = document.createElement('a');
      creatLink.setAttribute('href',`/product.html?product_id=${each_card.id}`);
      creatLink.classList = "product-link";



      const cardDiv = document.createElement("div");
      cardDiv.classList = "product-card";
  
      const img = document.createElement("img");
      img.classList = "preview-image";
      img.setAttribute("src", each_card.img);
  
      const innerdiv = document.createElement("div");
      innerdiv.classList = "product-name";
  
      const h3 = document.createElement("h3");
      h3.classList = "product-name";
  
      const p = document.createElement("p");
      p.classList = "product-brand";
  
      const product_price = document.createElement("p");
      product_price.classList = "product-price";
  
      img.src = each_card.preview;
      h3.innerHTML = each_card.name;
      p.innerHTML = each_card.brand;
      product_price.innerHTML = each_card.price;
  
      innerdiv.append(h3);
      innerdiv.append(p);
      innerdiv.append(product_price);
      cardDiv.append(img);
      cardDiv.append(innerdiv);
      creatLink.append(cardDiv)
  
      if (each_card.isAccessory) {
        accessoryGrid.append(creatLink);
      } else {
        clothingGrid.append(creatLink);
      }
    }
  }
  



//cart details page javascript

let container = document.querySelector("#container");
let user = null
function productlist() {
  let userId = currentCart()
  const allProducts = JSON.parse(localStorage.getItem("product"));
  user = allProducts.find((i) => Number(i.id) === userId);
  




  let left_side = document.createElement("div");
  left_side.classList = "left-side";
  let preImg = document.createElement("img");
  preImg.src = user.preview;
  preImg.classList = "preImg";
  left_side.append(preImg);
  container.append(left_side);

  let img_gallery = document.createElement("div");
  img_gallery.classList = "img-gallery";


   

  let right_side = document.createElement("div");
  right_side.classList = "right-side";
  let heading = document.createElement("div");
  heading.classList = "heading";
  heading.innerHTML = user.name;
  let heading_sub = document.createElement("div");
  heading_sub.classList = "sub-heading";
  heading_sub.innerHTML = user.brand;
  let price = document.createElement("div");
  price.classList = "price";
  price.innerHTML = user.price;
  let desc = document.createElement("div");
  desc.classList = "desc";
  desc.innerHTML = "Description";
  let desc_para = document.createElement("div");
  desc_para.classList = "desc-para";
  desc_para.innerHTML = user.description;
  let product_review = document.createElement("div");
  product_review.classList = "product-review";
  product_review.innerHTML = "Product Preview";



  let img_card_1 = document.createElement("img");
  img_card_1.setAttribute("src", user.photos[0]);
  img_card_1.classList = "active img-card-1";

  let img_card_2 = document.createElement("img");
  img_card_2.setAttribute("src", user.photos[1]);
  img_card_2.classList = "img-card-2";

  let img_card_3 = document.createElement("img");
  img_card_3.setAttribute("src", user.photos[2]);
  img_card_3.classList = "img-card-3";

  let img_card_4 = document.createElement("img");
  img_card_4.setAttribute("src", user.photos[3]);
  img_card_4.classList = "img-card-4";

  let img_card_5 = document.createElement("img");
  img_card_5.setAttribute("src", user.photos[4]);
  img_card_5.classList = "img-card-5";

  let btn = document.createElement("button");
  btn.classList = "btn";
  btn.setAttribute('id','btn-id');
  btn.innerHTML = "Add to Cart";


  right_side.append(heading);
  right_side.append(heading_sub);
  right_side.append(price);
  right_side.append(desc);
  right_side.append(desc_para);
  right_side.append(product_review);
  img_gallery.append(img_card_1);
  img_gallery.append(img_card_2);
  img_gallery.append(img_card_3);
  img_gallery.append(img_card_4);
  img_gallery.append(img_card_5);
  right_side.append(img_gallery);
  right_side.append(btn);
  container.append(right_side);

  let imgCard1 = document.querySelector(".img-card-1");
  let imgCard2 = document.querySelector(".img-card-2");
  let imgCard3 = document.querySelector(".img-card-3");
  let imgCard4 = document.querySelector(".img-card-4");
  let imgCard5 = document.querySelector(".img-card-5");

  imgCard1.addEventListener("click", function () {
    preImg.src = user.photos[0];
    imgCard1.classList.add("active");
    imgCard2.classList.remove("active");
    imgCard3.classList.remove("active");
    imgCard4.classList.remove("active");
    imgCard5.classList.remove("active");
  });

  imgCard2.addEventListener("click", function () {
    preImg.src = user.photos[1];
    imgCard2.classList.add("active");
    imgCard1.classList.remove("active");
    imgCard3.classList.remove("active");
    imgCard4.classList.remove("active");
    imgCard5.classList.remove("active");
  });

  imgCard3.addEventListener("click", function () {
    preImg.src = user.photos[2];
    imgCard3.classList.add("active");
    imgCard1.classList.remove("active");
    imgCard2.classList.remove("active");
    imgCard4.classList.remove("active");
    imgCard5.classList.remove("active");
  });

  imgCard4.addEventListener("click", function () {
    preImg.src = user.photos[3];
    imgCard4.classList.add("active");
    imgCard1.classList.remove("active");
    imgCard2.classList.remove("active");
    imgCard3.classList.remove("active");
    imgCard5.classList.remove("active");
  });

  imgCard5.addEventListener("click", function () {
    preImg.src = user.photos[4];
    imgCard5.classList.add("active");
    imgCard1.classList.remove("active");
    imgCard2.classList.remove("active");
    imgCard3.classList.remove("active");
    imgCard4.classList.remove("active");
  });

     if(img_gallery.children.length > user.photos.length){
      imgCard5.style.display = "none"
      imgCard4.style.display = "none"
  }

}



// checkout page

function createUserCard(response) {
  const cardTemplate = checkoutpage(response);
  return $(cardTemplate);
}

function  checkoutpage(response){
  
  const {name, preview, price} = response

    return `
   
    <div class="container-checkout-wrapper">
        <div class="container-wrapper">
            <div class="checkout-cart">
                <div class="img-wrapper">
                  <img src="${preview}" alt="">
                </div>
                <div class="details-wrapper">
                    <p class="check-out-heading">
                        ${name}</p>
                    <p class="count-item">X1</p>
                    <p class="amout">Amount Rs: <span class="total-item-count">${price}</span></p>
                  
                </div>
            </div>
  
        </div>
    
    </div>
    `

}



function checkbox(){
  let btnclick = $('#btn-id')
  let searchQuery = location.search;
  let searchObj = new URLSearchParams(searchQuery);
  let userId = Number(searchObj.get("product_id"));
  let newArr = JSON.parse(localStorage.getItem("data")) || [] 
  let currentdata = JSON.parse(localStorage.getItem("count")) || 0;



  btnclick.on({
    click: function(){
      let isUserExist = newArr.find((i) => Number(i.id) === userId);
      if(isUserExist){
       console.log(isUserExist)
      
      
      } else{
        currentdata++;
        localStorage.setItem('count', currentdata)
        newArr.push(user)
       localStorage.setItem('data', JSON.stringify(newArr))
        updateCounter() 
      }
    }
  })

  
}

function updateCounter(){
  let cartCount = $(".cart-num")

  let currentdata = JSON.parse(localStorage.getItem("count")) || 0;
  cartCount.html(currentdata) 
}


function currentCart(){
  const searchQuery = location.search;
  const searchObj = new URLSearchParams(searchQuery);
  let userId = Number(searchObj.get("product_id"));
  return userId
}



function confirmPage(){
  localStorage.removeItem("data")
  localStorage.removeItem("count")
}


  