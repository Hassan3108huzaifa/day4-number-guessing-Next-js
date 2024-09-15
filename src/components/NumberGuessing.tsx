'use client'
import React, { ChangeEvent, useEffect } from 'react'
import { Input } from './ui/input'
import { useState } from 'react'


const NumberGuessing = () => {



const [gameStarted, setgameStarted] = useState<boolean>(false)
const [gameOver, setgameOver] = useState<boolean>(false)
const [paused, setpaused] = useState<boolean>(false)
const [targetNumber, settargetNumber] = useState<number>(0)
const [userGuess, setuserGuess] = useState<number | string>("second")
const [attempts, setattempts] = useState(0)

useEffect(() => {
    if(gameStarted && !paused){
        const randomNumber: number = Math.floor(Math.random() * 10) + 1;
        settargetNumber(randomNumber)
        
    }
}, [gameStarted, paused])

const handleStartGame = () => {
    setgameOver(false)
    setpaused(false)
    setattempts(0)
    setgameStarted(true)
}
const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setgameOver(true); 
    
    } else {
      setattempts(attempts + 1); // Increment the attempts counter
    }
  };

const handleTryagain = () => {
    setgameStarted(false)
    setgameOver(false)
    setattempts(0)
    setuserGuess("")

}

const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
    setuserGuess(parseInt(e.target.value))
}

const handlePause = ()=> {
    setpaused(true)
}
const handleResume = () => {
    setpaused(false)
}
  return (
    <div>
      <div className='text-3xl font-sans font-bold text-center text-black'>Number Guessing Game</div>
      <div className='text-center text-black mb-4 mt-2'>try to gess the number between 1 and 10!</div>
      {!gameStarted && (
        <div className='flex justify-center'>
            <button
            onClick={handleStartGame}
            className='bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Start Game</button>
        </div>
      )}
      {gameStarted && !gameOver &&(
        <div>
             {paused ? (
      <div className='flex justify-center mb-3'>
        <button onClick={handleResume} className='bg-slate-500 text-white font-sans font-bold px-3 py-2 rounded'>Resume</button>
      </div>
    ) : (
      <div className='flex justify-center mb-3'>
        <button onClick={handlePause} className='bg-slate-500 text-white font-sans font-bold px-3 py-2 rounded'>Paused</button>
      </div>
    )}
            <div className='flex'>
            <Input
            onChange={handleUserGuessChange}
            value={userGuess}
            placeholder='Enter your guess..' type='number' className='text-black rounded-2xl bg-gray-100'
            />
            <button
            onClick={handleGuess}
            disabled={paused}
            className='text-white bg-slate-700 px-4 py-2 rounded mx-2 disabled:hover:cursor-not-allowed'>Guess</button>
            </div>
            <div className='text-black text-center mt-3'>attempts: {attempts}</div>
        </div>
        
      )}
      {gameOver &&(
        <div className="text-black">
            <div className='text-center text-2xl font-bold font-sans'>Game Over!</div>
            <div className='text-center'>you guessed the number in {attempts} attempts</div>
            <div className='flex justify-center mt-3'><button onClick={handleTryagain} className='bg-red-500 rounded px-3 py-2 text-white font-sans font-bold'>Try Again</button></div>
        </div>
      )}
    </div>
  )
}

export default NumberGuessing
