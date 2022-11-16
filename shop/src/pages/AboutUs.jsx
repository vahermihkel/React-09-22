import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AboutUs() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
      const params = {
        to_name: 'Veebilehe omanik',
        from_name: nameRef.current.value + `(Tema e-mail: ${emailRef.current.value} )`,
        // from_name: nameRef.current.value + "(Tema e-mail: " + emailRef.current.value + " )",
        message: messageRef.current.value
      };
        
      emailjs.send('service_fum24bj', 'template_791jaql', params, 'Xbn0xj_4LjNugxYGl')
      .then((result) => {
          toast.success("Email on edukalt saadetud!");
          nameRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
      }, (error) => {
          // console.log(error.text);
          toast.error(error.text);
          // TODO: Otsida üles dokumentatsioonist mis errorid kõik tulla võivad
          // Ja sõna-sõnalt panen nad tõlkefaili võtmeteks, andes neile ise
          // vastava keelele vaste
      });
  }

  return ( 
    <div>
      <ToastContainer />
      <div>Saada meile tagasiside!</div>
      <label>Sinu nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Sinu e-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Sinu tagasiside</label> <br />
      <input ref={messageRef} type="text" /> <br />
      <button onClick={sendEmail}>Saada e-mail</button>
    </div> );
}

export default AboutUs;