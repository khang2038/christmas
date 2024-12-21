var bbiTL = new TimelineMax(),
  frame = document.getElementById("frame"),
  happy = document.getElementById("happy"),
  merry = document.getElementById("merry"),
  christmas = document.getElementById("christmas"),
  trees = document.getElementById("trees"),
  middle_tree = document.getElementById("middle_tree"),
  left_tree = document.getElementById("left_tree"),
  right_tree = document.getElementById("right_tree");

// Item drop animation
var totalItems = 18;
for (var i = 1; i <= totalItems; ++i) {
  var duration = Math.random() * (4.5 - 3) + 3;
  var start = Math.random();

  hanging(totalItems, i, duration, start);

  bbiTL.fromTo(
    "#item" + i,
    duration,
    { y: -$("#item" + i).height() / 3 },
    { ease: "bounce.out", y: 0 },
    start
  );
}

// Item hanging animation
function hanging(totalItems, i, duration, start) {
  var hangOffset = 0.3;
  var hangStart = start + duration - 0.2;
  var delay = Math.random() * 3 + 1;
  var rotation = -((1 / duration) * 3);

  bbiTL.to(
    "#item" + i,
    hangOffset,
    {
      rotation: rotation,
      transformOrigin: "0% 0%",
      repeatDelay: 0,
      ease: "back.out(2)",
      repeat: -1,
    },
    hangStart / 3
  );

  bbiTL.to(
    "#item" + i,
    10,
    {
      rotation: 0,
      transformOrigin: "0% 0%",
      ease: "elastic.out(2.5, 0.1)",
      repeatDelay: hangOffset,
      repeat: -1,
    },
    (hangStart + hangOffset) / 3
  );
}

function happyNewYear() {
  for (var h = 1; h <= 16; ++h) {
    var delay = h * 0.1;
    bbiTL.fromTo(
      ".happy_" + h,
      0.2,
      { scale: -1, opacity: 0 },
      { scale: 1, ease: "back.out(1.4)", opacity: 1 },
      delay + 4
    );
  }
}

// snow
var canvas = document.getElementById("snow"),
  ctx = canvas.getContext("2d"),
  width = (ctx.canvas.width = canvas.offsetWidth),
  height = (ctx.canvas.height = canvas.offsetHeight),
  snowflakes = [];

window.onresize = function () {
  width = ctx.canvas.width = canvas.offsetWidth;
  height = ctx.canvas.height = canvas.offsetHeight;

  snowflakes.forEach((flake) => flake.resized());
};

function updateSnowflakes() {
  snowflakes.forEach((flake) => flake.update());
}

function Snow() {
  this.x = random(0, width);
  this.y = random(-height, 0);
  this.radius = random(0.5, 3.0);
  this.speed = random(0.5, 2.0);
  this.wind = random(-0.1, 1.0);
  this.isResized = false;

  this.updateData = function () {
    this.x = random(0, width);
    this.y = random(-height, 0);
  };

  this.resized = function () {
    this.isResized = true;
  };
}

Snow.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
};

Snow.prototype.update = function () {
  this.y += this.speed;
  this.x += this.wind;

  if (this.y > height) {
    if (this.isResized) {
      this.updateData();
      this.isResized = false;
    } else {
      this.y = 0;
      this.x = random(0, width);
    }
  }
};

function createSnow(count) {
  for (var i = 0; i < count; i++) {
    snowflakes.push(new Snow());
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, width, height);
  snowflakes.forEach((flake) => flake.draw());
}

