import React from 'react';
import { useRef, useEffect, useState } from 'react'
import './App.css';
import * as pressure from '../node_modules/pressure'

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [forceValue, setForceValue] = useState(0);

  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${500}px`;

    const context = canvas.getContext("2d")

    //Image data/pen stroke to add

    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = 'rgba(5,18,222,0)';
    context.lineWidth = 5;
    contextRef.current = context;
  }, [])

  const startDrawing = ({ nativeEvent }) => {

    const { offsetX, offsetY } = nativeEvent;
    console.log(nativeEvent)
    //contextRef.current.beginPath()
    let imageData = contextRef.current.createImageData(5, 5);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = 255;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
    console.log(imageData)
    //contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.putImageData(imageData, offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }
  const pointerTest = ({ nativeEvent }) => {
    const pressure = nativeEvent;
    console.log(pressure.pressure)
  }

  const draw = ({ nativeEvent }) => {

    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY, pressure } = nativeEvent;

    //let p = contextRef.current.strokeStyle = 'rgba(5,18,222,' + `${pressure}` + ')'
    //console.log(p)

    let imageData = contextRef.current.createImageData(5, 5);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = 255;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
    
    //contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.putImageData(imageData, offsetX, offsetY)
    //contextRef.current.lineTo(offsetX, offsetY)
    //contextRef.current.stroke()
  }

  return (
    <canvas id='canvasOne'
      onPointerDown={startDrawing}
      //onMouseDown={startDrawing}
      //onMouseUp={finishDrawing}
      onPointerUp={finishDrawing}
      //onMouseMove={draw}
      onPointerMove={draw}
      ref={canvasRef}
    />
  );


}

export default App;
