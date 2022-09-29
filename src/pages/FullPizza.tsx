import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https:/62fb49efe4bcaf535180e06c.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы:(')
        navigate('/home')
      }
    }

    fetchPizza()
  }, [id, navigate])

  if (!pizza) {
    return <div>Загрузка...</div>
  }

  return (
    <div className='container'>
      <div>
        <img src={pizza.imageUrl} alt="" />
      </div>
      <div>
        <div>{pizza.title}</div>
        <div>{pizza.price} ₽</div>
      </div>
    </div>
  )
}

export default FullPizza