import LIST_COURSE from "../../data/list_course.js";

function mainHomeJS() {
  let template_course;
  template_course = LIST_COURSE.map((item, index) => {
    return `
  <div class="wrapper_list">
                            ${
                              item.id === 2
                                ? `<p class="wrapper_list-sub--heading">
                            <strong>${item.number_sub}+</strong>
                            người khác đã học
                           </p>`
                                : ``
                            }
                            <div class="wrapper_list--heading">
                                <h2 class="wrapper_list--heading-title">
                                    <span>
                                        ${item.title}
                                        ${item.title_new}
                                    </span>
                                </h2>
                                ${
                                  item.id !== 1
                                    ? `<a href="" class="wrapper_list--heading-view_all">${
                                        item.id == 2
                                          ? `Xem lộ trình`
                                          : `Xem tất cả`
                                      }<i class="fa-solid fa-angle-right"></i>
                                      </a>`
                                    : ``
                                }
                            </div>
                            <div class="wrapper_list--body">
                                <div class="row wrapper_list--body_row">            
                                      ${item.conter
                                        .map((item, index) => {
                                          return `
                                          <div class="wrapper_list--body_col col-4 col_TB-4 col_MB-2">
                                                <div class="wrapper_list--body_col-item">
                                                    <a href="" class="wappe_list-item--img ${
                                                      item.view_more
                                                    }" style="background-image: url(${
                                            item.url
                                          });">
                                                    
                                                            <button class="btn_in-item--img">${
                                                              item.read_time
                                                                ? `Xem bài viết`
                                                                : item.view &&
                                                                  item.like &&
                                                                  item.cmt
                                                                ? `Xem video`
                                                                : `Xem khóa học`
                                                            }</button>
                                                            ${
                                                              !item.course_pro
                                                                ? ``
                                                                : `<div class="icon_in--item">
                                                                <img src="./assets/img/icon/crown_thang.svg" alt="">
                                                            </div>`
                                                            }
                                                            
                                                    </a>
                                                    <h3 class="title_of-item--img">
                                                        <a href="">${
                                                          item.description
                                                        }</a>
                                                    </h3>
                                                    ${
                                                      item.user
                                                        ? `
                                                        <div class="hide_BM">
                                                            <i class="fa-solid fa-users icon_number_user"></i>
                                                            <span>${item.user}</span>
                                                        </div>`
                                                        : item.read_time
                                                        ? `
                                                         <div class="PostItem_author hide_BM">
                                                            <a href="" class="PostItem_avarta ${
                                                              item.vip
                                                            }">
                                                                <div class="Fallback_avarta">
                                                                    <img src="${
                                                                      item.avarta
                                                                    }" alt="">                                                                    
                                                                    ${
                                                                      item.vip
                                                                        ? `<img src="./assets/img/icon/crown_nghien.svg" alt="">`
                                                                        : ``
                                                                    }
                                                                    
                                                                </div>
                                                            </a>
                                                            <a href="">
                                                                <span class="PostItem_user_name">${
                                                                  item.name_avarta
                                                                }</span>
                                                                ${
                                                                  item.vip
                                                                    ? `<i class="fa-solid fa-circle-check"></i>`
                                                                    : ``
                                                                }                                                                
                                                                <span style="margin: 0 8px;">.</span>
                                                                <samp>${
                                                                  item.read_time
                                                                } phút đọc</samp>
                                                            </a>
                                                          </div>
                                                        `
                                                        : item.view &&
                                                          item.like &&
                                                          item.cmt
                                                        ? `<div class="videoItem hide_BM">
                                                              <div>
                                                                  <i class="fa-solid fa-eye"></i>
                                                                  <span>${item.view}</span>
                                                              </div>
                                                              <div>
                                                                  <i class="fa-solid fa-thumbs-up"></i>
                                                                  <span>${item.like}</span>
                                                              </div>
                                                              <div>
                                                                  <i class="fa-solid fa-comment"></i>
                                                                  <span>${item.cmt}</span>
                                                              </div>
                                                            </div> `
                                                        : item.price_new ||
                                                          item.price_old
                                                        ? `
                                                        <div class="price">
                                                            <span class="old--price">${item.price_old}</span>
                                                            <span class="new-price">${item.price_new}</span>
                                                        </div>`
                                                        : ``
                                                    }
                                                </div>
                                            </div> `;
                                        })
                                        .join(" ")}
                                  </div>        
                              </div>
                        </div>
`;
  });
  template_course = template_course.join(" ");
  document.querySelector(".Home--wrapper").innerHTML = template_course;

  let slick__trackEL = document.querySelector(".slick--track");
  let width_trackEL = slick__trackEL.getBoundingClientRect().width;

  const wrapper_backEL = document.querySelector(".slisdeshow--wrapper-back");
  const wrapper_nextEL = document.querySelector(".slisdeshow--wrapper-next");
  const slick__slideEl = document.querySelectorAll(".slick--slide");
  const wrapper_listEl = document.querySelector(".slisdeshow--wrapper-list");
  const wrapper__dostEls = document.querySelectorAll(
    ".slisdeshow--wrapper-dost li"
  );
  let wrapper__dostEl = document.querySelector(".slisdeshow--wrapper-dost");

  // st: cách chạy của Home--slisdeshow
  let nextEL = document.querySelector(
    ".slisdeshow--wrapper-dost-check"
  ).parentElement; // El  hiện tại đang hiển thị
  // note: dost_btn(El muốn đến , El hiện tại)
  function dost_btn(item, itemback) {
    // st: check số phần tử phải scroll
    var x;
    for (const key in wrapper__dostEls) {
      if (wrapper__dostEls[key] === itemback) {
        x = key;
      }
    }
    for (const key in wrapper__dostEls) {
      if (wrapper__dostEls[key] === item) {
        x = key - x;
      }
    }
    /////////////////// end //////////////////

    // st: check phần tử đang ở đầu cuối
    if (item === itemback && item === wrapper__dostEl.firstElementChild) {
      x = 1;
    }
    if (item === itemback && item === wrapper__dostEl.lastElementChild) {
      x = -1;
    }
    /////////////////// end //////////////////

    // st: hiệu ứng của thành slisdeshow--wrapper-dost
    wrapper__dostEls.forEach(function (item) {
      item.firstChild.removeAttribute("class");
    });
    item.firstChild.setAttribute("class", "slisdeshow--wrapper-dost-check");
    /////////////////// end //////////////////

    // st: check số phần tử cần scroll đến có nằm trong khoảng scroll
    var b = slick__trackEL.scrollLeft + width_trackEL * x;
    var a = width_trackEL * (slick__trackEL.children.length - 1);
    var a_b = (b - a) / width_trackEL;
    var b_0 = b / width_trackEL;
    if (x > 0 && b > a) {
      for (var i = 0; i < a_b; i++) {
        slick__trackEL.insertAdjacentElement(
          "beforeend",
          slick__trackEL.firstElementChild
        );
      }
      slick__trackEL.scrollLeft =
        slick__trackEL.scrollLeft - width_trackEL * a_b;
    }
    if (x < 0 && b < 0) {
      for (var i = 0; i > b_0; i--) {
        slick__trackEL.insertAdjacentElement(
          "afterbegin",
          slick__trackEL.lastElementChild
        );
      }
      slick__trackEL.scrollLeft = width_trackEL * -b_0;
    }
    /////////////////// end //////////////////
    if (document.querySelector(".slisdeshow--wrapper-dost-check")) {
      nextEL = document.querySelector(
        ".slisdeshow--wrapper-dost-check"
      ).parentElement; // Update EL hiện tại đang hiển thị
    }

    // st: hiển ứng scroll
    slick__trackEL.scrollBy({
      left: width_trackEL * x,
      behavior: "smooth",
    });
    /////////////////// end //////////////////
  }
  //////////////////////////////// end //////////////////////////////////
  let clicked_btn = true;
  // st: chuyen silder = next and back
  wrapper_nextEL.addEventListener("click", function (e) {
    if (clicked_btn) {
      // xử lý sự kiện click ở đây
      let nextElement = nextEL.nextElementSibling; //El kế tiếp
      if (nextElement == null) {
        nextElement = wrapper__dostEl.firstElementChild;
        dost_btn(nextElement, nextElement);
      } else {
        dost_btn(nextElement, nextEL);
      }
      clicked_btn = false;
      setTimeout(function () {
        clicked_btn = true;
      }, 700); // thời gian chờ 0.7 giây trước khi cho phép click tiếp
    }
    e.stopPropagation();
  });

  function keyup_39(e) {
    if (e.keyCode === 39) {
      wrapper_nextEL.click();
    }
  }

  window.addEventListener("click", () => {
    window.removeEventListener("keyup", keyup_39);
    window.removeEventListener("keyup", keyup_37);
  });

  slick__trackEL.addEventListener("click", (ev) => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 39) {
        e.preventDefault();
      }
    });
    window.addEventListener("keyup", keyup_39);
    ev.stopPropagation();
  });

  wrapper_backEL.addEventListener("click", function (e) {
    if (clicked_btn) {
      // xử lý sự kiện click ở đây
      let nextElement = nextEL.previousElementSibling; //El đằng sau
      if (nextElement == null) {
        nextElement = wrapper__dostEl.lastElementChild;
        dost_btn(nextElement, nextElement);
      } else {
        dost_btn(nextElement, nextEL);
      }
      clicked_btn = false;
      setTimeout(function () {
        clicked_btn = true;
      }, 700); // thời gian chờ 0.7 giây trước khi cho phép click tiếp
    }
    e.stopPropagation();
  });

  function keyup_37(e) {
    if (e.keyCode === 37) {
      wrapper_backEL.click();
    }
  }

  slick__trackEL.addEventListener("click", () => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 37) {
        e.preventDefault();
      }
    });
    window.addEventListener("keyup", keyup_37);
  });
  //////////////////////////////// end //////////////////////////////////

  // st: chuyen silder = btn
  let clicked = [true, true, true, true, true];
  let count = 0;
  const MAX_CLICKS = 1; // cho phép 1 lần click

  function lockButtons() {
    clicked = clicked.map(() => false);
  }

  function unlockButtons() {
    clicked = clicked.map(() => true);
    count = 0;
  }

  function handleClick(item, index) {
    if (clicked[index]) {
      // xử lý sự kiện click ở đây
      if (item !== nextEL) {
        dost_btn(item, nextEL);
      }
      clicked[index] = false;
      count++;
      if (count >= MAX_CLICKS) {
        lockButtons();
        setTimeout(unlockButtons, 700); // khoá trong 0.7 giây trước khi cho phép click tiếp
      }
    }
  }

  wrapper__dostEls.forEach(function (item, index) {
    item.addEventListener("click", function (e) {
      clicked_btn = false;
      handleClick(item, index);
      setTimeout(() => {
        clicked_btn = true;
      }, 700);
      e.stopPropagation();
    });
  });
  //////////////////////////////// end //////////////////////////////////

  // st: scroll_auto
  function scroll_Auto() {
    return setInterval(() => {
      lockButtons();
      wrapper_nextEL.click();
      setTimeout(unlockButtons, 700);
    }, 4000);
  }

  let Itv_scroll_auto = scroll_Auto();

  //////////////////////////////// end /// c///////////////////////////////

  // stMB: hiện thị thêm
  let NavBar__iconBarMBEL = document.querySelector(".NavBar--iconBarMB");
  let seemore__mobileEL = document.querySelector(".seemore--mobile");
  let seemore__mobile_bodyEL = document.querySelector(".seemore--mobile-body");

  NavBar__iconBarMBEL.addEventListener("click", (e) => {
    document.body.setAttribute("style", "overflow: hidden;");
    seemore__mobileEL.setAttribute("style", "display:block");
    seemore__mobile_bodyEL.setAttribute(
      "style",
      "animation: ani_next ease-in-out 0.5s;"
    );
  });

  seemore__mobile_bodyEL.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  seemore__mobileEL.addEventListener("click", (e) => {
    document.body.removeAttribute("style");
    seemore__mobile_bodyEL.removeAttribute("style");
    seemore__mobile_bodyEL.setAttribute(
      "style",
      "animation: ani_back ease-in-out 0.5s forwards;"
    );
    setTimeout(() => {
      seemore__mobileEL.setAttribute("style", "display:none;");
    }, 500);
  });
  //////////////////////////////// end //////////////////////////////////

  // stMB: hiện thị cài đặt trong hiện thị thêm
  let seemore__mobileSettingEL = document.querySelector(
    ".seemore--mobileSetting"
  );
  let Setting__listmbEL = document.querySelector(".Setting--listmb");

  seemore__mobileSettingEL.parentElement.addEventListener("click", (e) => {
    let seemore__mobileSettinglcEL = seemore__mobileSettingEL.lastElementChild;
    let seemore__mobileSetting_rightEL = document.querySelector(
      ".seemore--mobileSetting-right"
    );
    let seemore__mobileSetting_downEL = document.querySelector(
      ".seemore--mobileSetting-down"
    );

    if (seemore__mobileSettinglcEL === seemore__mobileSetting_rightEL) {
      seemore__mobileSetting_rightEL.remove();
      seemore__mobileSettingEL.insertAdjacentHTML(
        "beforeend",
        `<i class="fa-sharp fa-solid fa-chevron-down seemore--mobileSetting-down"></i>`
      );
      Setting__listmbEL.setAttribute("style", "display:block");
    } else if (seemore__mobileSettinglcEL === seemore__mobileSetting_downEL) {
      seemore__mobileSetting_downEL.remove();
      seemore__mobileSettingEL.insertAdjacentHTML(
        "beforeend",
        `<i class="fa-solid fa-angle-right seemore--mobileSetting-right"></i>`
      );
      Setting__listmbEL.setAttribute("style", "display:none");
    }
  });
  //////////////////////////////// end //////////////////////////////////
}

export default mainHomeJS;
