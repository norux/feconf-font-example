import { languageBy, resolutionBy } from './utils'
import { IPAD_PRO, IPHONE_X, LANG_EN, LANG_JA, LANG_KO, LANG_ZH, MACBOOK_15 } from './constants'

describe('11_e2e_test_hidden.html', () => {
  const training = () => {}

  const validator = () => {
    const title = 'menubar validation when height is fixed'

    const checkOverflowWidth = () => it('Check overflow width', () => {
      cy.get('.section').then($el => {
        const parentNode = $el[0]
        for (let child of parentNode.children) {
          const { textContent, offsetWidth, scrollWidth} = child
          expect(offsetWidth > scrollWidth, `[${textContent}] ${offsetWidth} > ${scrollWidth}}`).to.be.true
        }
      })
    })

    const checkOverflowHeight = () => it('Check overflow height', () => {
      cy.get('.section').then($el => {
        const parentNode = $el[0]
        for (let child of parentNode.children) {
          const { textContent, offsetHeight, scrollHeight} = child
          expect(offsetHeight > scrollHeight, `[${textContent}] ${offsetHeight} > ${scrollHeight}}`).to.be.true
        }
      })
    })

    const checkOverflowHidden = () => it('Check element hidden', () => {
      cy.get('.section').then($el => {
        const parentNode = $el[0]
        for (let child of parentNode.children) {
          expect(Cypress.dom.isHidden(child), `[${child.textContent}]`).to.be.false
        }
      })
    })

    const testFunctions = [
      checkOverflowWidth,
      checkOverflowHeight,
      checkOverflowHidden,
    ]

    languageBy(LANG_KO, title, testFunctions)
    languageBy(LANG_EN, title, testFunctions)
    languageBy(LANG_JA, title, testFunctions)
    languageBy(LANG_ZH, title, testFunctions)
  }

  beforeEach(() => {
    cy.visit('/11_e2e_test_hidden.html')
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
