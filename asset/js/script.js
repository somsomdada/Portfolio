$(document).ready(function () {
  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liLength = $(".typing-txt>ul>li").length;


  var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
  typingTxt = typingTxt.split("");
  if (typingBool == false) {
    typingBool = true;
    var tyInt = setInterval(typing, 100);
  }

  function typing() {
    $(".typing ul li").removeClass("on");
    $(".typing ul li").eq(liIndex).addClass("on");
    if (typingIdx < typingTxt.length) {

      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); 
      typingIdx++;
    } else {
      if (liIndex < liLength - 1) {
        liIndex++;
        typingIdx = 0;
        typingBool = false;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        clearInterval(tyInt);

        setTimeout(function () {
          tyInt = setInterval(typing, 100);
        }, 300);
      } else if (liIndex == liLength - 1) {
        clearInterval(tyInt);

        setTimeout(function () {

          typingBool = false;
          liIndex = 0;
          typingIdx = -0;

          typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
          $(".typing ul li").html("");

          tyInt = setInterval(typing, 100);
        }, 5000);
      }
    }
  }

  // 메뉴 눌렀을 때 부드럽게 이동
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top

      }, 300, function(){

        window.location.hash = hash;
      });

    } 

  });

  // 메뉴활성
  $('.hamburger-menu').click(function(){
    $('.gnb').toggleClass('active')
  });
  //메뉴 애니메이션 
  $(".hamburger-menu").click(function(){
    $(this).toggleClass("active");
  });


  window.addEventListener("wheel", function(e){
    e.preventDefault();
  },{passive : false});

  var $html = $("html");
  var page = 1;
  var lastPage = $(".page").length;
   
  $html.animate({scrollTop:0},10);
  $(window).on("wheel", function(e){
   
    if($html.is(":animated")) return;
   
    if(e.originalEvent.deltaY > 0){
      if(page== lastPage) return;
      page++;

    }else if(e.originalEvent.deltaY < 0){
      if(page == 1) return;
      page--;
    }
    var posTop = (page-1) * $(window).height();
   
    $html.animate({scrollTop : posTop});
   
  });
    
  var modal = "";
  $('.desc button').on('click', function(){
    modal = $(this).data('modal'); // 클릭한 아이의 data-modal 값 저장
    $('#' + modal).addClass('on');
  });
  $('.close-modal').on('click', function(){
    $('#' + modal).removeClass('on');
  });

  // 인디케이트 메뉴
  
  // $('.page-indicator  ul > li > a').click(function(e) {
  //   var href = $(this).attr('href');    
  //   var targetTop = $(href).offset().top;
    
  //   $('html').stop().animate({scrollTop:targetTop}, 300); //이 부분 충돌나서 버튼클릭 시 오류남 
  //   e.preventDefault();
  // });

  function page__updateIndicatorActive() {
    var scrollTop = $(window).scrollTop();
    
    $($('.page').get().reverse()).each(function(index, node) {
        var $node = $(this);
        // console.log($node);
        var offsetTop = parseInt($node.attr('data-offset-top'));
        
        if ( scrollTop >= offsetTop ) {
            $('.page-indicator > ul > li > a.active').removeClass('active');          
            var currentPageIndex = $node.index();
            $('.page-indicator > ul > li >a').eq(currentPageIndex).addClass('active');            
            $('html').attr('data-current-page-index', currentPageIndex);
            
            return false;
        }
    });
  }

  // 각 페이지의 offsetTop 속성을 업데이트
  function page__updateOffsetTop() {
    
    $('.page').each(function(index, node) {
        var $page = $(node);
        var offsetTop = $page.offset().top;
        
        $page.attr('data-offset-top', offsetTop);
    });

    page__updateIndicatorActive();
  }

  function page__init() {
    page__updateOffsetTop();
  }

  // 초기화
  page__init();

  $(window).resize(page__updateOffsetTop);
  $(window).scroll(page__updateIndicatorActive);


});
