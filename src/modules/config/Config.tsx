import React, { useState, FC } from 'react'
import { Filters } from '../../components'
import './Config.scss'
import axios from 'axios'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

const Config:FC = () => {

	const [file, setFile] = useState('')
	const [requestStatus, setRequestStatus] = useState<any>('')

	const handlePhotoChange = (e: any) => {
        setFile(e.target.files[0])
    }

	const postData = async (data: any) => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/upload', 
				data
			)
			setRequestStatus(response)
		} catch (error: any) {
			setRequestStatus('Ошибка')
			//throw new Error(error)
		}
	}

	const sendData = () => {
		if (!file) return
        const data = new FormData()
        data.append('file', file)
        postData(data)
    }

  return (
    <div className='config'>
        <p className="config__title">
			Загрузите файл, чтобы получить набор данных
		</p>
		<div className="config__manager">
			<input type="file" className="config__upload" onChange={handlePhotoChange}/>
			<button className='config__request' onClick={sendData}>Запросить</button>
		</div>
		{requestStatus.data &&
			<>
				<div className={requestStatus.data.split(' ')[2] === 'failed' ? 'config__bad' : 'config__ok'}>
					{requestStatus.data}
				</div>
				{
					requestStatus.data.split(' ')[2] !== 'failed' && <Filters />
				}
			</>
		}	
    </div>
  )
}

export {Config}
