import { render } from '@testing-library/react'
import { Pagination } from '.'

describe('Pagination', () => {
  test('the button left should be hidden in the first pagination (1)', () => {
    const wrapper = render(<Pagination disableArrowIf={false} sizeList={15} />)

    const btnLeft = wrapper.getByTestId('btn_left')

    expect(btnLeft).toHaveAttribute('data-value', 'true')
  })

  test('the button right should be visible in the first pagination (1)', () => {
    const wrapper = render(<Pagination disableArrowIf={true} sizeList={15} />)

    const btnRight = wrapper.getByTestId('btn_right')

    expect(btnRight).toHaveAttribute('data-value', 'false')
  })

  test('the button right should be hidden in the last pagination (5)', () => {
    const wrapper = render(<Pagination disableArrowIf={false} sizeList={15} />)

    const btnRight = wrapper.getByTestId('btn_right')

    expect(btnRight).toHaveAttribute('data-value', 'true')
  })
})
