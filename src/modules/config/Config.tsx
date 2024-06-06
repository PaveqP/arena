import React, { useState, FC } from 'react'
import './Config.scss'
import axios from 'axios'
import { useActions } from '../../hooks/useActions'
import { Success, Error, Upload } from '../../ui'

const Config:FC = () => {

	const [file, setFile] = useState<any>('')
	const [requestStatus, setRequestStatus] = useState<any>('')

	const dispatch = useActions()

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
				<div className='config-offer'>
					<label htmlFor={"theinput"}>Выберите файл: </label>
					<p className='config-selectedFile'>{file && file.name}</p>
				</div>
				<input type="file" id='theinput' className="config__upload" onChange={handlePhotoChange}/>
			</div>
			<button className='config__request' onClick={sendData}><Upload/></button>
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
			</>
			}	
		</div>
    </div>
  )
}

export {Config}
