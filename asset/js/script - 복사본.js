$(document).ready(function () {
  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liLength = $(".typing-txt>ul>li").length;

  // 타이핑될 텍스트를 가져온다
  var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
  typingTxt = typingTxt.split(""); // 한글자씩 자른다.
  if (typingBool == false) {
    // 타이핑이 진행되지 않았다면
    typingBool = true;
    var tyInt = setInterval(typing, 100); // 반복동작
  }

  function typing() {
    $(".typing ul li").removeClass("on");
    $(".typing ul li").eq(liIndex).addClass("on");
    if (typingIdx < typingTxt.length) {
      // 타이핑될 텍스트 길이만큼 반복
      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다.
      typingIdx++;
    } else {
      if (liIndex < liLength - 1) {
        //다음문장으로  가기위해 인덱스를 1증가
        liIndex++;
        //다음문장을 타이핑하기위한 셋팅
        typingIdx = 0;
        typingBool = false;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        //다음문장 타이핑전 1초 쉰다
        clearInterval(tyInt);
        //타이핑종료

        setTimeout(function () {
          //1초후에 다시 타이핑 반복 시작
          tyInt = setInterval(typing, 100);
        }, 100);
      } else if (liIndex == liLength - 1) {
        //마지막 문장까지 써지면 반복종료
        clearInterval(tyInt);

        //1초후
        setTimeout(function () {
          //사용했던 변수 초기화
          typingBool = false;
          liIndex = 0;
          typingIdx = -0;

          //첫번째 문장으로 셋팅
          typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
          //타이핑 결과 모두 지우기
          $(".typing ul li").html("");

          //반복시작
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

      }, 800, function(){

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
    

  // 인디케이트 메뉴
  
  $('.page-indicator  ul > li > a').click(function(e) {
    var href = $(this).attr('href');
    
    var targetTop = $(href).offset().top;
    
    /*
    // 한번에 가도록 하는 방법
    $(window).scrollTop(targetTop);
    */
    
    $('html').stop().animate({scrollTop:targetTop}, 300);
    
    e.preventDefault();
  });

  function Page__updateIndicatorActive() {
      var scrollTop = $(window).scrollTop();
    
    // 역순으로 검색해야 편하다
    $($('.page').get().reverse()).each(function(index, node) {
        var $node = $(this);
        var offsetTop = parseInt($node.attr('data-offset-top'));
        
        if ( scrollTop >= offsetTop ) {
            // 기존 녀석에게 활성화 풀고
            $('.page-indicator > ul > li > a.active').removeClass('active');
            // 해당하는 녀석에게 활성화 넣고            
            var currentPageIndex = $node.index();
            $('.page-indicator > ul > li >a').eq(currentPageIndex).addClass('active');
            
            $('html').attr('data-current-page-index', currentPageIndex);
            
            return false; // 더 이상 다른 페이지를 검사하지 않는다.
        }
    });
  }

  // 각 페이지의 offsetTop 속성을 업데이트
  function Page__updateOffsetTop() {
    
    $('.page').each(function(index, node) {
        var $page = $(node);
        var offsetTop = $page.offset().top;
        
        $page.attr('data-offset-top', offsetTop);
    });
    
    // 계산이 바뀌었으니까, 다시 상태 업데이트
    Page__updateIndicatorActive();
  }

  function Page__init() {
    Page__updateOffsetTop();
  }

  // 초기화
  Page__init();

  // 화면이 리사이즈 할 때 마다, offsetTop을 다시계산
  $(window).resize(Page__updateOffsetTop);

  // 스크롤이 될 때 마다, 인디케이터의 상태를 갱신
  $(window).scroll(Page__updateIndicatorActive);


});
