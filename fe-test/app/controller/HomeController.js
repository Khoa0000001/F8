angular.module('myApp').controller('HomeController', function ($scope, $http) {
    $scope.listCoursesFree;
    $scope.listBlogsoonest;
    $scope.listVideosoonest;
    $scope.LoadParticipations = function () {
        $http({
            method: 'GET',
            url:
                current_url +
                '/User/Course/get-all-course-by-id/' +
                localStorage.getItem('userID'),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            $scope.listParticipations = response.data.data;
        });
    };
    $scope.LoadCourse = function () {
        $http({
            method: 'GET',
            url: current_url + '/User/Course/get-all-course-by-id/1',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(function (response) {
                $scope.listCourses = response.data.data;
            })
            .catch(function (error) {
                console.error('Error loading courses:', error);
            });
    };

    $scope.LoadCourseFree = function () {
        $http({
            method: 'GET',
            url: current_url + '/User/Course/get-all-course-by-id/2',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            $scope.listCoursesFree = response.data.data;
        });
    };
    $scope.LoadBlogsoonest = function () {
        $http({
            method: 'GET',
            url: current_url + '/User/Blog/get-list-blog-and-user-soonest',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            $scope.listBlogsoonest = response.data.data;
        });
    };
    $scope.LoadVideosoonest = function () {
        $http({
            method: 'GET',
            url: current_url + '/User/Lesson/get-list-lesson-top',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            $scope.listVideosoonest = response.data.data;
        });
    };
    $scope.checkUserregistercourse = function (courseId, course) {
        $http({
            method: 'GET',
            url:
                current_url +
                `/User/User/check-user-register-course/${localStorage.getItem(
                    'userID'
                )}/${courseId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            var isUserRegistered = response.data.success;
            course.isUserRegistered = isUserRegistered;
        });
    };

    $scope.LoadVideosoonest();
    $scope.LoadBlogsoonest();
    $scope.LoadCourseFree();
    $scope.LoadCourse();

    let slick__trackEL = $('.slick--track');
    let width_trackEL = slick__trackEL.getBoundingClientRect().width;

    const wrapper_backEL = $('.slisdeshow--wrapper-back');
    const wrapper_nextEL = $('.slisdeshow--wrapper-next');
    const slick__slideEl = $$('.slick--slide');
    const wrapper_listEl = $('.slisdeshow--wrapper-list');
    const wrapper__dostEls = $$('.slisdeshow--wrapper-dost li');
    let wrapper__dostEl = $('.slisdeshow--wrapper-dost');

    // st: cách chạy của Home--slisdeshow
    let nextEL = $('.slisdeshow--wrapper-dost-check').parentElement; // El  hiện tại đang hiển thị
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
            item.firstChild.removeAttribute('class');
        });
        item.firstChild.setAttribute('class', 'slisdeshow--wrapper-dost-check');
        /////////////////// end //////////////////

        // st: check số phần tử cần scroll đến có nằm trong khoảng scroll
        var b = slick__trackEL.scrollLeft + width_trackEL * x;
        var a = width_trackEL * (slick__trackEL.children.length - 1);
        var a_b = (b - a) / width_trackEL;
        var b_0 = b / width_trackEL;
        if (x > 0 && b > a) {
            for (var i = 0; i < a_b; i++) {
                slick__trackEL.insertAdjacentElement(
                    'beforeend',
                    slick__trackEL.firstElementChild
                );
            }
            slick__trackEL.scrollLeft =
                slick__trackEL.scrollLeft - width_trackEL * a_b;
        }
        if (x < 0 && b < 0) {
            for (var i = 0; i > b_0; i--) {
                slick__trackEL.insertAdjacentElement(
                    'afterbegin',
                    slick__trackEL.lastElementChild
                );
            }
            slick__trackEL.scrollLeft = width_trackEL * -b_0;
        }
        /////////////////// end //////////////////
        if ($('.slisdeshow--wrapper-dost-check')) {
            nextEL = $('.slisdeshow--wrapper-dost-check').parentElement; // Update EL hiện tại đang hiển thị
        }

        // st: hiển ứng scroll
        slick__trackEL.scrollBy({
            left: width_trackEL * x,
            behavior: 'smooth',
        });
        /////////////////// end //////////////////
    }
    //////////////////////////////// end //////////////////////////////////
    let clicked_btn = true;
    // st: chuyen silder = next and back
    wrapper_nextEL.addEventListener('click', function (e) {
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

    window.addEventListener('click', () => {
        window.removeEventListener('keyup', keyup_39);
        window.removeEventListener('keyup', keyup_37);
    });

    slick__trackEL.addEventListener('click', (ev) => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 39) {
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', keyup_39);
        ev.stopPropagation();
    });

    wrapper_backEL.addEventListener('click', function (e) {
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

    slick__trackEL.addEventListener('click', () => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 37) {
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', keyup_37);
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
        item.addEventListener('click', function (e) {
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
    let NavBar__iconBarMBEL = $('.NavBar--iconBarMB');
    let seemore__mobileEL = $('.seemore--mobile');
    let seemore__mobile_bodyEL = $('.seemore--mobile-body');

    NavBar__iconBarMBEL.addEventListener('click', (e) => {
        document.body.setAttribute('style', 'overflow: hidden;');
        seemore__mobileEL.setAttribute('style', 'display:block');
        seemore__mobile_bodyEL.setAttribute(
            'style',
            'animation: ani_next ease-in-out 0.5s;'
        );
    });

    seemore__mobile_bodyEL.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    seemore__mobileEL.addEventListener('click', (e) => {
        document.body.removeAttribute('style');
        seemore__mobile_bodyEL.removeAttribute('style');
        seemore__mobile_bodyEL.setAttribute(
            'style',
            'animation: ani_back ease-in-out 0.5s forwards;'
        );
        setTimeout(() => {
            seemore__mobileEL.setAttribute('style', 'display:none;');
        }, 500);
    });
    //////////////////////////////// end //////////////////////////////////

    // stMB: hiện thị cài đặt trong hiện thị thêm
    let seemore__mobileSettingEL = $('.seemore--mobileSetting');
    let Setting__listmbEL = $('.Setting--listmb');

    seemore__mobileSettingEL.parentElement.addEventListener('click', (e) => {
        let seemore__mobileSettinglcEL =
            seemore__mobileSettingEL.lastElementChild;
        let seemore__mobileSetting_rightEL = $('.seemore--mobileSetting-right');
        let seemore__mobileSetting_downEL = $('.seemore--mobileSetting-down');

        if (seemore__mobileSettinglcEL === seemore__mobileSetting_rightEL) {
            seemore__mobileSetting_rightEL.remove();
            seemore__mobileSettingEL.insertAdjacentHTML(
                'beforeend',
                `<i class="fa-sharp fa-solid fa-chevron-down seemore--mobileSetting-down"></i>`
            );
            Setting__listmbEL.setAttribute('style', 'display:block');
        } else if (
            seemore__mobileSettinglcEL === seemore__mobileSetting_downEL
        ) {
            seemore__mobileSetting_downEL.remove();
            seemore__mobileSettingEL.insertAdjacentHTML(
                'beforeend',
                `<i class="fa-solid fa-angle-right seemore--mobileSetting-right"></i>`
            );
            Setting__listmbEL.setAttribute('style', 'display:none');
        }
    });
    //////////////////////////////// end //////////////////////////////////
});
