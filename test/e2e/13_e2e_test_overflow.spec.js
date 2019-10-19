import { languageBy, resolutionBy } from './utils'
import { IPAD_PRO, IPHONE_X, LANG_EN, LANG_JA, LANG_KO, LANG_ZH, MACBOOK_15 } from './constants'

describe('13_e2e_test_overflow.html', () => {
  let basedValue = null

  const training = () => {
    const elementSection = Cypress.$('.section')
    const { children } = elementSection[0]
    const childrenTop = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      childrenTop.push(child.getBoundingClientRect().top)
    }

    basedValue = {
      width: elementSection.width(),
      height: elementSection.height(),
      childrenTop
    }
  }

  const validator = () => {
    const title = 'menubar validation'
    const checkParentRect = () => it('Check parent rect', () => {
      cy.get('.section').then($el => {
        const { width , height } = basedValue
        expect($el.width() <= width, `[Check width] ${$el.width()} <= ${width}`).to.be.true
        expect($el.height() <= height, `[Check height] ${$el.height()} <= ${height}`).to.be.true
      })
    })

    const checkElementTop = () => it('Check element top', () => {
      cy.get('.section').then($el => {
        const parentNode = $el[0]
        for (let i = 0; i < parentNode.children.length; i++) {
          const child = parentNode.children[i]
          const { top } = child.getBoundingClientRect()
          expect(top === basedValue.childrenTop[i], `[${child.textContent}] ${top} === ${basedValue.childrenTop[i]}`).to.be.true
        }
      })
    })

    const testFunctions = [
      checkParentRect,
      checkElementTop
    ]

    languageBy(LANG_KO, title, testFunctions)
    languageBy(LANG_EN, title, testFunctions)
    languageBy(LANG_JA, title, testFunctions)
    languageBy(LANG_ZH, title, testFunctions)
  }

  beforeEach(() => {
    cy.visit('/13_e2e_test_overflow.html')
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
