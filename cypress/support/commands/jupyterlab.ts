const findExpectedElements = () => {
  cy.get('.jp-Launcher-body').should("be.visible").should('include.text', 'Notebook').and('include.text', 'Console').and('include.text', 'Other')
  cy.get('div#jp-menu-panel').should("be.visible").should('include.text', 'File').and('include.text', 'Edit').and('include.text', 'View')
  cy.get('.jp-DirListing-content').should("be.visible")
}

const launchTerminal = () => {
  cy.get('div.jp-LauncherCard[title="Start a new terminal session"]').should("be.visible").click()
  cy.get('.jp-Terminal-body').should("be.visible").should('have.attr', 'class').and('contain', 'focus')
  cy.get('.xterm-helper-textarea').should('have.focus')
  cy.get('#tab-key-1').should("be.visible").should("contain.text", "Terminal")
  // The terminal is in a html canvas element so I cannot check its contents/state easily 
  // the wait makes sure the canvas has fully rendered
  cy.wait(5000)
}

const makeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`touch ${fname}{enter}`)
  cy.get('#filebrowser > .jp-Toolbar > :nth-child(4)').click()
  cy.get('.jp-DirListing-content').should("be.visible").should("contain.text", "new-file.txt")
}

const removeFileWithTerminal = (fname: string) => () => {
  cy.get('.xterm-helper-textarea').click().type(`rm ${fname}{enter}`)
  cy.get('#filebrowser > .jp-Toolbar > :nth-child(4)').click()
  cy.get('.jp-DirListing-content').should("be.visible").should("not.contain.text", "new-file.txt")
}

const closeTerminal = () => {
  cy.get("body").find('#jp-main-dock-panel >* .lm-TabBar-tabCloseIcon').each(($el, _, __) => {
    cy.wrap($el).click()
  })
}

export const testSnippets = {
  findExpectedElements,
  launchTerminal,
  makeFileWithTerminal,
  removeFileWithTerminal,
  closeTerminal,
}
