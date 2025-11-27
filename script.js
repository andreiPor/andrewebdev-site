$(document).ready(function () {
  $(".section").css("opacity", 0);

  function checkSectionVisibility() {
    var windowHeight = $(window).height();
    var scrollPos = $(window).scrollTop();

    $(".section").each(function () {
      var sectionTop = $(this).offset().top;

      if (sectionTop < scrollPos + windowHeight - 150) {
        $(this).animate({ opacity: 1, marginTop: "0" }, 1000);
      }
    });
  }

  function setActiveLink() {
    var scrollPos = $(document).scrollTop();

    $(".section").each(function () {
      var currSection = $(this);
      var targetSelector = "#" + currSection.attr("id");

      if (
        currSection.offset().top - 100 <= scrollPos &&
        currSection.offset().top + currSection.height() > scrollPos
      ) {
        $(".nav-links a").removeClass("active");
        $('.nav-links a[href="' + targetSelector + '"]').addClass("active");
      }
    });
  }

  checkSectionVisibility();
  setActiveLink();
  $(window).scroll(function () {
    checkSectionVisibility();
    setActiveLink();
  });

  // Hamburger Menu Toggle
  $(".hamburger").click(function () {
    $(".nav-links").slideToggle();
  });

  // Close mobile menu on link click
  $(".nav-links a").click(function () {
    if ($(window).width() < 768) {
      $(".nav-links").slideUp();
    }
  });

  // Smooth Scroll functionality
  $(".nav-links a").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 70,
      },
      800,
      function () {
        setActiveLink();
      }
    );
  });

  // Contact Form Submit handling
  $("#contact-form").submit(function (e) {
    e.preventDefault();

    var alertDiv = $(
      '<div class="form-alert">Message sent successfully!</div>'
    );
    $("body").append(alertDiv);
    alertDiv.fadeIn();

    setTimeout(function () {
      alertDiv.fadeOut(function () {
        $(this).remove();
      });
    }, 2000);

    $(this)[0].reset();
  });
});
