///<reference types = "Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(function() {
    cy.visit('./src/index.html')
})

    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
       
        cy.get('[id=firstName]').type('Vinicius')
        cy.get('[id=lastName]').type('Goncalves')  
        cy.get('[id=email]').type('vinicius@gmail.com') 
        cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0}) 
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('[id=firstName]').type('Vinicius')
        cy.get('[id=lastName]').type('Goncalves')  
        cy.get('[id=email]').type('viniciusgmail.com') 
        cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
       
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone').type('ABCDEFG').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', function(){
        cy.get('[id=firstName]').type('Vinicius')
        cy.get('[id=lastName]').type('Goncalves')  
        cy.get('[id=email]').type('vinicius@gmail.com') 
        cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0}) 
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('[id=firstName]').type('Vinicius')
        .should('have.value', 'Vinicius').clear().should('have.value', '')

        cy.get('[id=lastName]').type('Goncalves')
        .should('have.value', 'Goncalves').clear().should('have.value', '')

        cy.get('[id=email]').type('vinicius@gmail.com')
        .should('have.value', 'vinicius@gmail.com').clear().should('have.value', '')

        cy.get('#phone').type('41998878987')
        .should('have.value', '41998878987').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia um formulario com sucesso usando um comando custumizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('utilizando contains para identificar botao de enviar o formulario',function(){
        cy.get('[id=firstName]').type('Vinicius')
        cy.get('[id=lastName]').type('Goncalves')  
        cy.get('[id=email]').type('vinicius@gmail.com') 
        cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0}) 
        cy.contains('button','Enviar').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('seleciona um produto (youtube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu texto', function(){
        cy.get('#product').select('Mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu texto', function(){
        cy.get('#product').select(1).should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
        
    })  
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    }) 
    
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
        })
      
    })   
    
    it('seleciona um arquivo simuland um dra-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
             })
        })

    it('verifica qua a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank') 
        
    }) 
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe mensagem de campo obrigatório por 3 segundo', function(){
        cy.clock()
        
        cy.get('[id=firstName]').type('Vinicius')
        cy.get('[id=lastName]').type('Goncalves')  
        cy.get('[id=email]').type('vinicius@gmail.com') 
        cy.get('[id=open-text-area]').type('Estou sem acesso Estou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acessoEstou sem acesso', {delay : 0}) 
        cy.get('button[type="submit"]').click()
        
        cy.get('span[class="success"]').should('be.visible')
    
        //cy.tick serve para adiantar o relógio em segundos
        cy.tick(3000)

        cy.get('span[class="success"]').should('not.be.visible')
    })

    //repete o mesmo teste 3 vezes
    Cypress._.times(3, function(){
        it('marca ambos checkboxes, depois desmarca o último', function(){
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function(){
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })


    it('preenche a area de texto utilizando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP e valida status 200',  function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            console.log(response)
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    }) 

    it('encontrando o gato escondido no body', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
}) 
