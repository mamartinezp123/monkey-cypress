require('cypress-plugin-tab')
const LOG_FILENAME = "../../../results/monkey-execution.html"

describe('Los estudiantes under monkeys', function() {
  it('visits los estudiantes and survives monkeys', function() {
      cy.visit('https://losestudiantes.com/');
      cy.wait(3000);
      randomElementEvent(10);
  })
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function randomElementEvent(monkeysLeft) {
  const elementTypes = ["select", "input", "a", "button"];
  randomEvent(elementTypes[getRandomInt(0, 3)], monkeysLeft)
}

function randomEvent(elementType, monkeysLeft) {
  console.log(elementType)
  console.log(monkeysLeft)
  var monkeysLeft = monkeysLeft;
  if(monkeysLeft > 0) {
    cy.document().then($document => {
        if ($document.querySelectorAll(elementType).length != 0) {
          cy.get(elementType).then($element => {
            var randomElement = $element.get(getRandomInt(0, $element.length));
            if(!Cypress.dom.isHidden(randomElement)) {
              if (elementType == "a" || elementType == "button") {
                cy.wrap(randomElement).click({force: true});
              }
              if (elementType == "select") {
                cy.wrap(randomElement).click({force: true});
              }
              if (elementType == "input") {
                if(randomElement.getAttribute("type") == "email"){
                  cy.wrap(randomElement).type("test@test.com",  {force: true} );
                } else {
                  cy.wrap(randomElement).type("test",  {force: true} );
                }
              }
              monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(3000);
            randomElementEvent(monkeysLeft);
          })
        } else {
          randomElementEvent(monkeysLeft);
        }
    });
  }   
}