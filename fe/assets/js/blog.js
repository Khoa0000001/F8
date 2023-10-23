function blog() {
  return `<div class="main--blog">
                    <div class="Bg-container_top" style="max-width: 1920px;">
                        <h1 class="Bg-title">Bài viết nổi bật</h1>
                        <p>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</p>
                    </div>
                    <div class="Bg-body">
                        <div class="row">
                            <div class="Bg-body_left">
                                <div class="Bg-body_leftLayout">
                                    <div class="hug Bg_renderJS">
                                        <div class="Bg_renderPostsJS"></div>                                                                          
                                    </div>
                                </div>
                            </div>                            
                            <div class="Bg-body_right col-3">
                                <div class="Bg-body_right-top">
                                    <h3>Các chủ đề được đề xuất</h3>
                                    <div class="Bg-body_right-topLists">
                                        <a class="Bg-itemtopList Bg--tags" href="">Front-end / Mobile apps</a>
                                        <a class="Bg-itemtopList Bg--tags" href="">Back-end / Devops</a>
                                        <a class="Bg-itemtopList Bg--tags" href="">UI / UX / Design</a>
                                        <a class="Bg-itemtopList Bg--tags" href="">Others</a>
                                    </div>
                                </div>
                                <div class="Bg-body_right-body">
                                    <div class="Bg-body_right-body_conten">
                                        <div class="Bg-body_right-body_contenTop">
                                            <img src="./assets/img/blog/imgRightTopSon.png" alt="">
                                        </div>
                                        <div class="Bg-body_right-body_contenBottom">
                                            <img src="./assets/img/blog/imgRightBottomYtb.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
}

export default blog();
