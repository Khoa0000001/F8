app.controller('MainController', function ($scope, $http, $timeout) {
    $scope.listParticipations;
    $scope.isShowSideBar = true;
    $scope.LoadParticipations = function () {
        $http({
            method: 'GET',
            url:
                current_url +
                '/User/User/get-all-CourseParticipations-by-id/' +
                localStorage.getItem('userID'),
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(function (response) {
            $scope.listParticipations = response.data.data;
            console.log($scope.listParticipations);
        });
    };
    $scope.name = localStorage.getItem('name');
    $scope.avatar = localStorage.getItem('avatar');
    $timeout(function () {
        $('.NarBar--action_myLearn').addEventListener('click', function (e) {
            $('.NarBar-list_courses').classList.toggle('active_mycourse');
            $('.My-everythings').classList.remove('active_myEverthings');
        });
        //st: My everythings
        $('.NavBar--actions_Avarta').addEventListener('click', function (e) {
            $('.My-everythings').classList.toggle('active_myEverthings');
            $('.NarBar-list_courses').classList.remove('active_mycourse');
        });
        // st: hiệu ứng của thành search trên heading
        $('.NavBar--search_input').addEventListener('click', function (e) {
            $('.NavBar--seach').style.border = '2px solid #333';
            e.stopPropagation();
        });
        document.body.addEventListener('click', function (e) {
            $('.NavBar--seach').style.border = '2px solid #e8e8e8';
        });
        //////////////////////////////// end //////////////////////////////////

        //st: hiện blog
        let SideBar__blogIconEl = $('.SideBar--blogIcon');

        SideBar__blogIconEl.addEventListener('click', function (e) {
            $('.SideBar--blogIcon > i').setAttribute(
                'style',
                'transform: rotate(45deg);font-size: 20px;'
            );
            e.stopPropagation();
        });

        window.addEventListener('click', function (e) {
            $('.SideBar--blogIcon > i').removeAttribute('style');
        });

        $$('.SideBar--list li').forEach((e) => {
            e.addEventListener('click', function () {
                console.log(e);
                $$('.SideBar--list li a').forEach(function (btn) {
                    btn.classList.remove('activate');
                });
                this.querySelector('a').classList.add('activate');
                window.scrollTo(0, 0);
            });
        });
    }, 100);
});