function snowLoop() {
  drawSnowflakes();
  updateSnowflakes();
  requestAnimationFrame(snowLoop);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

createSnow(200);
snowLoop();


$(document).ready(function () {
  var $card = $(".card"),
    $bgCard = $(".bgCard"),
    $icon = $(".icon"),
    cartPageBottomP = document.querySelector(".cart-page-bottom p"),
    cartPageBottomH4 = document.querySelector(".cart-page-bottom h4");
    let textTitle = "Gửi Thư đáng yêu nhất quả đất!";
    let charArrTitle = textTitle.split('');
let text = "Giáng sinh này anh không ở cạnh em được, anh biết em buồn lòng nhiều nè, anh tạo món quà nhỏ nhỏ tặng em, mong em thích. Chúc Thư của anh có một giáng sinh thật vui vẻ thật là hạnh phúc, nhớ ăn uống đầy đủ nha, ốm quá rùi nè!!, Anh thương em❤️ "
let charArrContent = text.split('');
var currentIndexTitle = 0;
var currentIndexContent = 0;
var textIntervalTitle;
var textIntervalContent;
function resetText(){
    clearInterval(textIntervalTitle)
    clearInterval(textIntervalContent)
    cartPageBottomH4.textContent = "";
    cartPageBottomP.textContent = "";
    currentIndexTitle = 0;
    currentIndexContent = 0;
}
  $card.on("click", function () {
    $(this).toggleClass("is-opened");
    if($card.hasClass("is-opened")){
        textIntervalTitle = setInterval(function(){
            if(currentIndexTitle < charArrTitle.length){
                cartPageBottomH4.textContent += charArrTitle[currentIndexTitle];
                currentIndexTitle++;
                console.log(currentIndexTitle)
            }
            else{
                clearInterval(textIntervalTitle)
                textIntervalContent = setInterval(function(){
                    if(currentIndexContent < charArrContent.length){
                        cartPageBottomP.textContent += charArrContent[currentIndexContent];
                        currentIndexContent++;
                console.log(currentIndexContent)
                    }
                    else{
                        clearInterval(textIntervalContent)
                    }
                },100)
            }
        },100)
    }
    else{
        resetText()
    }
  });

  $(".centerer").on("click", function () {
    $card.fadeIn();
    $bgCard.fadeIn();
    $icon.fadeIn();
  });
  $(".fa-xmark").on("click", function () {
    $card.fadeOut();
    $bgCard.fadeOut();
    $icon.fadeOut();
    $card.removeClass("is-opened");
    resetText()
  });

});


// Tạo hiệu ứng rơi item mà không dùng GSAP
// const totalItems = 18;

// for (let i = 1; i <= totalItems; i++) {
//   const item = document.getElementById(`item${i}`);
//   const duration = Math.random() * (4.5 - 3) + 3;
//   const delay = Math.random();

//   // Áp dụng hiệu ứng bằng CSS
//   item.style.animation = `drop ${duration}s ease-out ${delay}s forwards, hang 3s infinite ease-in-out ${delay + duration}s`;
// }

// // Thêm hiệu ứng CSS vào phần tử
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes drop {
//     from {
//       transform: translateY(-100%);
//     }
//     to {
//       transform: translateY(0);
//     }
//   }

//   @keyframes hang {
//     0%, 100% {
//       transform: rotate(-5deg);
//     }
//     50% {
//       transform: rotate(5deg);
//     }
//   }
// `;
// document.head.appendChild(style);

// // Hiệu ứng tuyết rơi
// const canvas = document.getElementById("snow");
// const ctx = canvas.getContext("2d");
// let width = (ctx.canvas.width = canvas.offsetWidth);
// let height = (ctx.canvas.height = canvas.offsetHeight);
// const snowflakes = [];

// window.onresize = function () {
//   width = ctx.canvas.width = canvas.offsetWidth;
//   height = ctx.canvas.height = canvas.offsetHeight;
//   snowflakes.forEach((flake) => flake.resized());
// };

// function updateSnowflakes() {
//   snowflakes.forEach((flake) => flake.update());
// }

// function Snow() {
//   this.x = random(0, width);
//   this.y = random(-height, 0);
//   this.radius = random(0.5, 3.0);
//   this.speed = random(0.5, 2.0);
//   this.wind = random(-0.1, 1.0);
//   this.isResized = false;

//   this.updateData = function () {
//     this.x = random(0, width);
//     this.y = random(-height, 0);
//   };

//   this.resized = function () {
//     this.isResized = true;
//   };
// }

// Snow.prototype.draw = function () {
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//   ctx.fillStyle = "#fff";
//   ctx.fill();
//   ctx.closePath();
// };

// Snow.prototype.update = function () {
//   this.y += this.speed;
//   this.x += this.wind;

//   if (this.y > height) {
//     if (this.isResized) {
//       this.updateData();
//       this.isResized = false;
//     } else {
//       this.y = 0;
//       this.x = random(0, width);
//     }
//   }
// };

// function createSnow(count) {
//   for (let i = 0; i < count; i++) {
//     snowflakes.push(new Snow());
//   }
// }

// function drawSnowflakes() {
//   ctx.clearRect(0, 0, width, height);
//   snowflakes.forEach((flake) => flake.draw());
// }

// function snowLoop() {
//   drawSnowflakes();
//   updateSnowflakes();
//   requestAnimationFrame(snowLoop);
// }

// function random(min, max) {
//   return Math.random() * (max - min) + min;
// }

// createSnow(200);
// snowLoop();

// // Hiển thị thông điệp với hiệu ứng chữ
// const cartPageBottomP = document.querySelector(".cart-page-bottom p");
// const cartPageBottomH4 = document.querySelector(".cart-page-bottom h4");
// let textTitle = "Gửi Thư đáng yêu nhất quả đất!";
// let charArrTitle = textTitle.split('');
// let text = "Giáng sinh này anh không ở cạnh em được, anh biết em buồn lòng nhiều nè, anh tạo món quà nhỏ nhỏ tặng em, mong em thích. Chúc Thư của anh có một giáng sinh thật vui vẻ thật là hạnh phúc, nhớ ăn uống đầy đủ nha, ốm quá rùi nè!!, Anh thương em❤️ ";
// let charArrContent = text.split('');
// let currentIndexTitle = 0;
// let currentIndexContent = 0;
// let textIntervalTitle;
// let textIntervalContent;

// function resetText() {
//   clearInterval(textIntervalTitle);
//   clearInterval(textIntervalContent);
//   cartPageBottomH4.textContent = "";
//   cartPageBottomP.textContent = "";
//   currentIndexTitle = 0;
//   currentIndexContent = 0;
// }

// $(document).ready(function () {
//   const $card = $(".card");
//   const $bgCard = $(".bgCard");
//   const $icon = $(".icon");

//   $card.on("click", function () {
//     $(this).toggleClass("is-opened");
//     if ($card.hasClass("is-opened")) {
//       textIntervalTitle = setInterval(function () {
//         if (currentIndexTitle < charArrTitle.length) {
//           cartPageBottomH4.textContent += charArrTitle[currentIndexTitle];
//           currentIndexTitle++;
//         } else {
//           clearInterval(textIntervalTitle);
//           textIntervalContent = setInterval(function () {
//             if (currentIndexContent < charArrContent.length) {
//               cartPageBottomP.textContent += charArrContent[currentIndexContent];
//               currentIndexContent++;
//             } else {
//               clearInterval(textIntervalContent);
//             }
//           }, 100);
//         }
//       }, 100);
//     } else {
//       resetText();
//     }
//   });

//   $(".centerer").on("click", function () {
//     $card.fadeIn();
//     $bgCard.fadeIn();
//     $icon.fadeIn();
//   });

//   $(".fa-xmark").on("click", function () {
//     $card.fadeOut();
//     $bgCard.fadeOut();
//     $icon.fadeOut();
//     $card.removeClass("is-opened");
//     resetText();
//   });
// });

