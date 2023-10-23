var ELbtn_send = document.querySelector(".btn_send");

var ELinput_SDT = document.querySelector(".formbody-yop_inputSDT input");
ELinput_SDT.addEventListener("input", function (e) {
  if (ELinput_SDT.value === "") {
    ELbtn_send.setAttribute("style", "background-color: #ccc;color: #757575;");
  } else {
    ELbtn_send.setAttribute(
      "style",
      "background-color: #f05123;color: #fff;cursor: pointer;"
    );
  }
});
