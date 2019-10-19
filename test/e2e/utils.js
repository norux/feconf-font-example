import { LANG_DEFAULT } from './constants'

export const setViewport = (type, orientation) => {
  if (typeof type === 'string') {
    cy.viewport(type, orientation)
  } else if (typeof type === 'object') {
    const { width = 0, height = 0 } = type
    cy.viewport(width, height, orientation)
  }

}

export const setLanguage = lang => {
  Cypress.$('html')
    .attr('lang', lang)
}

export const languageBy = (lang, title, testFunc = () => {}) => context(`${title} [lang:${lang}]`, () => {
  beforeEach(() => {
    setLanguage(lang)

    cy.root()
      .should('have.attr', 'lang', lang)
  })

  if (Array.isArray(testFunc)) {
    testFunc.forEach(f => f())
  } else {
    testFunc()
  }
})

export const resolutionBy = (resolution, optFunc) => {
  beforeEach(() => {
    setViewport(resolution)

    cy.root()
      .should('have.attr', 'lang', LANG_DEFAULT)

    optFunc.training()
  })

  optFunc.validator()
}
