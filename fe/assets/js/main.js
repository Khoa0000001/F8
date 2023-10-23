import mainHome from "./mainHome.js";
import roadmap from "./roadmap.js";
import blog from "./blog.js";
import mainHomeJS from "./mainHomeJS.js";
// import roadmapJS from "./roadmapJS.js";
import blogJS from "./blogJS.js";
document.querySelector(".contens--Conten").innerHTML = mainHome;
mainHomeJS();

document.querySelectorAll(".SideBar--list li").forEach(function (item, index) {
  item.addEventListener("click", function () {
    var current = document.getElementsByClassName("activate");
    current[0].className = current[0].className.replace("activate", "");
    this.className += "activate";
    switch (item.querySelector(".SideBar--list_title").textContent) {
      case "Home":
        document.querySelector(".contens--Conten").innerHTML = mainHome;
        document.documentElement.scrollTop = 0;
        mainHomeJS();
        break;
      case "Lộ trình":
        document.querySelector(".contens--Conten").innerHTML = roadmap;
        document.documentElement.scrollTop = 0;
        // roadmapJS();
        break;
      case "Blog":
        document.querySelector(".contens--Conten").innerHTML = blog;
        document.documentElement.scrollTop = 0;
        blogJS();
        break;
    }
  });
});

// st: hiệu ứng của thành search trên heading
document
  .querySelector(".NavBar--search_input")
  .addEventListener("click", function (e) {
    document.querySelector(".NavBar--seach").style.border = "2px solid #333";
    e.stopPropagation();
  });
document.body.addEventListener("click", function (e) {
  document.querySelector(".NavBar--seach").style.border = "2px solid #e8e8e8";
});
//////////////////////////////// end //////////////////////////////////

//st: hiện blog
let SideBar__blogIconEl = document.querySelector(".SideBar--blogIcon");

SideBar__blogIconEl.addEventListener("click", function (e) {
  document
    .querySelector(".SideBar--blogIcon > i")
    .setAttribute("style", "transform: rotate(45deg);font-size: 20px;");
  e.stopPropagation();
});

window.addEventListener("click", function (e) {
  document.querySelector(".SideBar--blogIcon > i").removeAttribute("style");
});

////////////////////////////////end //////////////////////////////////
