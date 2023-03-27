import React from 'react'
import { data } from '../api/data'
import NivoPage from './NivoPage'

// interface IData {
//   country: string
//   hotdog: number,
//   hotdogColor: string,
//   burger: number
//   burgerColor: string
//   sandwich: number,
//   sandwichColor: string
//   kebab: number
//   kebabColor: string
//   fries: number
//   friesColor: string
//   donut: number
//   donutColor: number
// }

const Barchart = () => {
  return (
    <div>
      <NivoPage data={data}/>
    </div>
  )
}

export default Barchart