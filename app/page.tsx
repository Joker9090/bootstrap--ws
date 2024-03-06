/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import "./page.scss";

function Home() {

  const [objects, setObjects] = React.useState<number[][]>([])
  const [matrix, setMatrix] = React.useState<number[][]>([])
  const [showValue, setShowValue] = React.useState<number[][]>([])
  const [status, setStatus] = React.useState<string>("IDLE")

  const mapa = {
    size: 4, // max 12
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
    console.log("Click en ", i, j, "valor", objects[i][j])
  }

  const icognitoTile = (i: number, j: number) => {
    return (
      <div className="box" onClick={() => getValueFor(i, j)}>
        ?
      </div>
    )
  }

  const emptyTile = (i: number, j: number) => {
    return (
      <></>
    )
  }

  const NumberedTile = (suquito: { i: number, j: number }) => {
    const { i, j } = suquito;
    return (
      <div className="box" onClick={() => getValueFor(i, j)}>
        {showValue[i][j]}
        {status == "MATCH" && (
          <>
            <Star direction={"LEFT"} />
            <Star direction={"RIGHT"} />
          </>
        )}
      </div>
    )
  }

  const Star = ({ direction = "RIGHT" }: { direction?: string }) => {
    return (
      <div className={`Star ${direction}`}>
        <img src="/star.png" alt="star" width={50} height={50} />
      </div>
    )
  }

  const getValueToShow = (i: number, j: number) => {
    const actualValue = showValue[i][j];

    switch (actualValue) {
      case 0:
        return icognitoTile(i, j)
      case -1:
        return emptyTile(i, j)
      default:
        return <NumberedTile i={i} j={j} />
    }
  }

  React.useEffect(() => {
    const matrix = createMatrixFromNumber(mapa.size)
    setMatrix(matrix)
    setShowValue(createMatrixFromNumber(mapa.size))

    putObjectsInMatrix(matrix)
  }, [])

  React.useEffect(() => {
    const array = JSON.parse(JSON.stringify(showValue))
    let status = "IDLE";
    let oldNumbers = [];
    let oldpositions = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        const box = array[i][j];
        if (box > 0) {
          oldpositions.push({ i, j });
          oldNumbers.push(box);
          if (oldNumbers.length === 2) {
            if (oldNumbers[0] === oldNumbers[1]) {
              status = "MATCH";
              oldpositions.forEach((position) => {
                array[position.i][position.j] = -1;
              });
            } else {
              status = "NO_MATCH";
              oldpositions.forEach((position) => {
                array[position.i][position.j] = 0;
              })
            }
            oldNumbers = [];
          }
        }
      }
    }

    setStatus(status);

    if (status === "NO_MATCH" || status === "MATCH") {
      setTimeout(() => {
        setShowValue(array);
      }, 1500);
    }

  }, [showValue])

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
                {getValueToShow(indexRow, indexCol)}
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home;