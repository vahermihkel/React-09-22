
function Payment() {

  const pay = (props) => {
    // enne maksma hakkamist ma salvestan tellimuse andmebaasi
    //                    1. kui klient maksab, aga läheb katki
    //                    2. saame tellimuse numbri
    const paymentData = {
      "api_username": "92ddcfab96e34a5f", //  turvaelement, kasutajanimi, mis peab ühtima headrsis oleva kasutajanimega
      "account_name": "EUR3D1", // konto nimi
      "amount": props.sum, // kogusumma
      "order_reference": Math.random()*999999, // tellimuse nr, error kui see tellimuse nr on juba tasutud
      "nonce": "a9b7f7e794" + Math.random()*999999 + new Date(), // turvaelement, iga päring peab olema unikaalne
      "timestamp": new Date(), // turvaelement, ajatempel
      "customer_url": "https://react09202.web.app" // aadress, kuhu teda hiljem tagasi suunata pärast maksmist
      }
    const headersData = {
      "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      "Content-Type": "application/json"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      "method": "POST",
      "body": JSON.stringify(paymentData),
      "headers": headersData
    }).then(res => res.json())
      .then(json => window.location.href = json.payment_link)
  }

  return ( 
      <button onClick={pay}>Maksma</button>
 );
}

export default Payment;