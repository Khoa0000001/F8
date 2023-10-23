import LIST_POSTS from "../../data/list_posts.js";

function blogJS() {
  let template_posts;
  function render_posts(number_page) {
    template_posts = LIST_POSTS.map((item, index) => {
      return `${
        index >= (number_page - 1) * 10 && index < number_page * 10
          ? ` <div class="Bg-Layout_postItem">
                <div class="Bg-postItem_header">
                    <div class="Bg-postItem_header-left">
                        <a href="" class="PostItem_avarta ${
                          item.id_vip ? `PostItem_avarta--vip` : ``
                        } ">
                            <div class="Fallback_avarta">
                                <img src="${item.avarta_img}" alt="">
                                ${
                                  item.id_vip
                                    ? `<img src="./assets/img/icon/crown_nghien.svg" alt="">`
                                    : ``
                                }                               
                            </div>
                        </a>
                        <a href="">
                            <span>${item.name}</span>
                        </a>
                    </div>
                    <div class="Bg-postItem_header-right">
                        <i class="fa-regular fa-bookmark"></i>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div class="Bg-postItem_body">
                    <div class="Bg-postItem_body-info">
                        <a href="">
                            <h2>${item.title}</h2>
                        </a>
                        <p class="">
                            ${item.desc}
                        </p>
                        <div class="Bg-postItem_body-info_end">
                            <a class="Bg--tags" href="">Front-end</a>
                            <span>${item.times.day}</span>
                            <span class="Bg-dost">·</span>
                            ${item.times.hours}
                        </div>
                    </div>
                    <div class="Bg-postItem_body-img">
                        <img src="${item.img}" alt="">
                    </div>
                </div>
            </div>`
          : ``
      }           
`;
    });
    template_posts = template_posts.join(" ");
    document.querySelector(".Bg_renderPostsJS").innerHTML = template_posts;
  }

  function scroll_start() {
    document.documentElement.scrollTop = 0;
  }

  function check_numberPage(number_page) {
    if (document.querySelector(".Bg-pagination_page_disabled")) {
      var current = document.getElementsByClassName(
        " Bg-pagination_page_disabled"
      );
      current[0].className = current[0].className.replace(
        " Bg-pagination_page_disabled",
        "  "
      );

      if (number_page == 1) {
        document.querySelector(
          ".Bg-pagination_pages"
        ).firstElementChild.className += " Bg-pagination_page_disabled";
      } else if (
        number_page ==
        document.querySelectorAll(".Bg-pagination_page").length - 2
      ) {
        document.querySelector(
          ".Bg-pagination_pages"
        ).lastElementChild.className += " Bg-pagination_page_disabled";
      }
    } else {
      if (number_page == 1) {
        document
          .querySelector(".Bg-pagination_pages")
          .firstElementChild.classList.add("Bg-pagination_page_disabled");
      }
      if (
        number_page ==
        document.querySelectorAll(".Bg-pagination_page").length - 2
      ) {
        document
          .querySelector(".Bg-pagination_pages")
          .lastElementChild.classList.add("Bg-pagination_page_disabled");
      }
    }
  }

  function ascend_numberpage(_this, index) {
    var current = document.getElementsByClassName(
      " Bg-pagination_page_activity"
    );
    current[0].className = current[0].className.replace(
      " Bg-pagination_page_activity",
      " "
    );
    _this.className += " Bg-pagination_page_activity";
    check_numberPage(index);
    render_posts(index);
    scroll_start();
  }

  let template_post = `<div class="Bg-pagination_page Bg-pagination_page_activity">1</div>`;
  if (LIST_POSTS.length / 10 > 1) {
    for (var i = 1; i < Math.floor(LIST_POSTS.length / 10) + 1; i++) {
      template_post += `<div class="Bg-pagination_page">${i + 1}</div>`;
    }
  }

  document.querySelector(".Bg_renderJS").insertAdjacentHTML(
    "beforeend",
    `<div class="Bg-pagination">
        <div class="Bg-pagination_pages">
            <div class="Bg-pagination_page Bg-pagination_page_disabled">
                <i class="fa-solid fa-angles-left"></i>
            </div>
            ${template_post}
            <div class="Bg-pagination_page">
                <i class="fa-solid fa-angles-right"></i>
            </div>
        </div>
    </div>`
  );

  render_posts(1);

  document
    .querySelectorAll(".Bg-pagination_page")
    .forEach(function (item, index) {
      item.addEventListener("click", function () {
        if (
          item == item.parentElement.firstElementChild ||
          item == item.parentElement.lastElementChild
        ) {
          if (
            item == item.parentElement.lastElementChild &&
            document.querySelector(".Bg-pagination_page_activity")
              .textContent !=
              document.querySelectorAll(".Bg-pagination_page").length - 2
          ) {
            ascend_numberpage(
              document.querySelector(".Bg-pagination_page_activity")
                .nextSibling,
              parseInt(
                document.querySelector(".Bg-pagination_page_activity")
                  .textContent
              ) + 1
            );
          }
          if (
            item == item.parentElement.firstElementChild &&
            document.querySelector(".Bg-pagination_page_activity")
              .textContent != 1
          ) {
            ascend_numberpage(
              document.querySelector(".Bg-pagination_page_activity")
                .previousSibling,
              parseInt(
                document.querySelector(".Bg-pagination_page_activity")
                  .textContent
              ) - 1
            );
          }
        } else {
          ascend_numberpage(this, index);
        }
      });
    });
}

export default blogJS;
