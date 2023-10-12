import './style.css'
import CIcon from '@coreui/icons-react'
import { CloseIcon } from 'src/assets/svg'
import { useNavigate } from 'react-router-dom'
import { cilApplicationsSettings, cilApps, cilBook, cilPencil, cilPeople, cilSortAscending } from '@coreui/icons'

export const EachEventPopup = ({ open, setOpen, event }) => {
    const navigate = useNavigate()
    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' style={{ width: '570px' }}>
                <div className='close' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </div>
                <img alt='' src={`${process.env.REACT_APP_IMAGE}/${event?.image}`} className='eventPopupImage' />
                <div className='eventPopupDetails'>
                    <div className='eventEdit'>
                        <h1>{event?.title}</h1>
                        <div className='eventEditBg' onClick={() => navigate(`/edit-event/${event?._id}`)}>
                            <span><CIcon icon={cilPencil} /> Փոփոխել</span>
                        </div>
                    </div>
                    <div className='eventGenres'>
                        <CIcon icon={cilApps} size='lg' />
                        <span>{event?.category?.name}</span>
                    </div>
                    <div className='eventGenres'>
                        <CIcon icon={cilApplicationsSettings} size='lg' />
                        <span>{event?.subcategories?.name}</span>
                    </div>
                    {event?.sponsors?.length > 0 &&
                        <div className='eventGenres'>
                            <CIcon icon={cilPeople} size='lg' />
                            {event?.sponsors?.map((e, i) => (
                                <div className='eachGenre' key={i}>
                                    {(i === event?.genre?.length + 1 || event?.genre?.length === 1)
                                        ? <span>{e?.name},</span>
                                        : <span>{e?.name}</span>
                                    }
                                </div>
                            ))}
                        </div>
                    }
                    <div className='eventGenres'>
                        <CIcon icon={cilSortAscending} size='lg' />
                        <div className='eventGenresRight'>
                            {event?.generalEvent
                                ? <span>Գլխավոր</span>
                                : event?.topEvent
                                    ? <span>Թոփ</span>
                                    : <span>Բոլորը</span>
                            }
                        </div>
                    </div>
                    {event?.description?.length > 0 &&
                        <div className='eventDescription'>
                            <CIcon icon={cilBook} />
                            <p>{event?.description}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}