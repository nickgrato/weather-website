console.log('client side js')



const getForcast = (location,error,callback) => {
  const URL = `http://localhost:3000/weather?address=${location}`
  fetch(URL).then((response)=>{
    response.json().then((data) => {
      console.log('data',data)

      if(data.error){
        error(data.error)
      }else{
        callback(data)
      }
    })
  })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

const setMessage = ({forcast,location}) => {
  messageOne.textContent = `${forcast} from ${location}`
  messageTwo.textContent = ''
}

const setError = (error) => {
  messageOne.textContent = ''
  messageTwo.textContent = error;
}

const loading = () => {
  messageOne.textContent = 'Loading Bro'
  messageTwo.textContent = ''
}

weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()
  loading()
  getForcast(search.value , setError, setMessage)
})