/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).load(function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(300).fadeOut("slow");
    });
  });

  /*---------------------------------------------------- */
  /* FitText Settings
	------------------------------------------------------ */
  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  /*---------------------------------------------------- */
  /* FitVids
	------------------------------------------------------ */
  $(".fluid-video-wrapper").fitVids();

  /*---------------------------------------------------- */
  /* Owl Carousel
	------------------------------------------------------ */
  $("#owl-slider").owlCarousel({
    navigation: false,
    pagination: true,
    itemsCustom: [
      [0, 1],
      [700, 2],
      [960, 3],
    ],
    navigationText: false,
  });

  /*----------------------------------------------------- */
  /* Alert Boxes
		------------------------------------------------------- */
  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*----------------------------------------------------- */
  /* Stat Counter
		------------------------------------------------------- */
  var statSection = $("#stats"),
    stats = $(".stat-count");

  statSection.waypoint({
    handler: function (direction) {
      if (direction === "down") {
        stats.each(function () {
          var $this = $(this);

          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 4000,
              easing: "swing",
              step: function (curValue) {
                $this.text(Math.ceil(curValue));
              },
            }
          );
        });
      }

      // trigger once only
      this.destroy();
    },

    offset: "90%",
  });

  /*---------------------------------------------------- */
  /*	Masonry
	------------------------------------------------------ */
  var containerProjects = $("#folio-wrapper");

  containerProjects.imagesLoaded(function () {
    containerProjects.masonry({
      itemSelector: ".folio-item",
      resize: true,
    });
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $(".project a").magnificPopup({
    type: "inline",
    fixedContentPos: true,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: "mfp-fade",
  });

  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*---------------------------------------------------- */
  /* Smooth Scrolling
	------------------------------------------------------ */
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*---------------------------------------------------- */
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  $("input, textarea, select").placeholder();

  /*---------------------------------------------------- */
  /*	contact form
	------------------------------------------------------ */

  /* local validation */
  $("#contactForm").validate({
    /* submit via ajax */
    submitHandler: function (form) {
      var sLoader = $("#submit-loader");

      $.ajax({
        type: "POST",
        url: "inc/sendEmail.php",
        data: $(form).serialize(),
        beforeSend: function () {
          sLoader.fadeIn();
        },
        success: function (msg) {
          // Message was sent
          if (msg == "OK") {
            sLoader.fadeOut();
            $("#message-warning").hide();
            $("#contactForm").fadeOut();
            $("#message-success").fadeIn();
          }
          // There was an error
          else {
            sLoader.fadeOut();
            $("#message-warning").html(msg);
            $("#message-warning").fadeIn();
          }
        },
        error: function () {
          sLoader.fadeOut();
          $("#message-warning").html("Something went wrong. Please try again.");
          $("#message-warning").fadeIn();
        },
      });
    },
  });

  /*----------------------------------------------------- */
  /* Back to top
------------------------------------------------------- */
  var pxShow = 300; // height on which the button will show
  var fadeInTime = 400; // how slow/fast you want the button to show
  var fadeOutTime = 400; // how slow/fast you want the button to hide
  var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

  // Show or hide the sticky footer button
  jQuery(window).scroll(function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });
})(jQuery);

/*---------------------------------------------------- */
/* Tab Gallery
------------------------------------------------------ */
function myFunction(imgs) {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg");
  // Get the image text
  var imgText = document.getElementById("imgtext");
  // Use the same src in the expanded image as the image being clicked on from the grid
  expandImg.src = imgs.src;
  // Use the value of the alt attribute of the clickable image as text inside the expanded image
  imgText.innerHTML = imgs.alt;
  // Show the container element (hidden with CSS)
  expandImg.parentElement.style.display = "block";
}

function toggleSkill(skillId) {
  var skill = document.getElementById(skillId);
  var skillItem = skill.previousElementSibling; // Assuming the .skill-item is immediately before .skill-detail

  if (skill.style.display === "none") {
    skill.style.display = "block";
    skillItem.classList.add("active");
  } else {
    skill.style.display = "none";
    skillItem.classList.remove("active");
  }
}

// Function to open the modal with the clicked image
function showModal(clickedImage) {
  // Get the modal
  var modal = document.getElementById("imageModal");
  // Get the modal image
  var modalImg = document.getElementById("modalImage");
  // Get the description container within the modal
  var description = modal.querySelector(".description");
  // Use the same source as the clicked image for the modal image
  modalImg.src = clickedImage.src;
  // Set the description text
  description.textContent = clickedImage.getAttribute("data-description");
  // Display the modal
  modal.style.display = "flex"; // Use flexbox to center
  modal.style.justifyContent = "center"; // Center horizontally
  modal.style.alignItems = "center"; // Center vertically

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}
