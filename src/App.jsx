import './App.css';
import money from './img/money.png'
import CurrencyComponent from './component/CurrencyComponent';
import { useEffect, useState } from 'react';

function App() {
  

  const [currencyChoice,setCurrencyChoice] = useState([])

  const [formCurrency,setFormCurreny] = useState("USD")
  const [toCurrency,setToCurreny] = useState("THB")

  const [amount,setAmoung] = useState(1)
  const [exchangerate,setExchangeRate] = useState(0)

  const [checkFromcurrency,setCheckFormCurrency] = useState(true)

  let Formamount,Toamount 

  if(checkFromcurrency){
    Formamount = amount
    Toamount = (amount*exchangerate).toFixed(2)
  }else{
    Toamount = amount
    Formamount = (amount/exchangerate).toFixed(2)
    
  }


  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${formCurrency}`
    fetch(url)
      .then(res => res.json())
      .then(data =>{
        setCurrencyChoice(Object.keys(data.rates))
        setExchangeRate(data.rates[toCurrency])
      })
  }, [formCurrency,toCurrency]);

  const amountFromcurrency =(e)=>{
    setAmoung(e.target.value)
    setCheckFormCurrency(true)
  }

  const amountTocurrency =(e)=>{
    setAmoung(e.target.value)
    setCheckFormCurrency(false)
  }


  return (
    <div>
      <img src={money} alt="Logo"  className='money'/>
      <h1>แอพแปลงสกุลเงิน(API)</h1>
      <div className="container">
        <CurrencyComponent 
         currencyChoice={currencyChoice}
         selectCurrency={formCurrency}
         changeCurrency={(e)=>setFormCurreny(e.target.value)}
         amount = {Formamount}
         onChangeAmount = {amountFromcurrency}
         />
        <div className="equal"> = </div>
        <CurrencyComponent 
         currencyChoice={currencyChoice} 
         selectCurrency={toCurrency}
         changeCurrency={(e)=>setToCurreny(e.target.value)}
         amount = {Toamount}
         onChangeAmount = {amountTocurrency}
        />
      </div>
    </div>
  );
}

export default App;
