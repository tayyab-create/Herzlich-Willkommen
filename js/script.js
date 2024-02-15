$(window).on("load", function () {
  new Main();
});

class Main {
  constructor() {
    this.init();
  }

  init() {
    new Accordion(".accordion");
    this.addListeners();
    this.navbarToggle();
  }

  addListeners() {
    $(document).ready(function () {
      var form = new Form("#anmeldeformular");

      $("#anmeldeformular").on("submit", function (e) {
        e.preventDefault();
        console.log(form.getCheckedValues());
        var formData = new FormData(e.target); // create a FormData object from the form

        var firstName = formData.get("name"); // get the value of the 'firstName' field
        var lastName = formData.get("vorname"); // get the value of the 'lastName' field

        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
      });

      $("#scroll-btn").click(function () {
        $("html, body").animate(
          {
            scrollTop: $("#services-section").offset().top,
          },
          1000
        );
      });
    });
  }

  navbarToggle() {
    $(".navigation__toggle-button").on("click", function () {
      if ($(".navigation__menu").hasClass("responsive")) {
        $(".navigation__menu").removeClass("responsive");
        $(".navigation__menu").slideUp();
      } else {
        $(".navigation__menu").addClass("responsive");
        $(".navigation__menu").slideDown();
      }
    });
  }
}

class Form {
  constructor(selector) {
    this.selector = selector;
    this.checkboxes = $(selector + ' input[type="checkbox"]');
  }
  getCheckedValues() {
    var checkedValues = [];
    this.checkboxes.each(function (index, element) {
      if ($(element).is(":checked")) {
        checkedValues.push($(element).val());
      }
    });
    return checkedValues;
  }
}

class Accordion {
  constructor(selector) {
    this.accordion = $(selector);
    this.accordionItems = this.accordion.find(".accordion__item");
    this.bindEvents();
  }

  bindEvents() {
    this.accordionItems.on("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    const target = $(event.currentTarget);
    if (target.hasClass("active")) {
      target.removeClass("active");
      target.children(".accordion__content").slideUp();
    } else {
      this.accordionItems.removeClass("active");
      this.accordionItems.children(".accordion__content").slideUp();
      target.addClass("active");
      target.children(".accordion__content").slideDown();
    }
  }
}
