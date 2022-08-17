import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <br />
      <h2>:(</h2>
      <p>К сожалению данная страница отстуствует в данном интернет-магазине</p>
    </div>
  )
}

export default NotFoundBlock