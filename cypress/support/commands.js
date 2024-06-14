Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('[id=firstName]').type('Vinicius')
    cy.get('[id=lastName]').type('Goncalves')  
    cy.get('[id=email]').type('vinicius@gmail.com') 
    cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0}) 
    cy.contains('button', 'Enviar').click()
    //cy.get('span[class="success"]').should('be.visible')
})