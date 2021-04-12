import logo from './logo.svg';
import './App.css';

function App() {
  
  function loadRazorPay()
  {
    return new Promise((resolve) => {
      const script = document.createElement('script') ;
      script.src = "https://checkout.razorpay.com/v1/checkout.js" ;
      script.onload = ()=> {
        resolve(true) ;
      }
      script.onerror = () => {
        resolve(false) ;
      }
      document.body.appendChild(script) ;
    })
    
  }

  async function displayRazorpay()
  {
    const res = await loadRazorPay() ;
    if(!res)
    {
      alert('offline') ;
    }
    else
    {
        let data = await fetch('http://localhost:5000/razorpay', 
        {
          method :  'POST' ,
          headers : {
            'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDc0MWU1ZjI1NGRlMTM4ODAzNGYzM2YiLCJpYXQiOjE2MTgyMjI3MjB9.K9hMloSGhtEtzy_n6mRblPsZXPxHiKUJMSmwW2pg0FE'
          } ,
          body : JSON.stringify({
            courseId : "C++_1234"
          })
        }) ;
        if(data.status == 200)
        {
            data = await data.json() ;
            console.log(data);
    
            const options = {
              "key": 'rzp_test_tLx9c6GiWjKcsl', // Enter the Key ID generated from the Dashboard
              "amount": data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": data.currency,
              "name": "Cantilever Labs",
              "description": "Test Transaction",
              "image": "https://example.com/your_logo",
              "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler": function (response){
                  alert("You have successfully bought the course") ;
              },
              "prefill": {
                  "name": data.name,
                  "email": data.email,
              },
              "notes": {
                  "address": "Razorpay Corporate Office"
              },
              "theme": {
                  "color": "#3399cc"
              }
            };
            var paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        else
        {
          data = await data.json() ;
          alert(data.error);
        }

        
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
