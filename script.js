function showSidebar() {
  const sidebar = document.querySelector(".slide-active");
  sidebar.style.display = "block";
}
function hideSidebar() {
  const sidebar = document.querySelector(".slide");
  sidebar.style.display = "none";
}

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}

//remove item
function loadContent() {
  let remove = document.querySelectorAll(".remove");
  remove.forEach((btn) => {
    btn.addEventListener("click", removeitem);
  });

  //quantity value changing
  let qty = document.querySelectorAll(".quantity");
  qty.forEach((btn) => {
    btn.addEventListener("change", changeqty);
  });

  //food cart
  let cartBtns = document.querySelectorAll(".cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });
  total();
}

//quantity value min:1
function changeqty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

//item remove
function removeitem() {
  if (confirm("Are you sure to remove this item")) {
    let title=this.parentElement.querySelector('.food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

let itemList=[];
//food add

function addCart() {
  let food = this.parentElement;
  let title = food.querySelector("h3").innerHTML;
  let price = food.querySelector("h5").innerHTML;
  let imgsrc = food.querySelector("img").src;

  let product={title,price,imgsrc}
  // check the item is already in cart
  if(itemList.find((el)=>el.title==product.title)){
    alert("product is already added in a cart");
    return;
  }else{
    itemList.push(product);
  }

  let newProduct = creatProduct(title, price, imgsrc);
  let cartcon = document.querySelector(".cart-content");

  cartcon.innerHTML += newProduct;
  loadContent();
}

function creatProduct(title, price, imgsrc) {
  return `
  <div class="cart-food">
          <img src="${imgsrc}" alt="dosa" class="cart-img">
          <div class="details">
            <div class="food-title">${title}</div>
            <div class="price-box">
            <div class="price">${price}</div>
            <div class="price-amt">${price}</div>
            </div>
             <input type="number" value="1" class="quantity">
          </div>
         <ion-icon name="trash" class="remove"></ion-icon>
        </div>`;
}

function total(){
  const all=document.querySelectorAll('.cart-food');
  const alltotal=document.querySelector('.total-price');

  let total=0;
  all.forEach(product=>{
    let priceAmt=product.querySelector('.price');
    let price=parseFloat(priceAmt.innerHTML.replace("Rs.",""));
    let qty=product.querySelector('.quantity').value;
    total+=(price*qty);
    product.querySelector('.price-amt').innerText="Rs."+price*qty;
  });
  alltotal.innerHTML="Rs."+total;

  // add cart count
  const cartCount=document.querySelector('.count');
  let count=itemList.length;
  cartCount.innerHTML=count;
  if(count==0){
    cartCount.style.display='none'
  }else{
    cartCount.style.display='block'
  }

}



//ratings
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener('click', () => {
    const clickedValue = parseInt(star.dataset.value);

    // If clicked again on the same rating, deselect
    if (clickedValue === selectedRating) {
      selectedRating = 0;
      ratingValue.textContent = `Rating: ${selectedRating}`;
      resetStars();
    } else {
      selectedRating = clickedValue;
      ratingValue.textContent = `Rating: ${selectedRating}`;
      resetStars();
      highlightStars(selectedRating);
    }
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    if (parseInt(star.dataset.value) <= rating) {
      star.classList.add('selected');
    }
  });
}

function resetStars() {
  stars.forEach((star) => {
    star.classList.remove('selected');
  });
}



//alert message for all buttons

let feed=document.querySelector('.feedback')
feed.addEventListener("click",()=>{
  alert('Backend is not connected ')
})
let order=document.querySelector('.order')
order.addEventListener("click",()=>{
  alert('Backend is not connected ')
})


