describe('Teste End-to-End', () => {
  it('Teste 1: Visita Página', () => {
    // abre o site
    cy.visit('http://localhost:5000/')   // pode usar host.docker.internal se quiser
  })

  it('Teste 2: Verifica item na página', () => {
    // Verifica se existe o livro desejado
    cy.get('[data-id=3]').should('contain.text', 'Design Patterns')
  })

  it('Teste 3: Calcula Frete', () => {
    // Calcula o frete para o livro de data-id=3
    cy.get('[data-id=3]').within(() => {
      cy.get('input').type('33200-566')
      cy.contains('Calcular Frete').click()
      cy.wait(2000) // pequena espera para o pop-up carregar
    })
    cy.get('.swal-text').contains('O frete é: R$')
    // Fecha o pop-up com o preço do frete
    cy.get('.swal-button').click()
  })

    it('Teste 4: Compra do Livro', () => {
    // clica em Comprar e valida o pop-up de sucesso
    cy.get('[data-id=3]').within(() => {
      cy.contains('button', 'Comprar').click()
    })
    cy.get('.swal-text', { timeout: 10000 })
      .should('contain', 'Sua compra foi realizada com sucesso')
    cy.get('.swal-button').click()
  })
})
