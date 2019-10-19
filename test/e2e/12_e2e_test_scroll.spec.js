import { languageBy, resolutionBy } from './utils'
import { IPAD_PRO, IPHONE_X, LANG_EN, LANG_JA, LANG_KO, LANG_ZH, MACBOOK_15 } from './constants'

describe('12_e2e_test_scroll.html', () => {
  const training = () => {}

  const validator = () => {
    const title = 'menubar validation'

    const checkOverflowHidden = () => it('Check element hidden', () => {
      cy.get('.section').then($el => {
        const parentNode = $el[0]
        for (let child of parentNode.children) {
          expect(Cypress.dom.isHidden(child), `[${child.textContent}]`).to.be.false
        }
      })
    })

    const checkScrollable = () => it('Check parent rect', () => {
      cy.get('.section').then($el => {
        expect(Cypress.dom.isScrollable($el), `Check scrollable`).to.be.false
      })
    })

    const testFunctions = [
      checkOverflowHidden,
      checkScrollable
    ]

    languageBy(LANG_KO, title, testFunctions)
    languageBy(LANG_EN, title, testFunctions)
    languageBy(LANG_JA, title, testFunctions)
    languageBy(LANG_ZH, title, testFunctions)
  }

  beforeEach(() => {
    cy.visit('/12_e2e_test_scroll.html')
  })

  context('Mac Book 15 inch', () => {
    resolutionBy(MACBOOK_15, {
      training,
      validator
    })
  })

  context('IPad Pro', () => {
    resolutionBy(IPAD_PRO, {
      training,
      validator
    })
  })

  context('IPhone X', () => {
    resolutionBy(IPHONE_X, {
      training,
      validator
    })
  })
})
