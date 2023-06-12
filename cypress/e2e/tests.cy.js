import data from '../fixtures/data.json'
describe('login screen', () => {
  it('successful login with valid credentials', () => {
    cy.visit('/')
    cy.login ('bropet@mail.ru', '123');
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible');
  });

  it('show error message when login missed', ()=>{
    cy.visit('http://localhost:3000/');
    // cy.contains('Log in').click();
    // cy.contains('Submit').click();
    cy.login (null, '123');
    cy.get('#mail')
      .then((element)=>element[0].checkValidity())
      .should('be.false');
    cy.get('#mail')
      .then((element)=>element[0].validationMessage)
      .should('contain','Заполните это поле');
    });

    it('show error message when password missed', ()=>{
      cy.visit('http://localhost:3000/');
      // cy.contains('Log in').click();
      // cy.contains('Submit').click();
      cy.login ('bropet@mail.ru', null);
      cy.get('#pass')
        .then((element)=>element[0].checkValidity())
        .should('be.false');
      cy.get('#pass')
        .then((element)=>element[0].validationMessage)
        .should('contain','Заполните это поле');
      })
  })   

  describe('books in favorites', () => {
    
    beforeEach(() => {
      cy.visit('/');
      cy.login ('bropet@mail.ru', '123');
    })
  
    it('favorites list is empty', () => {
      cy.contains('Favorites').click();
      cy.contains('Please add some book to favorit on home page!').should('be.visible');
    })
  
    it('add to favorite from books list', () => {
      
      cy.addNewBook (data.tilte, data.description, data.fileCover, data.fileBook, data.authors);
      cy.contains('Favorites').click();
      cy.contains(data.tilte).should('be.visible');
      cy.contains(data.authors).should('be.visible');
    })
  
    it('delete from favorite', () => {
      cy.visit('/favorites');
      cy.contains('Delete from favorite').click();
      cy.contains('Please add some book to favorit on home page!').should('be.visible');
      cy.contains('Books list').click();
      cy.contains(data.tilte).should('be.visible');
      cy.contains(data.authors).should('be.visible');
    })
  })
