
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'


export default function app(){

  async function submit(){
    let response = await fetch("http://127.0.0.1:5000/predict",
    {method: 'POST',
    headers: {"Content-Type": "application/json"}, 
    body:JSON.stringify({"Age":parseInt(Age), "Sex": Sex, "ChestPainType":ChestPainType, "Cholesterol": parseInt(Cholesterol), "FastingBS":parseInt(FastingBS), "RestingBP":parseInt(RestingBP)}),});
    let data = await response.json();
    if (data.prediction[1] == '1'){
      setMessage("You are maybe suffering a heart attack, please go to the closest hospital as soon as possible.");
    }
    else{
      setMessage('You look healthy, anyway checkout with your head doctor please.')
    }
  }
 
  var [message, setMessage] =  useState();
  var [Age, setAge] = useState(0);
  var [Sex, setSex] = useState(0);
  var [ChestPainType, setChestPT] = useState(0);
  var [RestingBP, setRestingBP ] = useState(0);
  var [Cholesterol, setCholesterol] = useState(0);
  var [FastingBS, setFastingBS] = useState(0)


  return(
    <>
    <Head>
      <title>Heart attack predictor</title>
    </Head>
    <div className='justify-center text-center'>
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">Do you have a <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Heart Attack?</span></h1>
      <p class="mb-3 font-light text-black-500 dark:text-black-400">answer this question below to find out</p>
    </div>
    <div class="w-full flex items-center justify-center">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


        <div class="mb-4">          
          <label class="block text-gray-700 text-sm font-bold mb-2" >
            Age
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value = {Age} onChange={(e)=>setAge(e.target.value)}/>
        </div>


        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Resting blood pressure
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" value = {RestingBP} onChange={(e)=>setRestingBP(e.target.value)}/>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" >
            Cholesterol 
          </label>
          <input class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" value = {Cholesterol} onChange={(e)=>setCholesterol(e.target.value)} />
        </div>

        <div className='mb-6 item'>
          <label class="block text-gray-700 text-sm font-bold mb-2">Sex</label>
          <select name ='Sex'>
            <option></option>
            <option>F</option>
            <option>M</option>
          </select>

        </div>

        <div className="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Chest Pain type </label>
                    <select value={ChestPainType} onChange={(e)=> setChestPT(e.target.value)}>
                      <option value =  'TA' ></option>
                      <option value =  'TA' >Pain by emotial stress, being in rest</option>
                      <option value = 'ATA'>squeezing, pressure, heaviness, tightness </option>
                      <option value = 'ASY'>Don't feel pain in the chest </option>
                    </select>
                </div>

        <div className='mb-6 item'>
          <label class="block text-gray-700 text-sm font-bold mb-2">Blood sugar</label>
          <select name ='Sex' value={FastingBS} onChange={(e)=> setFastingBS(e.target.value)}>
            <option></option>
            <option value = '1'>FastingBS greater than 120 mg/dl</option>
            <option value = '0' >FastingBS less than 120 mg/dl</option>
          </select>

        </div>

        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded focus:outline-none focus:shadow-outline" onClick={submit} type="button">
            Predict
          </button>
        </div>
      </form>
    </div>

    <div class="w-full flex items-center justify-center ">
      <h2 class="block text-gray-700 text-sm font-bold mb-2">({message})</h2>
    </div>

  </>
  )
}