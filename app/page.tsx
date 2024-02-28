"use client"
import React from "react";
import "./page.scss";
export default function Home() {
  const [objects, setObjects] = React.useState<number[][]>([])
  const [matrix, setMatrix] = React.useState<number[][]>([])
  const [showValue, setShowValue] = React.useState<number[][]>([])

  const mapa = {
    size: 10, // max 12
  }



  const grabRandomPositionFromArray = (array: any[]) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomElement = array[randomIndex]
    array.splice(randomIndex, 1)
    return randomElement
  }

  const putObjectsInMatrix = (matrix: number[][]) => {
    let objectMatrix = [...matrix]
    const maxNumbers = Math.pow(mapa.size, 2) / 2
    let possibleNumbersA = new Array(maxNumbers).fill(0).map((_, index) => index + 1);
    let possibleNumbersB = new Array(maxNumbers).fill(0).map((_, index) => index + 1);

    let possiblePositions = []
    for (let i = 0; i < mapa.size; i++) {
      for (let j = 0; j < mapa.size; j++) {
        possiblePositions.push({ i, j })
      }
    }

    const recursiveIteration = (array: any[]) => {
      if (array.length === 0) {
        return
      }
      const randomPosition = grabRandomPositionFromArray(array)
      const randomPositionB = grabRandomPositionFromArray(array)
      const randomNumber = grabRandomPositionFromArray(possibleNumbersA)
      const randomNumberB = grabRandomPositionFromArray(possibleNumbersB)
      objectMatrix[randomPosition.i][randomPosition.j] = randomNumber
      objectMatrix[randomPositionB.i][randomPositionB.j] = randomNumberB
      recursiveIteration(array)
    }

    recursiveIteration(possiblePositions)
    setObjects(objectMatrix)

  }


  const createMatrixFromNumber = (number: number) => {
    const matrix: number[][] = []
    for (let i = 0; i < number; i++) {
      matrix.push([])
      for (let j = 0; j < number; j++) {
        matrix[i].push(0)
      }
    }
    return matrix
  }

  const getValueFor = (i: number, j: number) => {
    const newMatrix = [...showValue]
    newMatrix[i][j] = objects[i][j]
    setShowValue(newMatrix)
  }

  const getValueToShow = (i: number, j: number) => {
    return showValue[i][j] || "?"
  }

  React.useEffect(() => {
    const matrix = createMatrixFromNumber(mapa.size)
    setMatrix(matrix)
    setShowValue(createMatrixFromNumber(mapa.size))

    putObjectsInMatrix(matrix)
  },[])


  return (
    <div className="container-fluid">
      <div className="row headerBar">
        <div className="col">
          <div className="container p-2">
            <div className="row m-0">
              <div className="col">
                <p>Bienvenidos</p>
              </div>
              <div className="col text-end">
                <p>Menu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {matrix.map((row, indexRow) => (
          <div className="row" key={indexRow}>
            {row.map((col, indexCol) => (
              <div className="mt-3 col" key={indexCol}>
                <div className="box" onClick={() => getValueFor(indexRow,indexCol)}>
                  {getValueToShow(indexRow,indexCol)}
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}