describe("todo tests", () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/todos', { fixture: 'todos.json' });
    cy.visit("/"); // Visit the main page
  });

  it("should render the todo app", () => {
    cy.getDataTest("todo-header").should("exist");
  });

  it("should add a new todo", () => {
    cy.get('[data-set="todo-form"]').should("exist");
    cy.get('[data-set="todo-form"] input[name="title"]').type("Watch a movie");
    cy.get('[data-set="add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");
  });

  it("should mark a todo as completed", () => {
    cy.get('[data-set="todo-form"] input[name="title"]').type("Watch a movie");
    cy.get('[data-set="add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");

    cy.get('[data-set="todo-list"] input[type="checkbox"]')
        .should("exist")
        .should("not.be.checked");
    cy.get('[data-set="todo-list"] input[type="checkbox"]')
        .should("exist")
        .click()
        .should("be.checked");
  });

  it("should delete a todo", () => {
    cy.get('[data-set="todo-form"] input[name="title"]').type("Watch a movie");
    cy.get('[data-set="add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");

    cy.get('[data-set="todo-list"] [data-set="delete-todo-btn"]')
        .should("exist")
        .click();
    cy.contains("Watch a movie").should("not.exist");
  });

  it("should add a new todo (alternate test)", () => {
    cy.get('[data-testid="input-todo"]').type("Neue Aufgabe");
    cy.get('[data-testid="add-todo-btn"]').click();
    cy.contains("Neue Aufgabe").should("be.visible");
  });

  it("should delete the first todo", () => {
    cy.get('[data-testid="delete-btn"]').first().click();
    cy.get('[data-testid="todo-item"]').should("have.length", 0);
  });

  it("should sort todos by priority", () => {
    cy.get('[data-testid="sort-priority-btn"]').click();
    cy.get('[data-testid="todo-item"]').first().contains("High Priority");
  });
});