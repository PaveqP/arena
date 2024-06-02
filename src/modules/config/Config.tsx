import React, { useState, FC } from 'react'
import { Filters } from '../../components'
import './Config.scss'
import axios from 'axios'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { Success, Error } from '../../ui'

const Config:FC = () => {

	const [file, setFile] = useState('')
	const [requestStatus, setRequestStatus] = useState<any>('')

	const filter = useTypedSelector(state => state.filters.currentFilter)

	const dispatch = useActions()

	console.log(filter)

	const handlePhotoChange = (e: any) => {
        setFile(e.target.files[0])
    }

	const postData = async (data: any) => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/upload', 
				data
			)
			setRequestStatus(response)
			if (response.data.split(' ')[2] !== 'failed'){
				dispatch.setRequestStatus(true)
			} else {
				dispatch.setRequestStatus(false)
			}
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
			<div className="config__input">
				<p className='config-offer'>Выберите файл</p>
				<input type="file" className="config__upload" onChange={handlePhotoChange}/>
			</div>
			<button className='config__request' onClick={sendData}>Запросить</button>
			{requestStatus.data &&
			<>
			{requestStatus.data.split(' ')[2] === 'failed' ?
				<div className={'config__bad'}>
					<Error/>
				</div>
				 :
				<div className={'config__ok'}>
					<Success/>
				</div> 
			}
				{/* {
					requestStatus.data.split(' ')[2] !== 'failed' && <Filters />
				} */}
			</>
			}	
		</div>
		{/* {requestStatus.data &&
			<>
				<div className={requestStatus.data.split(' ')[2] === 'failed' ? 'config__bad' : 'config__ok'}>
					{requestStatus.data}
				</div>
				{
					requestStatus.data.split(' ')[2] !== 'failed' && <Filters />
				}
			</>
		}	 */}
    </div>
  )
}

export {Config}
