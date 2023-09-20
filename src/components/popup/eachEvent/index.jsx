import './style.css'
import ReactImg from 'src/assets/images/react.jpg'
import { Calendar, CloseIcon, Location, Ticket } from 'src/assets/svg'

export const EachEventPopup = ({ open, setOpen, event }) => {
    console.log(event)

    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '570px' }}>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <img alt='' src={ReactImg} className='eventPopupImage' />
                <div className='eventPopupDetails'>
                    <h1>{event?.title}</h1>
                    <span><Calendar /> {event?.date.split('T')[0]}</span>
                    <span><Location /> {event?.location}</span>
                    <span><Ticket /> {event?.priceStart} - {event?.priceEnd}</span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}