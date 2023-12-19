import './style.css'
import { CloseIcon } from 'src/assets/svg'

export const EachAd = ({ open, setOpen, ad }) => {
    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '570px' }}>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <img alt='' src={`${process.env.REACT_APP_IMAGE}/${ad?.image}`} className='eventPopupImage' />
                <div className='eventPopupDetails'>
                    <div className='eventEdit'>
                        <h1>{ad?.title}</h1>
                    </div>
                    <div>
                        <p>HY: {ad.text}</p>
                        <p>EN: {ad.text_en}</p>
                        <p>RU: {ad.text_ru}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}