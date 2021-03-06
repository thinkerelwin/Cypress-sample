describe("The Expedia Home Page", function () {
  // beforeEach(() => {
  //   cy.visit('https://www.agoda.com/?pv=0');
  // });

  it(".type() - type into a DOM element", () => {
    cy.server();
    cy.route("POST", "**/get_handpicked_bh_properties").as("search-request");
    cy.route("POST", "**/rack_rates/rr_log_rendered").as("submit-booking");

    cy.visit("https://www.booking.com/index.html");

    cy.get("input[name=ss]").type("tpe").should("have.value", "tpe");

    cy.wait("@search-request");
    cy.get('[data-label="Taipei, Taipei Area, Taiwan"]').click();

    cy.get(".bui-calendar").should("be.visible");

    cy.get("td[data-date=2020-05-28]").click();
    cy.get("td[data-date=2020-05-29]").click();

    cy.get('[data-placeholder="Check-in"]').should("have.text", "Thu, May 28");
    cy.get('[data-placeholder="Check-out"]').should("have.text", "Fri, May 29");
    // cy.get('.DayPicker-Month').should('contain', 'December 2019');

    cy.get('button[data-sb-id="main"]').click();

    cy.wait("@submit-booking");

    cy.location("search").should(
      "include",
      "checkin_year=2020&checkin_month=5&checkin_monthday=28&checkout_year=2020&checkout_month=5&checkout_monthday=29"
    );
  });
});
