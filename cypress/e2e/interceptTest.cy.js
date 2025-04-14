/// <reference types="cypress" />

const { email, senha } = require('../fixtures/data.json')
const { homePage } = require("../support/pages/home.page.js");

describe('Teste de Autenticação', () => {

  beforeEach(() => {
    cy.login(email, senha)
  })

  it('categories should be visible', () => {
    cy.intercept('GET', '**/public/getCategories', { fixture: 'categories.json' }).as('getCategories') //metodo e a url do request(as seria um alias)
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length.greaterThan', 1) //verificar o tamanho e maior do que 1
  })

  it('categories should be empty', () => {
    cy.intercept('GET', '**/public/getCategories', { fixture: 'noCategories.json' }).as('getCategoriesEmpty')
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length', 1) // só igual a 1 e não maior que 1. 
  })

  it('categories should be empty with error', () => {
    cy.intercept('GET', '**/public/getCategories', { statusCode: 500 }).as('getCategoriesError')
    homePage.openSearchProduct()
    homePage.openCategoriesFilter()
    homePage.categories().should('have.length', 1)
  })
})