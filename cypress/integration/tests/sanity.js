
const www = Cypress.env('www')
const search_check = Cypress.env('search_check')
const search_txt = Cypress.env('search_txt')
const add_to_card_txt = Cypress.env('add_to_card_txt')
const card_check_txt = Cypress.env('card_check_txt')
const remove = Cypress.env('remove')
const continue_shopping = Cypress.env('continue_shopping')

describe("sanity", () => {
  it("open web page and check if ist load", () => {
    cy
      .visit(www)
    cy
      .location()
      .should(($loc) => {expect($loc.href).to.eq(www)})
    cy
      .get('.col-4 > .m-button', {timeout:20000})
      .click()
  })
  it("check search", () => {
    cy
      .get('#search-tablet')
      .type(search_txt+"{enter}")
    cy
      .get('.m-search-header__headline > div')
      .should('contain', search_txt)
  })
  it("Add an item to the shopping cart", () => {
    cy
      .get('.qa-pl-items-grid > :nth-child(1) > p-productcard > .o-product-card__blocklink > .o-product-card > .o-product-card__container > .m-product-card-img > .m-product-card-img__fade-in')
      .click()
    cy
      .get('.m-button__default')
      .should('contain', add_to_card_txt)
      .click()
  })
  it("Enter to shopping cart by popup", () => {
    cy
      .get('.o-cart-process__added > .a-textlink', {timeout:10000})
      .click()
    cy
      .wait(5000)
    cy
      .get('p-checkout-cart > .m-checkout-box > .m-checkout-box__heading > .m-checkout-box__heading-title > h3', {timeout:10000})
      .should('contain', card_check_txt)
    cy
      .get('.fontweight-bold')
      .should('contain', "1 x")
  })
  it("Delete an item from shopping cart", () => {
    cy
      .wait(5000)
    cy
      .get('.m-checkout-list__item-actions > .m-button > span')
      .click()
    cy
      .get('[customclass="m-button m-button--remove qa-checkout-product-remove-btn"] > .m-button > .m-button__default')
      .should('contain', remove)
      .click({ force: true })
    cy
      .get('.m-button__default')
      .should('contain', continue_shopping)
    })
  })
